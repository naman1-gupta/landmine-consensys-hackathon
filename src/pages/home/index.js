import React, { Component } from 'react';
import { animated } from 'react-spring';
import { Layout } from 'antd';
import { connect } from 'react-redux';

import { PrivateRoute } from '../../hoc/router';

import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';
import HomeDashBoard from './home';
import Seller from './seller';
import Buyer from './buyer';
import Administration from './administration';
import Explorer from './blockExplorer';

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
            <Content style={{ margin: '24px 16px', padding: 24, background: '#fff' }}>
              <PrivateRoute exact path="/home" component={HomeDashBoard} />
              <PrivateRoute exact path="/home/seller" component={Seller} />
              <PrivateRoute exact path="/home/buyer" component={Buyer} />
              <PrivateRoute exact path="/home/administration" component={Administration} />
              <PrivateRoute exact path="/home/explorer" component={Explorer} />
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
