import React, { Component } from 'react';
import { Transition, animated } from 'react-spring';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import './seller.css';

const FormItem = Form.Item;

class Seller extends Component {
  state = {
    titleIndex: 0
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
                    {getFieldDecorator('userName', {
                      rules: [{ required: true, message: "Please input your buyer's address!" }]
                    })(<Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Buyer Address" />)}
                  </FormItem>
                  <FormItem>
                    {getFieldDecorator('password', {
                      rules: [{ required: true, message: 'Please input your Password!' }]
                    })(<Input prefix={<Icon type="pay-circle" style={{ color: 'rgba(0,0,0,.25)' }} />} type="number" placeholder="Deal Price" />)}
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

export default Form.create()(Seller);
