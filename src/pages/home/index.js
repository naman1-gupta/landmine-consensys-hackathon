import React, { Component } from 'react';
import { animated } from 'react-spring';
import { Layout } from 'antd';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';

import { PrivateRoute } from '../../hoc/router';

import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';
import Seller from './seller';
import Buyer from './buyer';
import Administration from './administration';

import './home.css';

const { Content } = Layout;

class Home extends Component {
  state = {
    collapsed: true
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
  };
  render() {
    return (
      <animated.div>
        <Layout className="home">
          <Sidebar />
          <Layout>
            <Header />
            <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280 }}>
              <PrivateRoute exact path="/" component={() => <h1>hii</h1>} />
              <PrivateRoute exact path="/home/seller" component={Seller} />
              <PrivateRoute exact path="/home/buyer" component={Buyer} />
              <PrivateRoute exact path="/home/administration" component={Administration} />
            </Content>
          </Layout>
        </Layout>
      </animated.div>
    );
  }
}

const mapStateToProps = states => ({
  loggedInState: states.user.loggedInState
});

export default connect(mapStateToProps)(Home);
