import DrawerMenu from 'rc-drawer';
import React, { PureComponent } from 'react';
import { animated } from 'react-spring';
import Responsive from 'react-responsive-decorator';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { DashboardSidebar } from '../../elements/Container';

import SiderMenu from './sideMenu';

import 'rc-drawer/assets/index.css';

class Sidebar extends PureComponent {
  state = {
    isMobile: false
  };

  componentDidMount() {
    this.props.media({ minWidth: 768 }, () => {
      this.setState({
        isMobile: false
      });
    });
    this.props.media({ maxWidth: 768 }, () => {
      this.setState({
        isMobile: true
      });
    });
  }
  render() {
    const collapsed = false;
    return this.state.isMobile ? (
      <DrawerMenu handleChild={<i className="drawer-handle-icon" />}>
        <SiderMenu collapsed={this.state.isMobile ? false : collapsed} />
      </DrawerMenu>
    ) : (
      <DashboardSidebar native state={this.props.loggedInState ? 'open' : 'close'}>
        {({ x }) => {
          return (
            <animated.div style={{ transform: x.interpolate(x => `translate3d(${x}%,0,0)`) }}>
              <SiderMenu />
            </animated.div>
          );
        }}
      </DashboardSidebar>
    );
  }
}

const mapStateToProps = states => ({
  loggedInState: states.user.loggedInState
});

export default withRouter(connect(mapStateToProps)(Responsive(Sidebar)));
