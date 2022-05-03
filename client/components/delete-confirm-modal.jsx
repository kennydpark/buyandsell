import React from 'react';
import Redirect from '../components/redirect';
import LoadingModal from '../components/loading-modal';
import styled from 'styled-components';

const DeleteModal = styled.div`
  color: ${props => props.theme.fontColor};
  background-color: ${props => props.theme.primary};
`;

class DeleteConfirm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      deleted: false,
      saved: false,
      loading: false
    };
    this.handleDelete = this.handleDelete.bind(this);
    this.close = this.close.bind(this);
    this.deleted = this.deleted.bind(this);
    this.loadingClose = this.loadingClose.bind(this);
  }

  componentDidMount() {
    fetch(`/api/user/allSaved/${this.props.listing.listingId}`, {
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

  handleDelete() {
    this.setState({ loading: true });
    event.preventDefault();
    if (this.state.saved === true) {
      fetch(`/api/user/allSaved/${this.props.listing.listingId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'X-Access-Token': this.props.token
        }
      })
        .catch(err => console.error(err));
    }

    fetch(`/api/user/listings/${this.props.listing.listingId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'X-Access-Token': this.props.token
      }
    })
      .then(res => {
        this.setState({ loading: false });
        this.deleted();
      })
      .catch(err => console.error(err));
  }

  close() {
    this.props.handleCancelButton();
  }

  deleted() {
    this.setState({ deleted: true });
    this.props.handleCancelButton();
  }

  loadingClose() {
    this.setState({ loading: false });
  }

  render() {
    if (this.state.deleted === true) {
      return <Redirect to="my-listings" />;
    }
    if (this.state.loading) {
      return <LoadingModal
        loading={this.state.loading}
        loadingClose={this.loadingClose} />;
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
    return (
      <div className={modal}>
        <DeleteModal className={window}>
          <div className="row justify-center row-delete-confirm">
            <p className="text-center delete-confirm-text">Are you sure you want to delete this listing?</p>
          </div>
          <div className="row row-delete-confirm-buttons">
            <div className="col-buttons cancel-previous">
              <a onClick={this.close} className="create-listing-cancel-button">Cancel</a>
            </div>
            <div className="col-buttons next-submit">
              <button onClick={this.handleDelete} className="delete-button">Confirm</button>
            </div>
          </div>
        </DeleteModal>
      </div>
    );
  }
}

export default DeleteConfirm;
