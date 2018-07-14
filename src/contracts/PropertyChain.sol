pragma solidity ^0.4.0;
contract PropertyChain {
    address chairperson;
    enum AgreementState { INITIATED , ACCEPTED, REJECTED ,AMOUNT_PAID, DUTY_PAID , COMPLETED , GOV_REJECTED }
    
    struct Agreement {
        address initiator;
        address target;
        uint property;
        uint[] transactionIndexes;
        uint amount;
        uint amountPaid;
        AgreementState state;
        uint stampDuty;
        uint stampDutyAmountPaid;
        string terms;
    }
    
    struct Transaction {
        string hash;
        address source;
        address target;
        uint amount;
    }
    
    struct Property {
        string locationAddress;
        address owner;
        bool approved;
        mapping(uint => PropertyHistory) records;
        uint recordsSize;
    }
    
    struct PropertyHistory {
        address seller;
        address purchaser;
        uint dealAmount;
        string dealTimestamp;
    }
    
    struct User {
        string name;
        string avatar;
        bool authority;
    }
    
    event AgreementUpdated(
        uint id,
        uint state
        );
    
    Agreement[] public agreements;
    Property[] public properties;
    Transaction[] public transactions;
    mapping(address => uint[]) public propertyIndices;
    mapping(address => User) public userMapping;
    mapping(address => uint[]) public agreementRequests;
    
    constructor() public {
        chairperson = msg.sender;
    }
    
    function createTransaction(string _hash,address _target,uint _amount) public returns(bool _successful){
        Transaction memory transaction = Transaction({hash: _hash,source: msg.sender,target: _target,amount: _amount});
        transactions.push(transaction);
        return true;
    }
    
    function getTransactionCount() public constant returns(uint _count) {
        return transactions.length;
    }
    
    function getTransactionByIndex(uint _index) public constant returns(string _hash,address _source,address _target,uint _amount) {
        Transaction memory transaction = transactions[_index];
        return(transaction.hash,transaction.source,transaction.target,transaction.amount);
    }
    
    function transferProperty(uint _agreement_index,string _deal_timestamp) public returns(bool _successful){
        if(_agreement_index <= agreements.length){
            Agreement storage agreement = agreements[_agreement_index];
            Property storage property = properties[agreement.property];
            PropertyHistory memory propertyHistory;
            propertyHistory.seller = property.owner;
            propertyHistory.purchaser = agreement.target;
            propertyHistory.dealAmount = agreement.amount;
            propertyHistory.dealTimestamp = _deal_timestamp;
            property.records[property.recordsSize] = propertyHistory;
            property.recordsSize++;
            propertyIndices[agreement.target].push(agreement.property);
            uint[] storage prop = propertyIndices[property.owner];
            uint indexToBeDeleted;
            for (uint i = 0; i < prop.length; i++) {
              if (prop[i] == agreement.property) {
                indexToBeDeleted = i;
                break;
              }
            }
            // if index to be deleted is not the last index, swap position.
            if (indexToBeDeleted < prop.length - 1) {
              prop[indexToBeDeleted] = prop[prop.length - 1];
            }
            prop.length--;
            property.owner = agreement.target;
            agreement.state = AgreementState.COMPLETED;
            emit AgreementUpdated(_agreement_index,uint(agreement.state));
            return true;
        }
        return false;
    }
    
    function seedProperties(address _user,string _address) public {
        Property memory property;
        property.locationAddress =  _address ;
        property.owner = _user ;
        property.approved = true;
        properties.push(property);
        propertyIndices[_user].push(properties.length -1 );
    }
    
    function getUserPropertyIndices(address _user) public constant returns(uint[]){
        return propertyIndices[_user];
    }
    
    function getPropertyByIndex(uint _index) public constant returns(string,address,bool,uint){
        Property storage prop = properties[_index];
        return(prop.locationAddress,prop.owner,prop.approved,prop.recordsSize);
    }
    
    function getRecordByIndex(uint _property_index,uint _index) public constant returns(address,address,uint,string){
        PropertyHistory storage ph = properties[_property_index].records[_index];
        return(ph.seller,ph.purchaser,ph.dealAmount,ph.dealTimestamp);
    }
    
    function getUser(address _user) public constant returns(string,string,bool) {
        User storage user = userMapping[_user]; 
        return(user.name,user.avatar,user.authority);
    }
    
    function updateUser(address _user,string _name,string _avatar) public {
        User storage user = userMapping[_user];
        user.name = _name;
        user.avatar = _avatar;
    }
    
    function makeAuthority(address _user) public {
        userMapping[_user].authority = true;
    }
    
    function intiateAgreement(uint _property_index,uint _amount,address _buyer,string _terms) public returns(uint _id){
        Agreement memory a;
        a.property = _property_index;
        a.amount = _amount;
        a.state = AgreementState.INITIATED;
        a.stampDuty = _amount / 20;
        a.initiator = msg.sender;
        a.target = _buyer;
        a.terms = _terms;
        agreements.push(a);
        agreementRequests[_buyer].push(agreements.length -1);
        emit AgreementUpdated(agreements.length -1,uint(a.state));
        return agreements.length - 1;
    }
    
    function getAgreementRequestsIndices() public constant returns(uint[]){
        return agreementRequests[msg.sender];
    }
    
    function getAgreementByIndex(uint _index) public constant returns(address,address,uint,uint[],uint,uint,uint,uint,string){
        Agreement memory a = agreements[_index];
        return(a.initiator,a.target,a.property,a.transactionIndexes,a.amount,uint(a.state),a.stampDuty,a.stampDutyAmountPaid,a.terms);
    }
    
    function acceptAgreement(uint index) public {
       agreements[index].state = AgreementState.ACCEPTED; 
       emit AgreementUpdated(index,uint(agreements[index].state));
    }
    
    function rejectAgreement(uint index) public {
       agreements[index].state = AgreementState.REJECTED; 
       emit AgreementUpdated(index,uint(agreements[index].state));
    }
    
    function paySeller(uint index) public payable {
        Agreement storage a = agreements[index];
        a.initiator.transfer(msg.value);
        a.amountPaid += (msg.value/1000000000000000000);
        if(a.amountPaid >= a.amount){
          a.state = AgreementState.AMOUNT_PAID;
          emit AgreementUpdated(index,uint(a.state));
        }
    }
    
    function pay_duty(uint index) public payable{
      Agreement storage a = agreements[index];
      a.stampDutyAmountPaid += (msg.value/1000000000000000000);
      if(a.stampDutyAmountPaid >= a.stampDuty){
          a.state = AgreementState.DUTY_PAID;
          emit AgreementUpdated(index,uint(a.state));
      }
    }
    
    function getGovBalance() public constant returns(uint){
        return address(this).balance;
    }
    
}