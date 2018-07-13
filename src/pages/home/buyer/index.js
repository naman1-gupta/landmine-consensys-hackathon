import React, { Component } from 'react';

import { List, Avatar, Spin, Tabs, Button } from 'antd';
import BuyerInfo from '../../../components/BuyerModal/Info';
import Track from '../../../components/BuyerModal/Track';

const TabPane = Tabs.TabPane;

class Buyer extends Component {
  state = {
    loading: true,
    loadingMore: false,
    showLoadingMore: true,
    data: []
  };

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        loading: false,
        data: [{ title: 'Contract No: #IND00001', name: 'Shubham Singh' }]
      });
    }, 500);
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
            dataSource={data}
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
                  description="Ant Design, a design language for background applications, is refined by Ant UED Team"
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
