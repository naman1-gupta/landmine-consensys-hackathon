import React, { PureComponent } from 'react';
import { animated } from 'react-spring';
import { withRouter } from 'react-router-dom';
import { Spin } from 'antd';
import { connect } from 'react-redux';
import QRCode from 'qrcode.react';

import { LoginContainer, Sidebar } from '../../elements/Container';
import uport from '../../utils/uport';
import { loginUser } from '../../actions/uport';

import Logo from '../../assets/logo.svg';

import './login.css';

const mnid = require('mnid');

class Login extends PureComponent {
  state = {
    loading: false,
    uri: '',
    login: false
  };

  async componentDidMount() {
    await uport
      .requestCredentials(
        {
          requested: ['name', 'phone', 'country', 'avatar'],
          notifications: true // We want this if we want to recieve credentials,
        },
        async uri => {
          await this.setState({ uri });
        }
      )
      .then(credentials => {
        this.setState({ loading: true }, () => {
          setTimeout(() => {
            this.setState({ loading: false });
            const network = mnid.decode(credentials.address);
            this.props.loginUser({ ...credentials, network });
            this.setState({
              login: true
            });
            // var d = new Date();
            // var month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
            // uport
            //   .attestCredentials({
            //     sub: credentials.address,
            //     claim: {
            //       Event: 'Test APP',
            //       Date: month[d.getMonth()] + ' ' + d.getDate() + ',' + d.getFullYear(),
            //       Details: 'Proof of Attendance',
            //       exp: new Date().getTime() + 30 * 24 * 60 * 60 * 1000 // Optional expiration
            //     }
            //   })
            //   .then(...abc => console.log(abc));
          }, 1500);
        });
      });
  }

  render() {
    return (
      <animated.div className="login" style={{ ...this.props.style, display: 'flex' }}>
        <Sidebar
          native
          state={!this.state.login ? 'open' : 'close'}
          onRest={() => {
            if (this.state.login) {
              this.props.history.push('/home');
            }
          }}
        >
          {({ x }) => (
            <animated.div className="sidebar" style={{ transform: x.interpolate(x => `translate3d(${x}%,0,0)`) }}>
              <LoginContainer native state={!this.state.login ? 'show' : 'showAndHide'}>
                {styles => (
                  <div className="form">
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <img
                        src={Logo}
                        style={{
                          width: 143,
                          position: 'absolute',
                          top: '-271px'
                        }}
                      />
                    </div>
                    <animated.div style={{ ...styles, transform: styles.y.interpolate(y => `translate3d(0,${y}px,0)`) }}>
                      <div className="title">
                        <div className="main">Connect With Uport</div>
                        <span className="subtitle">Scan the QR code with the uPort mobile app</span>
                      </div>

                      <div className="form-login">
                        <Spin size="large" style={{ maxHeight: '467px' }} spinning={this.state.loading}>
                          <QRCode value={this.state.uri} size={467} bgColor="rgba(230, 224, 248)" fgColor="#817bff" />
                        </Spin>
                      </div>
                    </animated.div>
                  </div>
                )}
              </LoginContainer>
            </animated.div>
          )}
        </Sidebar>
      </animated.div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user.data
  };
};
export default withRouter(
  connect(
    mapStateToProps,
    { loginUser }
  )(Login)
);
