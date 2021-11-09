import React from 'react';

export default class CreateListingFormDetails extends React.Component {
  constructor(props) {
    super(props);
    let imagePreview;
    if (this.props.details.file === null) {
      imagePreview = 'images/placeholder-image.png';
    } else {
      imagePreview = URL.createObjectURL(this.props.details.file);
    }
    this.state = {
      userId: this.props.details.userId,
      title: this.props.details.title,
      price: this.props.details.price,
      condition: this.props.details.condition,
      description: this.props.details.description,
      imagePreview: imagePreview,
      file: this.props.details.file,
      error: ''
    };
    this.fileInputRef = React.createRef();
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handlePriceChange = this.handlePriceChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.handleImageChange = this.handleImageChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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

  render() {
    return (
        <div className="container">
          <div className="row row-header justify-center">
            <h1 className="page-header-text">Item For Sale</h1>
          </div>
          <div className="form-container-full text-center">
            <form onSubmit={this.handleSubmit}>
              <div className="row">
                <div className="column-half">
                  <div className="row row-form row-file-upload">
                    <label className="custom-file-upload">
                        <img src={this.state.imagePreview} className="img-style"/>
                      <input onChange={this.handleImageChange} ref={this.fileInputRef} accept=".png, .jpg, .jpeg"
                            className="new-listing-form-style file-upload" type="file" name="image">
                      </input>
                    </label>
                  </div>
                </div>
                <div className="column-half">
                  <div className="row row-form row-input-title">
                    <input value={this.state.title} onChange={this.handleTitleChange} className="new-listing-form-style"
                          required label="title" type="text" placeholder="Title">
                    </input>
                  </div>
                  <div className="row row-form">
                    {/* this keeps bypassing any div element layered on top of it */}
                    {/* <div className="dollar"> */}
                      <input value={this.state.price} onChange={this.handlePriceChange} className="new-listing-form-style"
                            type="number" required placeholder="$ Price" />
                      {/* <span className='unit'>$</span> */}
                    {/* </div> */}
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
                  <div className="row row-form">
                    <textarea value={this.state.description} onChange={this.handleDescriptionChange}
                      className="new-listing-form-style" required label="description" type="text" rows="7"
                      placeholder="Description">
                    </textarea>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-buttons cancel-previous">
                  <button className="cancel-previous">Cancel</button>
                </div>
                <div className="col-buttons next-submit">
                  <button type="submit" className="next-submit">Next</button>
                </div>
              </div>
              <div className="row justify-center">
                <p className="text-no-image-error">{this.state.error}</p>
              </div>
            </form>
          </div>
        </div>
    );
  }
}
