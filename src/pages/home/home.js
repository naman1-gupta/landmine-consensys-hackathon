import React, { Component } from 'react';
import { Icon } from 'antd';
import { Link } from 'react-router-dom';
import { List, Avatar, Button, Badge } from 'antd';
import { connect } from 'react-redux';

import { Contract } from '../../utils/contract';

import { Mweb3 } from '../../utils/web3';

import checkAddressMNID from '../../utils/checkAddressMNID';

import './home.css';

class Home extends Component {
  state = {
    loading: true,
    loadingMore: false,
    showLoadingMore: true,
    ownerLandTitle: [],
    aggrements: []
  };

  aggrement = (ownAggrement, address) => {
    if (ownAggrement[0] === address) {
      return {
        seller: ownAggrement[0],
        buyer: ownAggrement[1],
        property_id: ownAggrement[2],
        amount: ownAggrement[4],
        state: ownAggrement[5],
        stampDuty: ownAggrement[6],
        stampDutyAmount: ownAggrement[7],
        terms: ownAggrement[8]
      };
    }
  };

  async componentDidMount() {
    const addr = checkAddressMNID(this.props.user.address);
    let PropertyChain = await Contract('0xd548ed5e21ecaa1defa22cf095c2cf9ab7dbc10c');
    let accounts = await Mweb3.eth.getAccounts();
    console.log(accounts);
    this.setState({
      PropertyChain,
      account: accounts[0]
    });
    const ownLandLength = await PropertyChain.methods.getUserPropertyIndices(this.state.account).call();
    // let j = 1;
    // while (j++) {
    //   const aggrement = await PropertyChain.methods.agreements(toString(0)).call();
    //   console.log(aggrement);
    //   if (aggrement) {
    //     this.setState({
    //       aggrement: [...this.state.aggrements, this.aggrement(aggrement, this.state.account)]
    //     });
    //     continue;
    //   }
    //   break;
    // }

    const dataFetch = [];
    console.log(ownLandLength);
    let digital = '';
    for (var i = 0; i < ownLandLength.length; i++) {
      digital = await PropertyChain.methods.getPropertyByIndex(ownLandLength[i]).call();
      console.log(digital);
      await this.setState({
        ownerLandTitle: [
          ...this.state.ownerLandTitle,
          {
            address: digital[0],
            owner: digital[1],
            approved: digital[2],
            pastRecords: digital[3]
          }
        ]
      });
    }
    this.setState({
      loading: false
    });
  }

  status = s => {
    switch (s) {
      case 'In Process':
        return 'processing';
      case 'Rejected':
        return 'error';
      case 'Accepted':
        return 'success';
      case 'Buyer yet to Approve':
        return 'warning';
    }
  };
  render() {
    const { loading, data } = this.state;

    return (
      <div className="home-dashboard">
        <div className="grid-1">
          <div style={{ fontSize: 40 }}>Start New Agreement</div>
          <div>
            <Link to="/home/seller">
              <div className="add">
                <Icon type="plus" />
                <div className="ant-upload-text">Add</div>
              </div>
            </Link>
          </div>
          <div>
            <div style={{ fontSize: 50 }}>Currently owned Land titles</div>
            <div style={{ background: '#f7f7f7', borderRadius: 20, padding: 40, overflowY: 'scroll', height: '600px' }}>
              <List
                className="demo-loadmore-list"
                loading={loading}
                itemLayout="horizontal"
                dataSource={this.state.ownerLandTitle}
                renderItem={item => (
                  <List.Item actions={[<a>more</a>]}>
                    <List.Item.Meta
                      avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                      title={<a href="https://ant.design">{item.address}</a>}
                      description="This is currently owned Ant Design, a design language for background applications, is refined by Ant UED Team"
                    />
                    <div>{item.pastRecords === '0' ? 'No past owner' : `${item.pastRecords} past Owner`}</div>
                  </List.Item>
                )}
              />
            </div>
          </div>
        </div>
        <div style={{ padding: '20px 20px' }}>
          <div style={{ fontSize: 50, marginLeft: 45 }}>Transactions</div>
          <div style={{ padding: 40, background: '#f7f7f7', borderRadius: 20, overflowY: 'scroll', height: '600px', width: '600px' }}>
            <List
              className="demo-loadmore-list"
              loading={loading}
              itemLayout="horizontal"
              dataSource={data}
              renderItem={item => (
                <List.Item
                  actions={[
                    <Button
                      type={item.status === 'Accepted' || item.status === 'In Process' || item.status === 'Buyer yet to Approve' ? 'primary' : 'danger'}
                      style={{ width: 200, backgroundColor: item.status === 'Accepted' ? 'green' : item.status === 'Buyer yet to Approve' ? 'orange' : '' }}
                    >
                      {item.status}
                    </Button>
                  ]}
                >
                  <List.Item.Meta
                    avatar={
                      <Badge
                        status={this.status(item.status)}
                        style={{
                          height: '20px',
                          width: '20px'
                        }}
                      />
                    }
                    title={<a href="https://ant.design">{item.name.last}</a>}
                    description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                  />
                  <div>content</div>
                </List.Item>
              )}
            />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = states => ({
  user: states.user.data
});

export default connect(mapStateToProps)(Home);
