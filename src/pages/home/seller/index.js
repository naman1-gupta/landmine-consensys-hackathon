import React, { Component } from 'react';
import { Transition, animated } from 'react-spring';
import { connect } from 'react-redux';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import QRCode from 'qrcode.react';

import './seller.css';
import { UContract } from '../../../utils/contract';
import { web3 } from '../../../utils/web3';
import { waitForMined } from '../../../utils/waitForMined';
import uport from '../../../utils/uport';

const mnid = require('mnid');

const FormItem = Form.Item;
const { TextArea } = Input;

class Seller extends Component {
  state = {
    titleIndex: 0,
    uri: ''
  };

  async componentDidMount() {
    let accounts = await web3.eth.getAccounts();
    let PropertyChain = await UContract(
      '0xc4bb339e2c1e81cc84c668617cd0e76536c365be'
    );
    console.log(this.props.user.network.address);
    this.setState({
      PropertyChain,
      account: this.props.user.network.address
    });
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        const specificNetworkAddress = mnid.decode(
          this.props.user.networkAddress
        ).address;
        console.log(this.state.PropertyChain, values, values.amount);
        this.state.PropertyChain.intiateAgreement(
          values.propertyIndex,
          values.amount,
          values.address,
          values.terms,
          (error, txHash) => {
            console.log('adding new land');
            if (error) {
              console.log(error);
            }
            waitForMined(
              specificNetworkAddress,
              txHash,
              { blockNumber: null },
              response => {
                console.log(response);
              },
              () => {
                console.log('waitForMined complete');
              }
            );
          }
        );
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <div>
        <Transition
          from={{ opacity: 0, transform: 'translate3d(100%,0,0)' }}
          enter={{ opacity: 1, transform: 'translate3d(0%,0,0)' }}
          leave={{ opacity: 0, transform: 'translate3d(-50%,0,0)' }}
        >
          {() => {
            return (
              this.state.titleIndex === 0 && (
                <Form onSubmit={this.handleSubmit} className="login-form">
                  <h1>Initiate the Process</h1>
                  <FormItem>
                    {getFieldDecorator('address', {
                      rules: [
                        {
                          required: true,
                          message: "Please input your buyer's address!"
                        }
                      ]
                    })(
                      <Input
                        prefix={
                          <Icon
                            type="user"
                            style={{ color: 'rgba(0,0,0,.25)' }}
                          />
                        }
                        placeholder="Buyer Address"
                      />
                    )}
                  </FormItem>
                  <FormItem>
                    {getFieldDecorator('propertyIndex', {
                      rules: [
                        {
                          required: true,
                          message: 'Please input propetry index!'
                        }
                      ]
                    })(
                      <Input
                        prefix={
                          <Icon
                            type="home"
                            style={{ color: 'rgba(0,0,0,.25)' }}
                          />
                        }
                        type="number"
                        placeholder="Property Index"
                      />
                    )}
                  </FormItem>
                  <FormItem>
                    {getFieldDecorator('amount', {
                      rules: [
                        { required: true, message: 'Please input your money!' }
                      ]
                    })(
                      <Input
                        prefix={
                          <Icon
                            type="pay-circle"
                            style={{ color: 'rgba(0,0,0,.25)' }}
                          />
                        }
                        type="number"
                        placeholder="Deal Price"
                      />
                    )}
                  </FormItem>
                  <FormItem>
                    {getFieldDecorator('terms', {
                      rules: [
                        {
                          required: true,
                          message: "Please input your buyer's address!"
                        }
                      ]
                    })(
                      <TextArea
                        row={4}
                        prefix={
                          <Icon
                            type="user"
                            style={{ color: 'rgba(0,0,0,.25)' }}
                          />
                        }
                        placeholder="Term and Condition"
                      />
                    )}
                  </FormItem>
                  <FormItem>
                    {getFieldDecorator('remember', {
                      valuePropName: 'checked',
                      initialValue: true
                    })(
                      <Checkbox>
                        By submitting this you agree to Terms & Conditions{' '}
                      </Checkbox>
                    )}
                    <br />
                    <Button
                      type="primary"
                      htmlType="submit"
                      className="login-form-button"
                    >
                      Submit
                    </Button>
                  </FormItem>
                  {this.state.uri && (
                    <QRCode
                      value={this.state.uri}
                      size={467}
                      bgColor="rgba(230, 224, 248)"
                      fgColor="#817bff"
                    />
                  )}
                </Form>
              )
            );
          }}
        </Transition>
      </div>
    );
  }
}

const mapStateToProps = states => ({
  user: states.user.data
});

export default connect(mapStateToProps)(Form.create()(Seller));
