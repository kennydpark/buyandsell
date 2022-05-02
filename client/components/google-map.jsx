import React, { Component } from 'react';
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import styled from 'styled-components';

const Input = styled.input`
  color: ${props => props.theme.fontColor};
  background-color: ${props => props.theme.inputBackground};
  transition: all .5s ease;
`;

const DropDown = styled.div`
  color: ${props => props.theme.fontColor};
  background-color: ${props => props.theme.primary};
  transition: all .5s ease;
`;

export class MapContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      address: this.props.location,
      placeId: null,
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
      mapCenter: {
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

  handleSelect(address, placeId) {
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng => {
        this.setState({ address, placeId, mapCenter: latLng });
        this.props.handleAddress(this.state.address);
      })
      .catch(error => console.error('Error', error));
  }

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
              <Input
                {...getInputProps({
                  placeholder: 'Search location',
                  className: 'location-search-input new-listing-form-style justify-center'
                })}
              />
              <DropDown className="autocomplete-dropdown-container text-start">
                {loading && <div>Loading...</div>}
                {suggestions.map(suggestion => {
                  const className = suggestion.active
                    ? 'suggestion-item--active'
                    : 'suggestion-item';
                  const style = suggestion.active
                    ? { backgroundColor: '#8ab6d6', cursor: 'pointer' }
                    : { backgroundColor: '#ffffff00', cursor: 'pointer' };
                  return (
                    <div
                      {...getSuggestionItemProps(suggestion, {
                        className,
                        style
                      })}
                      key={suggestion.placeId}
                    >
                      <span>{suggestion.description}</span>
                    </div>
                  );
                })}
              </DropDown>
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
  apiKey: (process.env.GOOGLE_API_KEY)
})(MapContainer);
