import { web3 } from './uport';

import PropertyChain from '../build/contracts/PropertyChain.json';

const SharesContractSetup = () => {
  let SharesABI = web3.eth.contract([
    {
      constant: false,
      inputs: [
        {
          name: 'test',
          type: 'uint256'
        }
      ],
      name: 'doub',
      outputs: [
        {
          name: '',
          type: 'uint256'
        }
      ],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      inputs: [],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'constructor'
    }
  ]);
  let SharesContractObj = SharesABI.at('0x7e46E43f609e2AcB7Ef4074A84239D1488a16A2D');
  return SharesContractObj;
};

const SharesContract = SharesContractSetup();

export default SharesContract;
