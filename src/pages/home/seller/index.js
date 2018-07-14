import React, { Component } from 'react';
import { Transition, animated } from 'react-spring';
import { connect } from 'react-redux';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import './seller.css';
import { Contract } from '../../../utils/contract';
import { Mweb3 } from '../../../utils/web3';

const FormItem = Form.Item;
const { TextArea } = Input;

class Seller extends Component {
  state = {
    titleIndex: 0
  };

  async componentDidMount() {
    let accounts = await Mweb3.eth.getAccounts();
    let PropertyChain = await Contract('0xc4bb339e2c1e81cc84c668617cd0e76536c365be');

    this.setState({
      PropertyChain,
      account: accounts[0]
    });
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log(this.state.PropertyChain);
        this.state.PropertyChain.methods.intiateAgreement(values.propertyIndex, values.amount, this.state.account, values.terms).send({
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
                    {getFieldDecorator('propertyIndex', {
                      rules: [{ required: true, message: 'Please input propetry index!' }]
                    })(<Input prefix={<Icon type="home" style={{ color: 'rgba(0,0,0,.25)' }} />} type="number" placeholder="Property Index" />)}
                  </FormItem>
                  <FormItem>
                    {getFieldDecorator('amount', {
                      rules: [{ required: true, message: 'Please input your money!' }]
                    })(<Input prefix={<Icon type="pay-circle" style={{ color: 'rgba(0,0,0,.25)' }} />} type="number" placeholder="Deal Price" />)}
                  </FormItem>
                  <FormItem>
                    {getFieldDecorator('terms', {
                      rules: [{ required: true, message: "Please input your buyer's address!" }]
                    })(<TextArea row={4} prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Term and Condition" />)}
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
