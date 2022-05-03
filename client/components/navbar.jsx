import React from 'react';
import AppContext from '../lib/app-context';
import styled from 'styled-components';
import { CgSun } from 'react-icons/cg';
import { HiMoon } from 'react-icons/hi';
import Switch from '../components/switch';

const NavBar = styled.div`
  background-color: ${props => props.theme.primary};
  color: ${props => props.theme.fontColor};
  transition: all .5s ease;
`;

const Modal = styled.div`
  background-color: ${props => props.theme.primary};
`;

const Anchor = styled.a`
  color: ${props => props.theme.fontColor};
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

class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleClickSignOut = this.handleClickSignOut.bind(this);
  }

  handleClick(event) {
    if (this.state.active === false) {
      this.setState({ active: true });
    } else {
      this.setState({ active: false });
    }
  }

  handleClickSignOut() {
    if (this.state.active === false) {
      this.setState({ active: true });
    } else {
      this.setState({ active: false });
    }
    const { handleSignOut } = this.context;
    handleSignOut();
  }

  render() {
    let modal;
    let full;
    let overlay;
    const { user } = this.context;
    if (this.state.active === false) {
      modal = 'navbar-modal-container';
      full = 'navbar-modal-container-full';
      overlay = '';
    } else {
      modal = 'navbar-modal-container open';
      full = 'navbar-modal-container-full';
      overlay = 'navbar-overlay';
    }

    const themeIcon = this.props.theme === 'dark' ? <HiMoon size={19} /> : <CgSun size={19} />;

    return (
      <>
        <NavBar className="row navbar-header">
          <div className="nav-col-half col-nav-icon">
            <a onClick={this.handleClick}>
              <i className='fas fa-bars navbar-icon'></i>
            </a>
          </div>
        </NavBar>
        <div className={full}>
        </div>
        <div onClick={this.handleClick} className={overlay}></div>
        <Modal className={modal}>
          <ul className='navbar-ul'>
            <Anchor onClick={this.handleClick} href="#browse-all">
              <div className='row navbar-row-browse'>
                <div className='navbar-column-icon'>
                  <i className='fas fa-store navbar-browse-icon'></i>
                </div>
                <div className='navbar-column-text'>
                  <h1 className='navbar-browse-all-anchor'>buyandsell</h1>
                </div>
              </div>
            </Anchor>
            <li>
              <Anchor onClick={this.handleClick} href="#create-listing">
                <div className='row navbar-row-full'>
                  <div className='navbar-column-icon'>
                    <i className='fas fa-plus navbar-page-icon'></i>
                  </div>
                  <div className='navbar-column-text'>
                    <h1 className='navbar-page-anchor'>Create new listing</h1>
                  </div>
                </div>
              </Anchor>
            </li>
            <li>
              <Anchor onClick={this.handleClick} href="#my-listings">
                <div className='row navbar-row-full'>
                  <div className='navbar-column-icon'>
                    <i className='fas fa-tags navbar-page-icon'></i>
                  </div>
                  <div className='navbar-column-text'>
                    <h1 className='navbar-page-anchor'>My listings</h1>
                  </div>
                </div>
              </Anchor>
            </li>
            <li>
              <Anchor onClick={this.handleClick} href="#saved-items">
                <div className='row navbar-row-full'>
                  <div className='navbar-column-icon'>
                    <i className='fas fa-bookmark navbar-page-icon'></i>
                  </div>
                  <div className='navbar-column-text'>
                    <h1 className='navbar-page-anchor'>Saved items</h1>
                  </div>
                </div>
              </Anchor>
            </li>
            <li>
              {user !== null &&
                <Anchor onClick={this.handleClickSignOut}>
                  <div className='row navbar-row-full'>
                    <div className='navbar-column-icon'>
                      <i className='fas fa-sign-out-alt navbar-page-icon'></i>
                    </div>
                    <div className='navbar-column-text'>
                      <h1 className='navbar-page-anchor'>Sign out</h1>
                    </div>
                  </div>
                </Anchor>
              }
              {user === null &&
                <Anchor onClick={this.handleClick} href="#sign-in">
                  <div className='row navbar-row-full'>
                    <div className='navbar-column-sign-icon'>
                      <i className='fas fa-sign-in-alt navbar-page-icon'></i>
                    </div>
                    <div className='navbar-column-text'>
                      <h1 className='navbar-page-anchor'>Sign in</h1>
                    </div>
                  </div>
                </Anchor>
              }
            </li>
            <li className="navbar-theme-toggle">
              <ThemeMode>
                {themeIcon}
              </ThemeMode>
              <Switch theme={this.props.theme} handleTheme={this.props.handleTheme} />
            </li>
          </ul>
        </Modal>
      </>
    );
  }
}

export default Navbar;
Navbar.contextType = AppContext;
