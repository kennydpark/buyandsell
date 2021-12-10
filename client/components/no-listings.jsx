import React from 'react';
import ScrollToTop from '../components/scroll-to-top';

export default class NoListings extends React.Component {
  render() {
    const header = 'Your Listings';
    return (
      <div className="container no-listings-container">
        <ScrollToTop header={header} />
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
