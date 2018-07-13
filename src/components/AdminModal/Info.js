import React, { Component } from 'react';
import { Button, Modal } from 'antd';

class AdminModal extends Component {
  state = { visible: false };
  showModal = () => {
    this.setState({
      visible: true
    });
  };
  handleOk = e => {
    console.log(e);
    this.setState({
      visible: false
    });
  };
  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false
    });
  };
  render() {
    return (
      <div>
        <Button type={this.props.type} onClick={this.showModal} type="primary">
          {this.props.text}
        </Button>
        <Modal title={this.props.data.title} visible={this.state.visible} onOk={this.handleOk} onCancel={this.handleCancel}>
          <div>
            Seller: 0x4439058409684509685096809556
            <br />
            Payment: 20,0000
          </div>
        </Modal>
      </div>
    );
  }
}

export default AdminModal;
