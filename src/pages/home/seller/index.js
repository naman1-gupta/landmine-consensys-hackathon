import React, { Component } from 'react';
import { Transition, animated } from 'react-spring';
import { connect } from 'react-redux';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import './seller.css';
import { Contract } from '../../../utils/contract';
import { Mweb3 } from '../../../utils/web3';

const FormItem = Form.Item;

class Seller extends Component {
  state = {
    titleIndex: 0
  };

  async componentDidMount() {
    let accounts = await Mweb3.eth.getAccounts();
    let PropertyChain = await Contract('0xd548ed5e21ecaa1defa22cf095c2cf9ab7dbc10c');

    this.setState({
      PropertyChain,
      account: accounts[0]
    });
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.state.PropertyChain.methods.intiateAgreement(value.propertyIndex, values.amount, this.state.account, '').send({
          from: this.state.account,
          gas: 300000000
        });
      }
    });
  };
  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <div>
        <Transition from={{ opacity: 0, transform: 'translate3d(100%,0,0)' }} enter={{ opacity: 1, transform: 'translate3d(0%,0,0)' }} leave={{ opacity: 0, transform: 'translate3d(-50%,0,0)' }}>
          {() => {
            return (
              this.state.titleIndex === 0 && (
                <Form onSubmit={this.handleSubmit} className="login-form">
                  <h1>Initiate the Process</h1>
                  <FormItem>
                    {getFieldDecorator('address', {
                      rules: [{ required: true, message: "Please input your buyer's address!" }]
                    })(<Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Buyer Address" />)}
                  </FormItem>
                  <FormItem>
                    {getFieldDecorator('check', {
                      rules: [{ required: true, message: 'Please input your money!' }]
                    })(<Input prefix={<Icon type="pay-circle" style={{ color: 'rgba(0,0,0,.25)' }} />} type="number" placeholder="Deal Price" />)}
                  </FormItem>
                  <FormItem>
                    {getFieldDecorator('amount', {
                      rules: [{ required: true, message: "Please input your buyer's address!" }]
                    })(<Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Buyer Address" />)}
                  </FormItem>
                  <FormItem>
                    {getFieldDecorator('remember', {
                      valuePropName: 'checked',
                      initialValue: true
                    })(<Checkbox>By submitting this you agree to Terms & Conditions </Checkbox>)}
                    <br />
                    <Button type="primary" htmlType="submit" className="login-form-button">
                      Submit
                    </Button>
                  </FormItem>
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
