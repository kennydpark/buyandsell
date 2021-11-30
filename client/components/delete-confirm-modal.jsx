import React from 'react';

class DeleteConfirm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleBuyerEmailChange = this.handleBuyerEmailChange.bind(this);
    this.handlePhoneChange = this.handlePhoneChange.bind(this);
    this.handleMessageChange = this.handleMessageChange.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.close = this.close.bind(this);
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
    fetch(`/api/user/listings/${this.props.listingId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'X-Access-Token': this.props.token
      }
    })
      .then(res => res.json());
    // .then(res => console.log(res));
  }

  close() {
    this.props.handleCancelButton();
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
              <button type="submit" className="delete-button">Confirm</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default DeleteConfirm;
