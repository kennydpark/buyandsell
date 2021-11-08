import React from 'react';
import CreateListingFormDetails from './create-listing-form-details';
import CreateListingFormLocation from './create-listing-form-location';

export default class CreateListingFormParent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      details: {
        userId: 1,
        title: '',
        price: '',
        condition: 'Condition',
        description: '',
        file: null
      },
      view: 'details',
      location: 'Location'
    };
    this.handleLocationSubmitted = this.handleLocationSubmitted.bind(this);
    this.switchToDetails = this.switchToDetails.bind(this);
    this.handleDetailsSubmitted = this.handleDetailsSubmitted.bind(this);
  }

  switchToDetails(location) {
    this.setState({
      view: 'details',
      location: location
    });
  }

  handleDetailsSubmitted(details) {
    this.setState({
      view: 'location',
      details: details
    });
  }

  handleLocationSubmitted(location) {
    event.preventDefault();
    const formData = new FormData();
    formData.append('userId', String(this.state.details.userId));
    formData.append('image', this.state.details.file);
    formData.append('title', this.state.details.title);
    formData.append('price', this.state.details.price);
    formData.append('location', location);
    formData.append('condition', this.state.details.condition);
    formData.append('description', this.state.details.description);
    fetch('/api/listings', {
      method: 'POST',
      body: formData
    })
      .then(response => response.json())
      .then(data => {
        this.setState({
          details: {
            title: '',
            price: '',
            condition: '',
            description: '',
            file: null
          }
        });
      })
      .catch(err => console.error(err));
  }

  render() {
    if (this.state.view === 'details') {
      return <CreateListingFormDetails
      switchToLocation={this.switchToLocation}
      handleDetailsSubmitted={this.handleDetailsSubmitted}
      details={this.state.details} />;
    } else {
      return <CreateListingFormLocation
      switchToDetails={this.switchToDetails}
      handleLocationSubmitted={this.handleLocationSubmitted}
      location={this.state.location} />;
    }
  }
}
