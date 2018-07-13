import React, { PureComponent } from 'react';
import { Avatar, Menu, Dropdown, Layout } from 'antd';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { animated } from 'react-spring';

import { DashboardHeader } from '../../elements/Container';
import { userLoggedOut, userBeforeLoggedOut } from '../../actions/uport';

import './header.css';

const { Header } = Layout;

const menu = (name = '', logout) => (
  <Menu>
    <Menu.Item key="0">Signed in as {name}</Menu.Item>
    <Menu.Divider />
    <Menu.Item key="1">Profile</Menu.Item>
    <Menu.Item key="2">Settings</Menu.Item>
    <Menu.Item key="3">About</Menu.Item>
    <Menu.Divider />
    <Menu.Item
      key="4"
      onClick={() => {
        logout();
      }}
    >
      Sign Out
    </Menu.Item>
  </Menu>
);

class AppHeader extends PureComponent {
  state = {
    loggedIn: true,
    user: this.props.user
  };

  static getDerivedStateFromProps(nextProps) {
    if (nextProps.user === null) {
      return null;
    }
    return nextProps.user;
  }
  logOut = async () => {
    await this.props.userBeforeLoggedOut();
    await this.setState({
      loggedIn: false
    });
  };

  render() {
    return (
      <DashboardHeader
        native
        state={this.props.loggedInState ? 'open' : 'close'}
        onRest={() => {
          if (!this.props.loggedInState && !this.state.loggedIn) {
            this.props.userLoggedOut();
            this.props.history.push('/');
          }
        }}
      >
        {styles => (
          <animated.div style={{ ...styles, transform: styles.y.interpolate(y => `translate3d(0,${y}px,0`) }}>
            <Header style={{ background: 'transparent', padding: '0 20px' }}>
              <Dropdown overlay={menu(this.state.user.name, this.logOut)} trigger={['click']} placement="bottomRight">
                <div className="header-avatar">
                  <Avatar src={this.state.user.avatar.uri} size="large" />
                </div>
              </Dropdown>
              <span style={{ float: 'right', padding: '0 10px' }}>{this.state.user.name}</span>
            </Header>
          </animated.div>
        )}
      </DashboardHeader>
    );
  }
}

const mapStateToProps = states => {
  return {
    user: states.user.data,
    loggedInState: states.user.loggedInState
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    { userLoggedOut, userBeforeLoggedOut }
  )(AppHeader)
);
