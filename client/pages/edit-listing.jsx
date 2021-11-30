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
      title: '',
      price: '',
      condition: '',
      description: '',
      formActive: false
    };
    this.fileInputRef = React.createRef();
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handlePriceChange = this.handlePriceChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.handleImageChange = this.handleImageChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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
        .then(listing => this.setState({ listing }));
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
    this.setState({
      title: event.target.value
    });
  }

  handlePriceChange(event) {
    this.setState({
      price: event.target.value
    });
  }

  handleDescriptionChange(event) {
    this.setState({
      description: event.target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.state.file === null) {
      this.setState({
        error: 'You must upload an image file.'
      });
    } else {
      this.props.handleDetailsSubmitted(this.state);
      this.setState({
        error: ''
      });
    }
  }

  handleConfirm() {
    this.setState({
      formActive: true
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
  }

  handleCancelButton() {
    this.setState({
      formActive: false
    });
  }

  render() {
    if (!this.props.user || !this.props.token) return <Redirect to="" />;
    if (!this.state.listing) return null;
    if (this.state.listing.error) {
      return <NotFound />;
    }
    let image;
    if (this.state.file === null) {
      image = this.state.listing.imageUrl;
    } else {
      image = URL.createObjectURL(this.state.file);
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
                      <img src={image} className="img-style" />
                      <input onChange={this.handleImageChange} ref={this.fileInputRef} accept=".png, .jpg, .jpeg"
                        className="new-listing-form-style file-upload" type="file" name="image">
                      </input>
                    </label>
                  </div>
                </div>
                <div className="column-half">
                  <div className="row row-form row-input-title">
                    <input value={this.state.listing.title} onChange={this.handleTitleChange} className="new-listing-form-style"
                      required label="title" type="text">
                    </input>
                  </div>
                  <div className="row row-form">
                    <input value={this.state.listing.price} onChange={this.handlePriceChange} className="new-listing-form-style"
                      type="number" min="0" max="999999" required placeholder="$ Price" />
                  </div>
                  <div className="row row-form">
                    <select value={this.state.listing.condition} onChange={this.handleSelectChange}
                      className="new-listing-form-style" required label="condition" placeholder="Condition">
                      <option value="Condition" disabled>Condition</option>
                      <option value="New">New</option>
                      <option value="Used - Like New">Used - Like New</option>
                      <option value="Used - Good">Used - Good</option>
                      <option value="Used - Fair">Used - Fair</option>
                    </select>
                  </div>
                  <div className="row row-form row-description">
                    <textarea value={this.state.listing.description} onChange={this.handleDescriptionChange}
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
                  <button type="submit" className="next-submit">Save</button>
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
