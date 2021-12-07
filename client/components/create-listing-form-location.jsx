import React from 'react';
import MapContainer from '../components/google-map';

export default class CreateListingFormLocation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      location: this.props.location,
      error: ''
    };
    this.handleLocationChange = this.handleLocationChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handlePreviousClick = this.handlePreviousClick.bind(this);
    // this.handleChange = this.handleChange.bind(this);
    // this.handleSelect = this.handleSelect.bind(this);
    this.handleAddress = this.handleAddress.bind(this);
  }

  handleLocationChange(event) {
    this.setState({ location: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.state.location === '') {
      this.setState({
        error: 'The location is required.'
      });
    } else {
      this.props.handleLocationSubmitted(this.state.location);
      this.setState({
        error: ''
      });
    }
  }

  handlePreviousClick() {
    this.props.switchToDetails(this.state.location);
  }

  // handleChange(address) {
  //   this.setState({ address });
  // }

  // handleSelect(event) {
  //   geocodeByAddress(address)
  //     .then(results => getLatLng(results[0]))
  //     .then(latLng => console.log('Success', latLng))
  //     .catch(error => console.error('Error', error));
  // }

  handleAddress(address) {
    this.setState({ location: address });
    this.props.handleLocationSelect(address);
  }

  render() {
    // const googleMapPlaceholder = 'images/irvine-map.png';
    return (
      <>
        <div className="container">
          <div className="row row-header justify-center">
            <h1 className="page-header-text">Item For Sale</h1>
          </div>
          <div className="form-container-full">
            <form onSubmit={this.handleSubmit}>
              <div className="row justify-center">
                <div className="column-full">
                  <div className="container">
                    <MapContainer location={this.state.location} handleAddress={this.handleAddress}/>
                  </div>
                </div>
              </div>
              <div className="row row-location-submit">
                <div className="col-buttons cancel-previous">
                  <button onClick={this.handlePreviousClick} className="create-listing-cancel-button">Previous</button>
                </div>
                <div className="col-buttons next-submit">
                  <button type="submit" className="next-submit">Publish</button>
                </div>
              </div>
              <div className="row justify-center">
                <p className="text-no-location-error">{this.state.error}</p>
              </div>
            </form>
          </div>
        </div>
      </>
    );
  }
}
