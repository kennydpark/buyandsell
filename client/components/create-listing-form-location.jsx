import React from 'react';
import MapContainer from '../components/google-map';
import LoadingModal from '../components/loading-modal';
import LoadError from '../components/load-error';

export default class CreateListingFormLocation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      location: this.props.location,
      error: '',
      loading: false
    };
    this.handleLocationChange = this.handleLocationChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handlePreviousClick = this.handlePreviousClick.bind(this);
    this.handleAddress = this.handleAddress.bind(this);
    this.loadingClose = this.loadingClose.bind(this);
    this.closeAllModals = this.closeAllModals.bind(this);
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
        error: '',
        loading: true
      });
    }
  }

  handlePreviousClick() {
    this.props.switchToDetails(this.state.location);
  }

  handleAddress(address) {
    this.setState({ location: address });
    this.props.handleLocationSelect(address);
  }

  loadingClose() {
    this.setState({ loading: false });
  }

  closeAllModals() {
    this.setState({ loading: false });
    this.props.loadErrorClose();
  }

  render() {
    return (
      <>
        <LoadingModal loading={this.state.loading}
          loadingClose={this.loadingClose} />
        <LoadError
          loadError={this.props.loadError}
          closeAllModals={this.closeAllModals} />;
        <div className="container">
          <div className="row row-header justify-center">
            <a onClick={this.scrollToTop} className="page-header-anchor"><h1 className="page-header-text">Item For Sale</h1></a>
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
              <div className="row row-no-location-error justify-center">
                <p className="text-no-location-error">{this.state.error}</p>
              </div>
            </form>
          </div>
        </div>
      </>
    );
  }
}
