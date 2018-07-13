import React, { Component } from 'react';
import { List, Avatar, Button, Spin } from 'antd';

class Administration extends Component {
    state = {
      loading: true,
      loadingMore: false,
      showLoadingMore: true,
      data: [],
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({
              loading: false,
              data: [
                {
                  name: '200'
                }
              ]
            });
          }, 500);
    }

    // getData = (callback) => {
    //   reqwest({
    //     url: fakeDataUrl,
    //     type: 'json',
    //     method: 'get',
    //     contentType: 'application/json',
    //     success: (res) => {
    //       callback(res);
    //     },
    //   });
    // }

    // onLoadMore = () => {
    //   this.setState({
    //     loadingMore: true,
    //   });
    //   this.getData((res) => {
    //     const data = this.state.data.concat(res.results);
    //     this.setState({
    //       data,
    //       loadingMore: false,
    //     }, () => {
    //       // Resetting window's offsetTop so as to display react-virtualized demo underfloor.
    //       // In real scene, you can using public method of react-virtualized:
    //       // https://stackoverflow.com/questions/46700726/how-to-use-public-method-updateposition-of-react-virtualized
    //       window.dispatchEvent(new Event('resize'));
    //     });
    //   });
    // }

    render() {
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
          dataSource={data}
          renderItem={item => (
            <List.Item actions={[<a>edit</a>, <a>more</a>]}>
              <List.Item.Meta
                avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                title={<a href="https://ant.design">{item.name.last}</a>}
                description="Ant Design, a design language for background applications, is refined by Ant UED Team"
              />
              <div>content</div>
            </List.Item>
          )}
        />
      );
    }
  }
export default Administration;