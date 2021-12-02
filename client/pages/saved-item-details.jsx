import React from 'react';
import EmailForm from '../components/email-form-modal';
import Redirect from '../components/redirect';
import NotFound from './not-found';

export default class SavedItemDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listing: null,
      sellerEmail: null,
      formActive: false,
      saved: false,
      savedPrompt: 'saved-prompt saved-hidden',
      savedPromptText: 'Saved'
    };
    this.handleContactButton = this.handleContactButton.bind(this);
    this.handleCancelButton = this.handleCancelButton.bind(this);
    this.handleSaveButton = this.handleSaveButton.bind(this);
    this.prompt = this.prompt.bind(this);
  }

  componentDidMount() {
    fetch(`/api/user/saved/listing/${this.props.listingId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-Access-Token': this.props.token
      }
    })
      .then(res => res.json())
      .then(listing => this.setState({ listing }));

    fetch(`/api/user/saved/${this.props.listingId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-Access-Token': this.props.token
      }
    })
      .then(res => res.json())
      .then(listing => {
        if (listing.length === 0) {
          this.setState({ saved: false });
        } else {
          this.setState({ saved: true });
        }
      });
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

  handleSaveButton() {
    if (this.state.saved === false) {
      fetch(`/api/user/saved/${this.props.listingId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Access-Token': this.props.token
        }
      })
        .then(res => {
          this.setState({
            saved: true,
            savedPrompt: 'saved-prompt saved-view',
            savedPromptText: 'Saved'
          });
        })
        .catch(err => console.error(err));
      this.prompt();
    } else {
      fetch(`/api/user/saved/${this.props.listingId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'X-Access-Token': this.props.token
        }
      })
        .then(res => {
          this.setState({
            saved: false,
            savedPrompt: 'saved-prompt saved-view',
            savedPromptText: 'Removed'
          });
        })
        .catch(err => console.error(err));
      this.prompt();
    }
  }

  prompt() {
    this.intervalID = setTimeout(() => {
      this.setState({ savedPrompt: 'saved-prompt saved-hidden' });
    }, 2000);
  }

  render() {
    if (!this.props.user || !this.props.token) return <Redirect to="" />;
    if (!this.state.listing) return null;
    if (this.state.listing.error) {
      return <NotFound />;
    }
    const {
      imageUrl, title, price, location, condition, description
    } = this.state.listing;
    let contactView;
    if (this.state.listing.userId === this.props.user.userId) {
      contactView = 'hidden';
    } else {
      contactView = 'row row-contact-seller justify-center';
    }
    let bookmark;
    if (this.state.saved === false) {
      bookmark = 'far fa-bookmark bookmark-icon';
    } else {
      bookmark = 'fas fa-bookmark bookmark-icon';
    }
    return (
      <>
        < EmailForm formActive={this.state.formActive}
          listingId={this.props.listingId}
          listingInfo={this.state.listing}
          sellerEmail={this.state.sellerEmail}
          handleCancelButton={this.handleCancelButton} />
        <div className="details-container">
          <div className="row row-header justify-center">
            <h1 className="page-header-text">Saved Items</h1>
          </div>
          <div className="row row-back-button justify-left">
            <a href="#saved-items"><i className="fas fa-angle-left back-icon dark-grey-color"></i></a>
          </div>
          <div className="details-container-full text-center">
            <div className="row justify-center margin-auto">
              <div className="details-column-half">
                <div className="row image-container justify-center margin-auto">
                  <img src={imageUrl} className="details-listing-image" />
                  <p className={this.state.savedPrompt}>{this.state.savedPromptText}</p>
                </div>
              </div>
              <div className="details-column-half details-column-body">
                <div className="row row-details-body">
                  <div className="col-title">
                    <p className="details-card-title details-text text-start dark-grey-color">{title}</p>
                  </div>
                  <div className="col-bookmark-icon">
                    <a onClick={this.handleSaveButton}><i className={bookmark}></i></a>
                  </div>
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
            <div className={contactView}>
              <div className="column-half column-contact-empty"></div>
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
