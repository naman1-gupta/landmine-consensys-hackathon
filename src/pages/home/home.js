import React, { Component } from 'react';
import { Icon } from 'antd';
import { Link } from 'react-router-dom';
import { List, Avatar, Button, Badge } from 'antd';

import './home.css';

class Home extends Component {
  state = {
    loading: true,
    loadingMore: false,
    showLoadingMore: true,
    ownTitle: []
  };
  componentDidMount() {
    setTimeout(() => {
      this.setState({
        loading: false,
        data: [
          { name: 'Land No. 2324ddfd', status: 'Accepted' },
          { name: 'Land No. 2324343', status: 'In Process' },
          { name: 'Land No. 2324fddd', status: 'Rejected' },
          { name: 'Land No. 2324dsfds43', status: 'Buyer yet to Approve' }
        ]
      });
    }, 500);
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
        <div style={{ padding: 20 }}>
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

export default Home;
