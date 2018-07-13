import React, { Component } from 'react';
import { Menu, Icon, Layout } from 'antd';

import { Link, withRouter } from 'react-router-dom';
import Logo from '../../assets/logo.svg';

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

const { Sider } = Layout;

class SideMenu extends Component {
  render() {
    console.log(this.props);
    var selectionMenu = '';
    switch (this.props.location.pathname) {
      case '/home/seller':
        selectionMenu = '1';
        break;
      case '/home/buyer':
        selectionMenu = '2';
        break;
      case '/home/administration':
        selectionMenu = '3';
        break;
      default:
        selectionMenu = '0';
    }

    return (
      <Sider width={240} style={{ background: '#fff' }}>
        <Link style={{ display: 'flex', justifyContent: 'center' }} to="/home">
          <img src={Logo} style={{ width: 120 }} />
        </Link>
        <Menu style={{ width: 240, height: '100vh' }} selectedKeys={[selectionMenu]} defaultSelectedKeys={['1']} defaultOpenKeys={['sub1']} mode="inline">
          <Menu.Item key="0">
            <Link to="/home">
              <Icon type="home" /> Home
            </Link>
          </Menu.Item>
          <SubMenu
            key="sub1"
            title={
              <span>
                <Icon type="user" />
                <span>Roles</span>
              </span>
            }
          >
            <Menu.Item key="1">
              <Link to="/home/seller">Seller</Link>
            </Menu.Item>
            <Menu.Item key="2">
              <Link to="/home/buyer">Buyer</Link>
            </Menu.Item>
            <Menu.Item key="3">
              <Link to="/home/administration">Administration</Link>
            </Menu.Item>
          </SubMenu>
          <Menu.Item key="4">
            <Link to="/blockExplorer">
              <Icon type="link" />Block Explorer
            </Link>
          </Menu.Item>
        </Menu>
      </Sider>
    );
  }
}

export default withRouter(SideMenu);
