import React, { Component } from 'react';

import { List, Avatar, Spin, Tabs, Button } from 'antd';
import BuyerInfo from '../../../components/BuyerModal/Info';
import Track from '../../../components/BuyerModal/Track';
import { Contract } from '../../../utils/contract';

import { Mweb3 } from '../../../utils/web3';

const TabPane = Tabs.TabPane;

class Buyer extends Component {
  state = {
    loading: true,
    loadingMore: false,
    showLoadingMore: true,
    aggrements: []
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

    for (var i = 0; i < a; i++) {
      let ownAggrement = await PropertyChain.methods.getAgreementByIndex(i).call();
      await this.setState({
        aggrement: [
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
    const { loading, loadingMore, showLoadingMore, data } = this.state;
    const loadMore = showLoadingMore ? (
      <div style={{ textAlign: 'center', marginTop: 12, height: 32, lineHeight: '32px' }}>
        {loadingMore && <Spin />}
        {!loadingMore && <Button onClick={this.onLoadMore}>loading more</Button>}
      </div>
    ) : null;
    return (
      <Tabs>
        <TabPane tab="New" key="1">
          <List
            className="demo-loadmore-list"
            loading={loading}
            itemLayout="horizontal"
            loadMore={loadMore}
            dataSource={this.state.aggrement}
            renderItem={item => (
              <List.Item
                actions={[
                  <Button type="primary" style={{ background: 'green', borderColor: 'green' }}>
                    Accept
                  </Button>,
                  <BuyerInfo text="info" data={item} />,
                  <Button type="danger">Reject</Button>
                ]}
              >
                <List.Item.Meta
                  avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                  title={<a href="https://ant.design">{item.name}</a>}
                  description={`Seller with address ${item.seller} initiated a aggrement request for you`}
                />
                <div>content</div>
              </List.Item>
            )}
          />
        </TabPane>
        <TabPane tab="Accepted" key="2">
          <List
            className="demo-loadmore-list"
            loading={loading}
            itemLayout="horizontal"
            loadMore={loadMore}
            dataSource={data}
            renderItem={item => (
              <List.Item actions={[<Track text="Track" data={item} />]}>
                <List.Item.Meta
                  avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                  title={<a href="https://ant.design">{item.name}</a>}
                  description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                />
                <div>content</div>
              </List.Item>
            )}
          />
        </TabPane>
        {/* <TabPane tab="Rejected" key="3">
          Content of tab 3
        </TabPane> */}
      </Tabs>
    );
  }
}

export default Buyer;
