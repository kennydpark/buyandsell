import React, { Component } from 'react';
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from 'react-places-autocomplete';

export class MapContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      address: this.props.location,
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
      mapCenter: {
        // irvine coordinates
        lat: 33.6846,
        lng: -117.8265
      }
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
  }

  handleChange(address) {
    this.setState({ address });
  }

  handleSelect(address) {
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng => {
        // console.log('Success', latLng);
        this.setState({ address });
        this.setState({ mapCenter: latLng });
        this.props.handleAddress(this.state.address);
      })
      .catch(error => console.error('Error', error));
  }

  // handleZIndex() {
  //   this.intervalID = setTimeout(() => {
  //     this.setState({ zIndex: '0' });
  //   }, 1000);
  // }

  // handleZIndexx() {
  //   this.setState({ zIndex: '-1' });
  // }

  render() {
    const containerStyle = {
      position: 'relative'
    };

    return (
      <div id="google-map" className="container justify-center">
        <PlacesAutocomplete
          value={this.state.address}
          onChange={this.handleChange}
          onSelect={this.handleSelect}
          className="justify-center"
        >
          {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
            <div>
              <input
                {...getInputProps({
                  placeholder: 'Search location',
                  className: 'location-search-input new-listing-form-style justify-center'
                })}
              />
              <div className="autocomplete-dropdown-container text-start dark-grey-color">
                {loading && <div>Loading...</div>}
                {suggestions.map((suggestion, index) => {
                  const className = suggestion.active
                    ? 'suggestion-item--active'
                    : 'suggestion-item';
                  // inline style for demonstration purpose
                  const style = suggestion.active
                    ? { backgroundColor: '#8ab6d662', cursor: 'pointer' }
                    : { backgroundColor: '#ffffff', cursor: 'pointer' };
                  return (
                    <div
                      key={index}
                      {...getSuggestionItemProps(suggestion, {
                        className,
                        style
                      })}
                    >
                      <span>{suggestion.description}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </PlacesAutocomplete>
        <Map
          containerStyle={containerStyle}
          className="map"
          google={this.props.google}
          initialCenter={{
            lat: this.state.mapCenter.lat,
            lng: this.state.mapCenter.lng
          }}
          center={{
            lat: this.state.mapCenter.lat,
            lng: this.state.mapCenter.lng
          }}
        >
          <Marker
            position={{
              lat: this.state.mapCenter.lat,
              lng: this.state.mapCenter.lng
            }}
          />
        </Map>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: ('AIzaSyCjYP25K9AebK2XPrNYJ19qO19ELe1jU4c')
})(MapContainer);
