import React from 'react';
import ScrollToTop from '../components/scroll-to-top';
import styled from 'styled-components';

const Input = styled.input`
  color: ${props => props.theme.fontColor};
  background-color: ${props => props.theme.inputBackground};
  transition: all .5s ease;
`;

export default class CreateListingFormDetails extends React.Component {
  constructor(props) {
    super(props);
    let imagePreview;
    if (this.props.details.file === null) {
      imagePreview = 'images/placeholder.png';
    } else {
      imagePreview = URL.createObjectURL(this.props.details.file);
    }
    this.state = {
      title: this.props.details.title,
      price: this.props.details.price,
      condition: this.props.details.condition,
      description: this.props.details.description,
      imagePreview,
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
    const header = 'Item For Sale';
    return (
      <div className="container">
        <ScrollToTop header={header} theme={this.props.theme} handleTheme={this.props.handleTheme} />
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
                  <Input value={this.state.title} onChange={this.handleTitleChange} className="new-listing-form-style"
                        required label="title" type="text" placeholder="Title">
                  </Input>
                </div>
                <div className="row row-form">
                  <span className="dollar">
                    <Input value={this.state.price} onChange={this.handlePriceChange} className="new-listing-form-style"
                  type="number" min="0" max="999999" required placeholder="Price" />
                  </span>
                </div>
                <div className="row row-form">
                  <Input as="select" value={this.state.condition} onChange={this.handleSelectChange}
                      className="new-listing-form-style" required label="condition" placeholder="Condition">
                    <option value="Condition" disabled>Condition</option>
                    <option value="New">New</option>
                    <option value="Used - Like New">Used - Like New</option>
                    <option value="Used - Good">Used - Good</option>
                    <option value="Used - Fair">Used - Fair</option>
                  </Input>
                </div>
                <div className="row row-form row-description">
                  <Input as="textarea" value={this.state.description} onChange={this.handleDescriptionChange}
                    className="new-listing-form-style" required label="description" type="text" rows="7"
                    placeholder="Description">
                  </Input>
                </div>
              </div>
            </div>
            <div className="row row-details-submit">
              <div className="col-buttons cancel-previous">
                <a href="#browse-all" className="create-listing-cancel-button">Cancel</a>
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
