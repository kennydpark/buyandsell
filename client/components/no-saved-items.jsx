import React from 'react';

export default class NoSavedItems extends React.Component {
  constructor(props) {
    super(props);
    this.scrollToTop = this.scrollToTop.bind(this);
  }

  scrollToTop() {
    window.scrollTo(0, 0);
  }

  render() {
    return (
      <div className="container saved-items-container">
        <div className="row row-header justify-center">
          <a onClick={this.scrollToTop} className="page-header-anchor"><h1 className="page-header-text">Saved Items</h1></a>
        </div>
        <div className="form-container-full div-published-body text-center">
          <p className="dark-grey-color">You have no saved items.</p>
        </div>
        <div className="row row-create-new-listing-button justify-center">
          <a href="#browse-all" className="create-new-listing-button">
            <span><i className="fas fa-store create-new-icon"></i></span> Browse listings
          </a>
        </div>
      </div>
    );
  }
}
