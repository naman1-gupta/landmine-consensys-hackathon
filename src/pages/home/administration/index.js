import React, { Component } from 'react';
import { List, Avatar, Button, Spin } from 'antd';
import AdminInfo from '../../../components/AdminModal/Info';

import { Contract } from '../../../utils/contract';

import { Mweb3 } from '../../../utils/web3';

class Administration extends Component {
  state = {
    loading: true,
    loadingMore: false,
    showLoadingMore: true,
    aggrements: [],
    data: []
  };

  async componentDidMount() {
    let PropertyChain = await Contract('0xc4bb339e2c1e81cc84c668617cd0e76536c365be');
    let accounts = await Mweb3.eth.getAccounts();
    console.log(accounts);
    this.setState({
      PropertyChain,
      account: accounts[0]
    });
    const a = await PropertyChain.methods.getAgreementsLength().call();
    console.log(a);
    // const a = await PropertyChain.methods.transferProperty(, Date.now().toString()).call();

    for (var i = 0; i < a; i++) {
      let ownAggrement = await PropertyChain.methods.getAgreementByIndex(i).call();
      await this.setState({
        aggrements: [
          ...this.state.aggrements,
          {
            seller: ownAggrement[0],
            buyer: ownAggrement[1],
            property_id: ownAggrement[2],
            amount: ownAggrement[4],
            state: ownAggrement[5],
            stampDuty: ownAggrement[6],
            stampDutyAmount: ownAggrement[7],
            terms: ownAggrement[8]
          }
        ]
      });
    }
    this.setState({
      loading: false
    });
  }

  render() {
    console.log(this.state);
    const { loading, loadingMore, showLoadingMore, data } = this.state;
    const loadMore = showLoadingMore ? (
      <div style={{ textAlign: 'center', marginTop: 12, height: 32, lineHeight: '32px' }}>
        {loadingMore && <Spin />}
        {!loadingMore && <Button onClick={this.onLoadMore}>loading more</Button>}
      </div>
    ) : null;
    return (
      <List
        className="demo-loadmore-list"
        loading={loading}
        itemLayout="horizontal"
        loadMore={loadMore}
        dataSource={this.state.aggrements}
        renderItem={item => (
          <List.Item
            actions={[
              <Button type="primary" style={{ background: 'green', borderColor: 'green' }}>
                Accept
              </Button>,
              <AdminInfo text="info" data={item} />,
              <Button type="danger">Reject</Button>
            ]}
          >
            <List.Item.Meta
              avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
              title={
                <a href="https://ant.design">
                  <div>Seller Address: {item.seller}</div>
                  <div>Buyer Address: {item.buyer}</div>
                </a>
              }
              description={`Stamp Amount: ${item.amount}`}
            />
            <div>content</div>
          </List.Item>
        )}
      />
    );
  }
}
export default Administration;
