import React, { Component } from 'react';
import { Table } from 'antd';
import { web3 } from '../../../utils/web3';

class Explorer extends Component {

  state = {
    totalBlockCount: 0,
    blocks: []
  };

  componentDidMount() {
    web3.eth.getBlockNumber((err, res) => {
      if (err) {
        console.log(err);
      } else {
        this.setState({
          totalBlockCount: res
        });
      }
    })
  }

  blockDetails(number) {
    var blocks = [];
    web3.eth.getBlock(number, (err, res) => {
      if(err){
        console.log(err);
      } else {
        blocks.push({
          "height" : res.number,
          "size" : res.size,
          "transactions" : res.transactions.length,
          "age" : Date.now() - res.timestamp
        })
      }
    })
    this.setState({blocks: blocks});
  }

  render() {

    for(var i=0; i<10; i++){
      this.blockDetails(this.state.totalBlockCount - i);
    }

    const columns = [{
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    }, {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    }, {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    }];
    const dataSource = [{
      key: '1',
      name: 'Mike',
      age: 32,
      address: '10 Downing Street'
    }, {
      key: '2',
      name: 'John',
      age: 42,
      address: '10 Downing Street'
    }];

    return <Table dataSource = {
      dataSource
    }
    columns = {
      columns
    }
    />;
  }


}

export default Explorer;