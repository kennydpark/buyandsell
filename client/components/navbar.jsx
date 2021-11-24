import React from 'react';
import AppContext from '../lib/app-context';

class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleClickSignOut = this.handleClickSignOut.bind(this);
  }

  handleClick() {
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
    let icon;
    if (!user) {
      icon = 'hidden';
    } else {
      icon = 'fas fa-bars navbar-icon';
    }
    if (this.state.active === false) {
      modal = 'navbar-modal-container navbar-hidden';
      full = 'navbar-modal-container-full';
      overlay = '';
    } else {
      modal = 'navbar-modal-container navbar-view navbar-shadow';
      full = 'navbar-modal-container-full';
      overlay = 'navbar-overlay';
    }
    return (
      <div className='navbar-header'>
        <div className={full}>
        </div>
        <div onClick={this.handleClick} className={overlay}></div>
        <div className={modal}>
          <ul className='navbar-ul'>
            <a onClick={this.handleClick} href="#browse-all">
              <div className='row navbar-row-browse'>
                <div className='navbar-column-browse-icon'>
                  <i className='fas fa-store navbar-browse-icon'></i>
                </div>
                <div className='navbar-column-browse-text'>
                  <h1 className='navbar-browse-all-anchor'>buyandsell</h1>
                </div>
              </div>
            </a>
            <li>
              <a onClick={this.handleClick} href="#create-listing">
                <div className='row navbar-row-create'>
                  <div className='navbar-column-create-icon'>
                    <i className='fas fa-plus navbar-create-icon'></i>
                  </div>
                  <div className='navbar-column-create-text'>
                    <h1 className='navbar-create-anchor'>Create new listing</h1>
                  </div>
                </div>
              </a>
            </li>
            <li>
              <a onClick={this.handleClick} href="#your-listings">
                <div className='row navbar-row-listings'>
                  <div className='navbar-column-listings-icon'>
                    <i className='fas fa-tags navbar-listings-icon'></i>
                  </div>
                  <div className='navbar-column-listings-text'>
                    <h1 className='navbar-listings-anchor'>Your listings</h1>
                  </div>
                </div>
              </a>
            </li>
            <li>
              <a onClick={this.handleClick} href="#saved-items">
                <div className='row navbar-row-saved'>
                  <div className='navbar-column-saved-icon'>
                    <i className='fas fa-bookmark navbar-saved-icon'></i>
                  </div>
                  <div className='navbar-column-saved-text'>
                    <h1 className='navbar-saved-anchor'>Saved items</h1>
                  </div>
                </div>
              </a>
            </li>
            <li>
              { user !== null &&
                <a onClick={this.handleClickSignOut}>
                  <div className='row navbar-row-sign'>
                    <div className='navbar-column-sign-icon'>
                      <i className='fas fa-sign-out-alt navbar-sign-icon'></i>
                    </div>
                    <div className='navbar-column-sign-text'>
                      <h1 className='navbar-sign-anchor'>Sign out</h1>
                    </div>
                  </div>
                </a>
              }
              { user === null &&
                <a onClick={this.handleClick} href="#sign-in">
                  <div className='row navbar-row-sign'>
                    <div className='navbar-column-sign-icon'>
                      <i className='fas fa-sign-in-alt navbar-sign-icon'></i>
                    </div>
                    <div className='navbar-column-sign-text'>
                      <h1 className='navbar-sign-anchor'>Sign in</h1>
                    </div>
                  </div>
                </a>
              }
            </li>
          </ul>
        </div>
        <i onClick={this.handleClick} className={icon}></i>
      </div>
    );
  }
}

export default Navbar;
Navbar.contextType = AppContext;
