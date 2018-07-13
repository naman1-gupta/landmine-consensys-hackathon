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
        selectionMenu = '1';
    }

    return (
      <Sider width={240} style={{ background: '#fff' }}>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <img src={Logo} style={{ width: 120 }} />
        </div>
        <Menu style={{ width: 240, height: '100vh' }} selectedKeys={[selectionMenu]} defaultSelectedKeys={['1']} defaultOpenKeys={['sub1']} mode="inline">
          <SubMenu
            key="sub1"
            title={
              <span>
                <Icon type="mail" />
                <span>Navigation One</span>
              </span>
            }
          >
            <MenuItemGroup key="g1" title="Roles">
              <Menu.Item key="1">
                <Link to="/home/seller">Seller</Link>
              </Menu.Item>
              <Menu.Item key="2">
                <Link to="/home/buyer">Buyer</Link>
              </Menu.Item>
              <Menu.Item key="3">
                <Link to="/home/administration">Administration</Link>
              </Menu.Item>
            </MenuItemGroup>
            <MenuItemGroup key="g2" title="Item 2">
              <Menu.Item key="4">Option 4</Menu.Item>
            </MenuItemGroup>
          </SubMenu>
          <SubMenu
            key="sub2"
            title={
              <span>
                <Icon type="appstore" />
                <span>Navigation Two</span>
              </span>
            }
          >
            <Menu.Item key="5">Option 5</Menu.Item>
            <Menu.Item key="6">Option 6</Menu.Item>
            <SubMenu key="sub3" title="Submenu">
              <Menu.Item key="7">Option 7</Menu.Item>
              <Menu.Item key="8">Option 8</Menu.Item>
            </SubMenu>
          </SubMenu>
          <SubMenu
            key="sub4"
            title={
              <span>
                <Icon type="setting" />
                <span>Navigation Three</span>
              </span>
            }
          >
            <Menu.Item key="9">Option 9</Menu.Item>
            <Menu.Item key="10">Option 10</Menu.Item>
            <Menu.Item key="11">Option 11</Menu.Item>
            <Menu.Item key="12">Option 12</Menu.Item>
          </SubMenu>
        </Menu>
      </Sider>
    );
  }
}

export default withRouter(SideMenu);
