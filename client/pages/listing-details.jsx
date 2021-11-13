import React from 'react';
import EmailForm from '../components/email-form-modal';

export default class ListingDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listing: null,
      sellerEmail: null,
      formActive: false
    };
    this.handleContactButton = this.handleContactButton.bind(this);
    this.handleCancelButton = this.handleCancelButton.bind(this);
  }

  componentDidMount() {
    fetch(`/api/listings/${this.props.listingId}`)
      .then(res => res.json())
      .then(listing => this.setState({ listing }));
  }

  handleContactButton() {
    fetch(`/api/listings/email/${this.props.listingId}`, {
      method: 'GET'
    })
      .then(res => res.json())
      .then(email => this.setState({ sellerEmail: email.email }))
      .catch(err => console.error(err));
    this.setState({
      formActive: true
    });
  }

  handleCancelButton() {
    this.setState({
      formActive: false
    });
  }

  render() {
    if (!this.state.listing) return null;
    const {
      imageUrl, title, price, location, condition, description
    } = this.state.listing;
    return (
      <>
        < EmailForm formActive={this.state.formActive}
        listingId={this.props.listingId}
        sellerEmail={this.state.sellerEmail}
        handleCancelButton={this.handleCancelButton} />
        <div className="details-container">
          <div className="row row-header justify-center">
            <h1 className="page-header-text">buyandsell</h1>
          </div>
          <div className="row row-back-button justify-left">
            <a href="#browse-all"><i className="fas fa-angle-left back-icon dark-grey-color"></i></a>
          </div>
          <div className="details-container-full text-center">
            <div className="row justify-center margin-auto">
              <div className="details-column-half">
                <div className="row justify-center margin-auto">
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
                <div className="row text-start">
                  <p className="details-card-description dark-grey-color">{description}</p>
                </div>
              </div>
            </div>
            <div className="row row-contact-seller justify-center">
              <div className="column-half"></div>
              <div className="column-half column-contact-seller">
                <button onClick={this.handleContactButton} className="contact-seller">Contact Seller</button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
