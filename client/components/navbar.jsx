import React from 'react';

class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    if (this.state.active === false) {
      this.setState({ active: true });
    } else {
      this.setState({ active: false });
    }
  }

  render() {
    let modal;
    let full;
    let overlay;
    const icon = 'fas fa-bars navbar-icon';
    if (this.state.active === false) {
      modal = 'navbar-modal-container navbar-hidden';
      full = 'navbar-modal-container-full';
      overlay = 'navbar-overlay overlay-hidden';
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
            <div className='row navbar-row-browse' onClick={this.handleClick}>
              <div className='navbar-column-browse-icon'>
                <i className='fas fa-store navbar-browse-icon'></i>
              </div>
              <div className='navbar-column-browse-text'>
                <h1 className='navbar-browse-all-anchor' onClick={this.handleClick}>Browse all</h1>
              </div>
            </div>
            <li onClick={this.handleClick}>
              <div className='row navbar-row-create'>
                <div className='navbar-column-create-icon'>
                  <i className='fas fa-plus navbar-create-icon'></i>
                </div>
                <div className='navbar-column-create-text'>
                  <h1 className='navbar-create-anchor' onClick={this.handleClick}>Create new listing</h1>
                </div>
              </div>
            </li>
            <li onClick={this.handleClick}>
              <div className='row navbar-row-listings'>
                <div className='navbar-column-listings-icon'>
                  <i className='fas fa-tags navbar-listings-icon'></i>
                </div>
                <div className='navbar-column-listings-text'>
                  <h1 className='navbar-listings-anchor' onClick={this.handleClick}>Your listings</h1>
                </div>
              </div>
            </li>
            <li onClick={this.handleClick}>
              <div className='row navbar-row-saved'>
                <div className='navbar-column-saved-icon'>
                  <i className='fas fa-bookmark navbar-saved-icon'></i>
                </div>
                <div className='navbar-column-saved-text'>
                  <h1 className='navbar-saved-anchor' onClick={this.handleClick}>Saved items</h1>
                </div>
              </div>
            </li>
            <li onClick={this.handleClick}>
              <div className='row navbar-row-sign'>
                <div className='navbar-column-sign-icon'>
                  <i className='fas fa-sign-out-alt navbar-sign-icon'></i>
                </div>
                <div className='navbar-column-sign-text'>
                  <h1 className='navbar-sign-anchor' onClick={this.handleClick}>Sign out</h1>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <i onClick={this.handleClick} className={icon}></i>
      </div>
    );
  }
}

export default Navbar;
