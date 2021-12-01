import React from 'react';
import Redirect from '../components/redirect';
import NotFound from './not-found';
import DeleteConfirm from '../components/delete-confirm-modal';

export default class EditListing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listing: null,
      file: null,
      imagePreview: null,
      title: '',
      price: '',
      condition: '',
      description: '',
      formActive: false,
      updated: false
    };
    this.fileInputRef = React.createRef();
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handlePriceChange = this.handlePriceChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.handleImageChange = this.handleImageChange.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleConfirm = this.handleConfirm.bind(this);
    this.handleCancelButton = this.handleCancelButton.bind(this);
  }

  componentDidMount() {
    if (this.props.user && this.props.token) {
      fetch(`/api/user/listings/${this.props.listingId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'X-Access-Token': this.props.token
        }
      })
        .then(res => res.json())
        .then(listing => this.setState({
          listing,
          file: listing.imageUrl,
          imagePreview: listing.imageUrl,
          title: listing.title,
          price: listing.price,
          condition: listing.condition,
          description: listing.description
        }));
    }
  }

  handleImageChange(event) {
    this.setState({
      imagePreview: URL.createObjectURL(event.target.files[0]),
      file: event.target.files[0]
    });
  }

  handleSelectChange(event) {
    this.setState({ condition: event.target.value });
  }

  handleTitleChange(event) {
    this.setState({ title: event.target.value });
  }

  handlePriceChange(event) {
    this.setState({ price: event.target.value });
  }

  handleDescriptionChange(event) {
    this.setState({ description: event.target.value });
  }

  handleSave(event) {
    event.preventDefault();
    const formData = new FormData();
    formData.append('image', this.state.file);
    formData.append('title', this.state.title);
    formData.append('price', this.state.price);
    formData.append('condition', this.state.condition);
    formData.append('description', this.state.description);
    if (this.props.user && this.props.token) {
      fetch(`/api/user/listings/${this.props.listingId}`, {
        method: 'PATCH',
        headers: {
          'X-Access-Token': this.props.token
        },
        body: formData
      })
        .then(res => {
          this.setState({ updated: true });
        })
        .catch(err => console.error(err));
    }
  }

  handleConfirm() {
    this.setState({ formActive: true });
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
  }

  handleCancelButton() {
    this.setState({ formActive: false });
  }

  render() {
    if (!this.props.user || !this.props.token) return <Redirect to="" />;
    if (!this.state.listing) return null;
    if (this.state.listing.error) {
      return <NotFound />;
    }
    const postUpdate = `your-listing-details?listingId=${this.props.listingId}`;
    if (this.state.updated === true) {
      return <Redirect to={postUpdate} />;
    }
    const href = `#your-listing-details?listingId=${this.props.listingId}`;
    return (
      <>
        < DeleteConfirm formActive={this.state.formActive}
            listing={this.state.listing}
            handleCancelButton={this.handleCancelButton}
            user={this.props.user}
            token={this.props.token} />
        <div className="container">
          <div className="row row-header justify-center">
            <h1 className="page-header-text">Edit listing</h1>
          </div>
          <div className="row row-back-button justify-left">
            <a href={href}><i className="fas fa-angle-left back-icon dark-grey-color"></i></a>
          </div>
          <div className="form-container-full text-center">
            <form onSubmit={this.handleSubmit}>
              <div className="row">
                <div className="column-half">
                  <div className="row row-form row-file-upload">
                    <label className="custom-file-upload">
                      <img src={this.state.imagePreview} className="img-style" />
                      <input onChange={this.handleImageChange} ref={this.fileInputRef} accept=".png, .jpg, .jpeg"
                        className="new-listing-form-style file-upload" type="file" name="image">
                      </input>
                    </label>
                  </div>
                </div>
                <div className="column-half">
                  <div className="row row-form row-input-title">
                    <input value={this.state.title} onChange={this.handleTitleChange} className="new-listing-form-style"
                      required label="title" type="text">
                    </input>
                  </div>
                  <div className="row row-form">
                    <input value={this.state.price} onChange={this.handlePriceChange} className="new-listing-form-style"
                      type="number" min="0" max="999999" required placeholder="$ Price" />
                  </div>
                  <div className="row row-form">
                    <select value={this.state.condition} onChange={this.handleSelectChange}
                      className="new-listing-form-style" required label="condition" placeholder="Condition">
                      <option value="Condition" disabled>Condition</option>
                      <option value="New">New</option>
                      <option value="Used - Like New">Used - Like New</option>
                      <option value="Used - Good">Used - Good</option>
                      <option value="Used - Fair">Used - Fair</option>
                    </select>
                  </div>
                  <div className="row row-form row-description">
                    <textarea value={this.state.description} onChange={this.handleDescriptionChange}
                      className="new-listing-form-style" required label="description" type="text" rows="7"
                      placeholder="Description">
                    </textarea>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-buttons cancel-previous">
                  <a onClick={this.handleConfirm} className="delete-button">Delete</a>
                </div>
                <div className="col-buttons next-submit">
                  <button onClick={this.handleSave} className="next-submit">Save</button>
                </div>
              </div>
              <div className="row justify-center">
                <p className="text-no-image-error">{this.state.error}</p>
              </div>
            </form>
          </div>
        </div>
      </>
    );
  }
}
