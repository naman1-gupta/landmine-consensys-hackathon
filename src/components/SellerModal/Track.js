import React, { Component } from 'react';
import { Button, Modal, Steps } from 'antd';

const Step = Steps.Step;

class SellerModal extends Component {
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
        <Modal title={'Track Progress'} visible={this.state.visible} onOk={this.handleOk} onCancel={this.handleCancel}>
          <Steps direction="vertical" size="small" current={1}>
            <Step title="Initiated" description="This is a description." />
            <Step title="Accepted by you" description="This is a description." />
            <Step title="Duty Paid" description="This is a description." />
            <Step title="Completed" description="This is a description." />
          </Steps>,
        </Modal>
      </div>
    );
  }
}

export default SellerModal;
