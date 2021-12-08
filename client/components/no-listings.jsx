import React from 'react';

export default class NoListings extends React.Component {
  constructor(props) {
    super(props);
    this.scrollToTop = this.scrollToTop.bind(this);
  }

  scrollToTop() {
    window.scrollTo(0, 0);
  }

  render() {
    return (
      <div className="container no-listings-container">
        <div className="row row-header justify-center">
          <a onClick={this.scrollToTop} className="page-header-anchor"><h1 className="page-header-text">Your Listings</h1></a>
        </div>
        <div className="form-container-full div-published-body text-center">
          <p className="dark-grey-color">When you start selling, your listings will appear here.</p>
        </div>
        <div className="row row-create-new-listing-button justify-center">
          <a href="#create-listing" className="create-new-listing-button">
            <span><i className="fas fa-plus create-new-icon"></i></span> Create new listing
          </a>
        </div>
      </div>
    );
  }
}
