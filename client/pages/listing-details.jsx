import React from 'react';
import EmailForm from '../components/email-form-modal';
import Redirect from '../components/redirect';
import NotFound from './not-found';
import LoadingModal from '../components/loading-modal';
import LoadError from '../components/load-error';

export default class ListingDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listing: null,
      sellerEmail: null,
      formActive: false,
      saved: false,
      savedPrompt: 'saved-prompt saved-hidden',
      savedPromptText: 'Saved',
      loading: true,
      saveError: false
    };
    this.handleContactButton = this.handleContactButton.bind(this);
    this.handleCancelButton = this.handleCancelButton.bind(this);
    this.handleSaveButton = this.handleSaveButton.bind(this);
    this.prompt = this.prompt.bind(this);
    this.loadingClose = this.loadingClose.bind(this);
    this.closeAllModals = this.closeAllModals.bind(this);
  }

  componentDidMount() {
    document.body.style.backgroundColor = '#F8F8F8';
    if (this.props.route.path === 'listing-details') {
      fetch(`/api/listings/${this.props.listingId}`)
        .then(res => res.json())
        .then(listing => this.setState({ listing, loading: false }));
    } else {
      fetch(`/api/user/saved/listing/${this.props.listingId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'X-Access-Token': this.props.token
        }
      })
        .then(res => res.json())
        .then(listing => {
          if (listing.false) {
            this.setState({ saved: false });
          } else {
            this.setState({ saved: true });
          }
          this.setState({ listing, loading: false });
        });
    }

    fetch(`/api/user/saved/listing/${this.props.listingId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-Access-Token': this.props.token
      }
    })
      .then(res => res.json())
      .then(listing => {
        if (listing.false) {
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
    this.setState({ formActive: true });
  }

  handleCancelButton() {
    this.setState({ formActive: false });
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
        .catch(err => {
          this.setState({ saveError: true });
          console.error(err);
        });
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
        .catch(err => {
          this.setState({ saveError: true });
          console.error(err);
        });
      this.prompt();
    }
  }

  prompt() {
    this.intervalID = setTimeout(() => {
      this.setState({ savedPrompt: 'saved-prompt saved-hidden' });
    }, 2000);
  }

  componentWillUnmount() {
    clearTimeout(this.intervalID);
  }

  loadingClose() {
    this.setState({ loading: false });
  }

  closeAllModals() {
    this.setState({ saveError: false });
  }

  render() {
    if (!this.props.user || !this.props.token) return <Redirect to="" />;
    if (this.state.loading) {
      return <LoadingModal
        loading={this.state.loading}
        loadingClose={this.loadingClose} />;
    }
    if (!this.state.listing) return null;
    if (this.state.listing.false || this.state.listing.error) {
      return <NotFound />;
    }
    const {
      imageUrl, title, price, location, condition, description
    } = this.state.listing;
    let bookmark;
    if (this.state.saved === false) {
      bookmark = 'far fa-bookmark bookmark-icon';
    } else {
      bookmark = 'fas fa-bookmark bookmark-icon';
    }
    let contactView;
    let notice;
    if ((this.props.route.path === 'listing-details') && (this.state.listing.userId === this.props.user.userId)) {
      contactView = 'hidden';
      bookmark = 'hidden';
      notice = 'row justify-center italic dark-grey-color front-margin-top';
    } else {
      contactView = 'row row-contact-seller justify-center';
      notice = 'hidden';
    }
    let href;
    let header;
    if (this.props.route.path === 'listing-details') {
      href = '#browse-all';
      header = 'buyandsell';
    } else {
      href = '#saved-items';
      header = 'Saved Items';
    }
    const googleLocation = `http://maps.google.com/?q=${location}`;
    return (
      <>
        < EmailForm formActive={this.state.formActive}
        listingId={this.props.listingId}
        listingInfo={this.state.listing}
        sellerEmail={this.state.sellerEmail}
        handleCancelButton={this.handleCancelButton}
        route={this.props.route} />
        <LoadError
          loadError={this.state.saveError}
          closeAllModals={this.closeAllModals} />;
        <div className="details-container">
          <div className="row row-header justify-center">
            <a href={href} className="page-header-anchor"><h1 className="page-header-text">{header}</h1></a>
          </div>
          <div className="row row-back-button justify-left">
            <a href={href}><i className="fas fa-angle-left back-icon dark-grey-color"></i></a>
          </div>
          <div className="details-container-full text-center">
            <div className="row row-card-full justify-center margin-auto">
              <div className="details-column-half">
                <div className="row image-container justify-center margin-auto">
                  <img src={imageUrl} className="details-listing-image" alt={title} />
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
            <div className={contactView}>
              <div className="column-half column-contact-seller justify-center">
                <button onClick={this.handleContactButton} className="contact-seller">Contact Seller</button>
              </div>
            </div>
            <div className={notice}>
              <p>You are the seller of this listing.</p>
            </div>
          </div>
        </div>
      </>
    );
  }
}
