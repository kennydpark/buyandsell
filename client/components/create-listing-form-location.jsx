import React from 'react';

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
  }

  handleLocationChange(event) {
    this.setState({ location: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.state.location === 'Location') {
      this.setState({
        error: 'You must specify a location.'
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

  render() {
    const googleMapPlaceholder = 'images/irvine-map.png';
    return (
      <div className="container">
        <div className="row row-header justify-center">
          <h1 className="page-header-text">Item For Sale</h1>
        </div>
        <div className="form-container-full text-center">
          <form onSubmit={this.handleSubmit}>
            <div className="row">
              <div className="column-full">
                <div className="row row-form">
                  <select value={this.state.location} onChange={this.handleLocationChange} className="new-listing-form-style" required label="location" placeholder="Location">
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
                <button onClick={this.handlePreviousClick} className="cancel-previous">Previous</button>
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
    );
  }
}
