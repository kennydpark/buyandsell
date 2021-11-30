import React from 'react';
import Redirect from '../components/redirect';

class DeleteConfirm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      deleted: false
    };
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleBuyerEmailChange = this.handleBuyerEmailChange.bind(this);
    this.handlePhoneChange = this.handlePhoneChange.bind(this);
    this.handleMessageChange = this.handleMessageChange.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.close = this.close.bind(this);
    this.deleted = this.deleted.bind(this);
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

  handleDelete() {
    event.preventDefault();
    fetch(`/api/user/listings/${this.props.listing.listingId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'X-Access-Token': this.props.token
      }
    })
      .then(res => {
        this.deleted();
      })
    // .then(res => console.log(res));
      .catch(err => console.error(err));
  }

  close() {
    this.props.handleCancelButton();
  }

  deleted() {
    this.setState({ deleted: true });
    this.props.handleCancelButton();
  }

  render() {
    if (this.state.deleted === true) {
      return <Redirect to="your-listings" />;
    }
    let modal;
    let window;
    if (this.props.formActive === false) {
      modal = 'email-modal-container hidden';
      window = 'navbar-modal-container-full';
    } else {
      modal = 'email-modal-container email-overlay';
      window = 'email-modal-window email-modal-shadow';
    }
    // const href = `#edit-listing?listingId=${this.props.listing.listingId}`;
    return (
      <div className={modal}>
        <div className={window}>
          <div className="row justify-center row-delete-confirm">
            <p className="dark-grey-color text-center delete-confirm-text">Are you sure you want to delete this listing?</p>
          </div>
          <div className="row row-delete-confirm-buttons">
            <div className="col-buttons cancel-previous">
              <a onClick={this.close} className="create-listing-cancel-button">Cancel</a>
            </div>
            <div className="col-buttons next-submit">
              <button onClick={this.handleDelete} className="delete-button">Confirm</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default DeleteConfirm;
