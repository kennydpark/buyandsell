import React from 'react';
import Redirect from '../components/redirect';
import NotFound from './not-found';

export default class YourListingDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listing: null
    };
  }

  componentDidMount() {
    document.body.style.backgroundColor = '#F8F8F8';
    fetch(`/api/user/listings/${this.props.listingId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-Access-Token': this.props.token
      }
    })
      .then(res => res.json())
      .then(listing => this.setState({ listing }));
  }

  render() {
    if (!this.props.user || !this.props.token) return <Redirect to="" />;
    if (!this.state.listing) return null;
    if (this.state.listing.error) {
      return <NotFound />;
    }
    const { listingId, imageUrl, title, price, location, condition, description } = this.state.listing;
    const href = `#edit-listing?listingId=${listingId}`;
    const googleLocation = `http://maps.google.com/?q=${location}`;
    return (
      <>
        <div className="details-container">
          <div className="row row-header justify-center">
            <h1 className="page-header-text">Your Listings</h1>
          </div>
          <div className="row row-back-button justify-left">
            <a href="#your-listings"><i className="fas fa-angle-left back-icon dark-grey-color"></i></a>
          </div>
          <div className="details-container-full text-center">
            <div className="row justify-center margin-auto">
              <div className="details-column-half">
                <div className="row image-container justify-center margin-auto">
                  <img src={imageUrl} className="details-listing-image" />
                </div>
              </div>
              <div className="details-column-half details-column-body">
                <div className="row row-details-body">
                  <div className="col-title">
                    <p className="details-card-title details-text text-start">{title}</p>
                  </div>
                  <div className="col-edit-icon">
                    <a href={href}><i className="fas fa-pen edit-icon"></i></a>
                  </div>
                </div>
                <div className="row">
                  <p className="details-card-price details-text dark-grey-color">${price}</p>
                </div>
                <div className="row">
                  <a href={googleLocation} target="_blank" rel="noopener noreferrer" className="google-location-anchor">
                    <p className="details-card-location details-text dark-grey-color">{location} <span><i className="fas fa-external-link-alt external-link-icon"></i></span></p>
                  </a>
                </div>
                <div className="row row-condition margin-auto dark-grey-color">
                  <div className="column">
                    <p className="details-card-condition-label details-text">Condition</p>
                  </div>
                  <div className="column">
                    <p className="details-card-condition details-text">{condition}</p>
                  </div>
                </div>
                <div className="row details-description-container text-start">
                  <p className="details-card-description dark-grey-color">{description}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
