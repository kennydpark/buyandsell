import React from 'react';
import LoadingModal from './loading-modal';
import LoadError from '../components/load-error';

class EmailForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      buyerEmail: '',
      phone: '',
      message: '',
      loading: false,
      sent: false,
      loadError: false
    };
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleBuyerEmailChange = this.handleBuyerEmailChange.bind(this);
    this.handlePhoneChange = this.handlePhoneChange.bind(this);
    this.handleMessageChange = this.handleMessageChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.close = this.close.bind(this);
    this.loadingClose = this.loadingClose.bind(this);
    this.sentModalClose = this.sentModalClose.bind(this);
    this.closeAllModals = this.closeAllModals.bind(this);
  }

  handleNameChange(event) {
    this.setState({
      name: event.target.value
    });
  }

  handleBuyerEmailChange(event) {
    this.setState({
      buyerEmail: event.target.value
    });
  }

  handlePhoneChange(event) {
    this.setState({
      phone: event.target.value
    });
  }

  handleMessageChange(event) {
    this.setState({
      message: event.target.value
    });
  }

  handleSubmit(event) {
    this.close();
    this.setState({ loading: true });
    event.preventDefault();
    const data = {
      to: this.props.sellerEmail,
      from: 'buyandsell0821@gmail.com',
      subject: `buyandsell - ${this.state.name} is interested in '${this.props.listingInfo.title}'!`,
      html: `${this.state.name} has reached out to you for your listing, '${this.props.listingInfo.title}':
        <br><strong>${this.state.message}</strong>
        <br><br><em>Contact information:</em>
        <br>Email: ${this.state.buyerEmail}<br> Phone number: ${this.state.phone}
        <br><br><br>${this.props.listingInfo.title}
        <br> $${this.props.listingInfo.price}
        <br> Condition: ${this.props.listingInfo.condition}
        <br> Description: ${this.props.listingInfo.description}
        <br> ${this.props.listingInfo.location}
        <br><br><br> <em>Do not reply to this email.</em>`
    };
    fetch('/api/email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(data => {
        this.setState({ loading: false, sent: true });
      })
      .catch(err => {
        this.setState({ loadError: true });
        console.error(err);
      });
  }

  close() {
    this.setState({
      name: '',
      buyerEmail: '',
      phone: '',
      message: ''
    });
    this.props.handleCancelButton();
  }

  loadingClose() {
    this.setState({ loading: false });
  }

  sentModalClose() {
    this.setState({ sent: false });
  }

  closeAllModals() {
    this.setState({ loading: false, loadError: false });
  }

  render() {
    let modal;
    let window;
    if (this.props.formActive === false) {
      modal = 'email-modal-container hidden';
      window = 'navbar-modal-container-full';
    } else {
      modal = 'email-modal-container email-overlay';
      window = 'email-modal-window email-modal-shadow';
    }
    let sentModal;
    let sentWindow;
    if (this.state.sent === false) {
      sentModal = 'sent-modal-container hidden';
      sentWindow = 'navbar-modal-container-full';
    } else {
      sentModal = 'sent-modal-container sent-overlay';
      sentWindow = 'sent-modal-window';
    }
    let href;
    if (this.props.route.path === 'listing-details') {
      href = `#listing-details?listingId=${this.props.listingId}`;
    } else {
      href = `#saved-item-details?listingId=${this.props.listingId}`;
    }

    return (
      <>
        < LoadingModal loading={this.state.loading}
          loadingClose={this.loadingClose} />
        <LoadError
          loadError={this.state.loadError}
          closeAllModals={this.closeAllModals} />;
        <div className={modal}>
          <div className={window}>
            <form onSubmit={this.handleSubmit}>
              <div className="row row-form row-input-name">
                <input onChange={this.handleNameChange} className="new-listing-form-style"
                  required label="name" type="text" placeholder="Name">
                </input>
              </div>
              <div className="row row-form">
                <input onChange={this.handleBuyerEmailChange} className="new-listing-form-style"
                  type="email" required placeholder="Email" />
              </div>
              <div className="row row-form row-input-title">
                <input onChange={this.handlePhoneChange} className="new-listing-form-style"
                label="phone" type="tel" maxLength="14" placeholder="Phone Number">
                </input>
              </div>
              <div className="row row-form">
                <textarea value={this.state.description} onChange={this.handleMessageChange}
                  className="new-listing-form-style" required label="message" type="text" rows="7"
                  placeholder="Message">
                </textarea>
              </div>
              <div className="row">
                <div className="col-buttons cancel-previous">
                  <a href={href} onClick={this.close} className="create-listing-cancel-button">Cancel</a>
                </div>
                <div className="col-buttons next-submit">
                  <button type="submit" className="next-submit">Submit</button>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className={sentModal}>
          <div className={sentWindow}>
            <div className="row row-form justify-center front-margin-top">
              <p className="dark-grey-color">Your email has been sent!</p>
            </div>
            <div className="row justify-center margin-bottom-button">
              <button onClick={this.sentModalClose} className="next-submit">Okay</button>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default EmailForm;
