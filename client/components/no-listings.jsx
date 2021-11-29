import React from 'react';

export default class NoListings extends React.Component {

  render() {
    return (
      <div className="container">
        <div className="row row-header justify-center">
          <h1 className="page-header-text">Your Listings</h1>
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
