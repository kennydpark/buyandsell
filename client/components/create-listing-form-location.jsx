import React from 'react';
// import CreateListingFormParent from './create-listing-form-parent';
// import CreateListingFormDetails from './create-listing-form-details';

export default class CreateListingFormLocation extends React.Component {
  constructor(props) {
    super(props);
    // this.state = this.props.data;
    this.state = {
      userId: this.props.data.userId,
      title: this.props.data.title,
      price: this.props.data.price,
      file: this.props.data.file,
      condition: this.props.data.condition,
      description: this.props.data.description,
      location: this.props.data.location
    };
    this.handleLocationChange = this.handleLocationChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // detailsData() {
  //   this.setState(this.props.data);
  // }

  handleLocationChange(event) {
    this.setState({ location: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData();
    formData.append('userId', String(this.state.userId));
    formData.append('image', 'no image. just a test');
    formData.append('title', this.state.title);
    formData.append('price', this.state.price);
    formData.append('location', this.state.location);
    formData.append('condition', this.state.condition);
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
          description: '',
          location: ''
        });
        // this.fileInputRef.current.value = null;
      })
      .catch(err => console.error(err));
  }

  render() {
    // console.log('details:', this.props.data);
    const googleMapPlaceholder = 'images/irvine-map.png';
    return (
      <div className="container">
        <div className="row row-header justify-center">
          <h1 className="page-header-text">Item For Sale</h1>
        </div>
        <div className="form-container-full text-center">
          <form onSubmit={this.handleSubmit}>
            <div className="row">
              <div className="column-half">
                <div className="row row-form">
                  <select onChange={this.handleLocationChange} defaultValue="Location" className="new-listing-form-style" required label="location" placeholder="Location">
                    <option value="Location" disabled>Location</option>
                    <option value="Irvine, CA">Irvine, CA</option>
                  </select>
                </div>
                <div className="row row-form">
                  <img src={googleMapPlaceholder} className="img-style" />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-buttons cancel-previous">
                <button onClick={this.props.switchToDetails} className="cancel-previous">Previous</button>
              </div>
              <div className="col-buttons next-submit">
                <button type="submit" className="next-submit">Submit</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
