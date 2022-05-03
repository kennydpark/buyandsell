import React from 'react';
import Redirect from '../components/redirect';
import styled from 'styled-components';
import { CgSun } from 'react-icons/cg';
import { HiMoon } from 'react-icons/hi';
import Switch from '../components/switch';

const Container = styled.div`
  color: ${props => props.theme.fontColor};
  transition: all .5s ease;
`;

const ThemeMode = styled.button`
  cursor: default;
  height: 35px;
  width: 35px;
  border-radius: 50%;
  border: none;
  background-color: ${props => props.theme.fontColor};
  color: ${props => props.theme.primary};
  &:focus {
    outline: none;
  }
  transition: all .5s ease;
  padding-top: 7px;
  margin-top: 24px;
`;

export default class FrontPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      demoView: true
    };
    this.handleDemoView = this.handleDemoView.bind(this);
    this.handleDemoSignIn = this.handleDemoSignIn.bind(this);
  }

  handleDemoView() {
    if (this.state.demoView) {
      this.setState({ demoView: false });
    } else {
      this.setState({ demoView: true });
    }
  }

  handleDemoSignIn() {
    event.preventDefault();
    const userInfo = {};
    userInfo.email = 'buyandsellappdemo@gmail.com';
    userInfo.password = 'lfz0821kenny';
    const req = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userInfo)
    };
    fetch('/api/auth/sign-in', req)
      .then(res => res.json())
      .then(result => {
        if (result.user && result.token) {
          this.props.onSignIn(result);
        }
      })
      .catch(err => {
        console.error(err);
      });
  }

  render() {
    if (this.props.user) return <Redirect to="browse-all" />;
    let demoArrow;
    let demoButton;
    if (this.state.demoView) {
      demoArrow = 'fas fa-chevron-up demo-arrow-icon bounce';
      demoButton = 'demo-button';
    } else {
      demoArrow = 'fas fa-chevron-down demo-arrow-icon';
      demoButton = 'demo-button demo-hidden';
    }

    const themeIcon = this.props.theme === 'dark' ? <HiMoon size={19} /> : <CgSun size={19} />;

    return (
      <Container className="container">
        <div className="row row-front-landing justify-center">
          <h1 className="front-page-title text-center lobster-font">buyandsell</h1>
        </div>
        <div className="row row-get-started justify-center">
          <a href="#sign-up" className="front-button">Get Started</a>
        </div>
        <div className="row justify-center">
          <p>Already have an account?</p>
          <span className="front-login-span">
            <a href="#sign-in" className="front-login-anchor">Sign in</a>
          </span>
        </div>
        <div className="row row-demo-arrow justify-center">
          <a onClick={this.handleDemoView} className="demo-button-anchor"><i className={demoArrow}></i></a>
        </div>
        <div className="row row-demo-sign-in justify-center">
          <a onClick={this.handleDemoSignIn} className={demoButton}>Demo</a>
        </div>
        <div className="text-center">
          <ThemeMode>
            {themeIcon}
          </ThemeMode>
          <Switch theme={this.props.theme} handleTheme={this.props.handleTheme} />
        </div>
      </Container>
    );
  }
}
