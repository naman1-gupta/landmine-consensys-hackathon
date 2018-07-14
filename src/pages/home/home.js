import React, { Component } from 'react';
import { Icon } from 'antd';
import { Link } from 'react-router-dom';
import { List, Avatar, Button, Badge } from 'antd';
import { connect } from 'react-redux';

import { Contract } from '../../utils/contract';

import { CONTRACT_ADDRESS } from '../../config';
import { web3 } from '../../utils/web3';

import checkAddressMNID from '../../utils/checkAddressMNID';

import './home.css';

const mnid = require('mnid');

class Home extends Component {
  state = {
    loading: true,
    loadingMore: false,
    showLoadingMore: true,
    account: []
  };
  async componentDidMount() {
    console.log(this.props.user);
    const addr = checkAddressMNID(this.props.user.address);
    let PropertyChain = await Contract(CONTRACT_ADDRESS);
    console.log(PropertyChain);
    let accounts = await web3.eth.getAccounts();
    this.setState({
      PropertyChain,
      account: accounts[0]
    });
    console.log(PropertyChain);
    const ownLandLength = await PropertyChain.call.getUserPropertyIndices(this.state.accounts).call();
    const dataFetch = [];
    for (var i = 0; i < ownLandLength.length; i++) {
      const instructorDetails = await PropertyChain.methods.getPropertyByIndex(i).call();
      this.setState({
        instructors: [
          ...this.state.instructors,
          {
            name: instructorDetails[0],
            age: instructorDetails[1],
            imageHash: instructorDetails[2]
          }
        ]
      });
    }
    this.setState({
      instructors: [...this.state.instructors, ...dataFetch]
    });

    const aggrementEvent = await PropertyChain.events.aggrementUpdated;

    aggrementEvent({ from: '0', to: 'latest' }, async (error, event) => {})
      .on('data', event => {
        this.setState({
          list: [
            ...this.state.account,
            {
              id: event.returnValues['id'],
              state: event.returnValues['state']
            }
          ]
        });
      })
      .on('changed', event => {})
      .on('error', console.error);
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
                dataSource={data}
                renderItem={item => (
                  <List.Item actions={[<a>more</a>]}>
                    <List.Item.Meta
                      avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
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
        <div style={{ padding: '20px 20px' }}>
          <div style={{ fontSize: 50, marginLeft: 45 }}>Transactions</div>
          <div style={{ padding: 40, background: '#f7f7f7', borderRadius: 20, overflowY: 'scroll', height: '600px' }}>
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
