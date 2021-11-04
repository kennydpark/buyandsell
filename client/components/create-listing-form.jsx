import React from 'react';

export default class CreateListingForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: 1,
      title: '',
      price: '',
      condition: '',
      description: '',
      location: 'Irvine, CA',
      selectValue: 'Condition',
      file: null
    };
    this.fileInputRef = React.createRef();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handlePriceChange = this.handlePriceChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.handleImageChange = this.handleImageChange.bind(this);
  }

  handleImageChange(event) {
    this.setState({
      file: URL.createObjectURL(event.target.files[0])
    });
  }

  handleSelectChange(event) {
    this.setState({ selectValue: event.target.value });
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
    const formData = new FormData();
    formData.append('userId', String(this.state.userId));
    formData.append('image', this.fileInputRef.current.files[0]);
    formData.append('title', this.state.title);
    formData.append('price', this.state.price);
    formData.append('location', this.state.location);
    formData.append('condition', this.state.selectValue);
    formData.append('description', this.state.description);
    fetch('/api/listings', {
      method: 'POST',
      body: formData
    })
      .then(response => response.json())
      .then(data => {
        this.setState({
          title: '',
          price: '',
          condition: '',
          description: ''
        });
        this.fileInputRef.current.value = null;
      })
      .catch(err => console.error(err));
  }

  render() {
    let imagePreview;
    if (this.state.file === null) {
      imagePreview = '../placeholder-image.png';
    } else {
      imagePreview = this.state.file;
    }
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
                    <img src={imagePreview}/>
                      <input onChange={this.handleImageChange} ref={this.fileInputRef} accept=".png, .jpg, .jpeg" className="new-listing-form-style file-upload" required type="file" name="image"></input>
                    </label>
                  </div>
                </div>
                <div className="column-half">
                  <div className="row row-form row-input-title">
                    <input onChange={this.handleTitleChange} className="new-listing-form-style" required label="title" type="text" placeholder="Title"></input>
                  </div>
                  <div className="row row-form">
                    <input onChange={this.handlePriceChange} className="new-listing-form-style" required label="price" type="text" placeholder="Price"></input>
                  </div>
                  <div className="row row-form">
                  <select value={this.state.selectValue} onChange={this.handleSelectChange} className="new-listing-form-style" required label="condition" placeholder="Condition">
                      <option value="Condition" className="first">Condition</option>
                      <option value="New">New</option>
                      <option value="Used - Like New">Used - Like New</option>
                      <option value="Used - Good">Used - Good</option>
                      <option value="Used - Fair">Used - Fair</option>
                    </select>
                  </div>
                  <div className="row row-form">
                    <textarea onChange={this.handleDescriptionChange} className="new-listing-form-style" required label="description" type="text" rows="7" placeholder="Description"></textarea>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-buttons cancel">
                  <button className="cancel">Cancel</button>
                </div>
                <div className="col-buttons next">
                  <button type="submit" className="next">Next</button>
                </div>
              </div>
            </form>
          </div>
        </div>
    );
  }
}
