import React from 'react';
import Redirect from '../components/redirect';

export default class YourListingDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listing: null,
      token: this.props.token
    };
  }

  componentDidMount() {
    this.setState({ token: this.props.token });
    fetch(`/api/user/listings/${this.props.listingId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-Access-Token': this.state.token
      }
    })
      .then(res => res.json())
      .then(listing => this.setState({ listing }));
  }

  render() {
    if (!this.props.user) return <Redirect to="" />;
    if (!this.state.listing) return null;
    const {
      imageUrl, title, price, location, condition, description
    } = this.state.listing;
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
                  <p className="details-card-title details-text text-start dark-grey-color">{title}</p>
                </div>
                <div className="row">
                  <p className="details-card-price details-text dark-grey-color">${price}</p>
                </div>
                <div className="row">
                  <p className="details-card-location details-text dark-grey-color">{location}</p>
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
