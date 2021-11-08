import React from 'react';
import CreateListingFormDetails from './create-listing-form-details';
import CreateListingFormLocation from './create-listing-form-location';

export default class CreateListingFormParent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: 'details',
      userId: 1,
      title: '',
      price: '',
      condition: '',
      description: '',
      file: null,
      location: ''
    };
    // this.handleDetailsSubmit = this.handleDetails.bind(this);
    // this.handleLocationSubmit = this.handleLocationSubmit.bind(this);
    this.switchToDetails = this.switchToDetails.bind(this);
    this.switchToLocation = this.switchToLocation.bind(this);
    this.handleDetailsSubmitted = this.handleDetailsSubmitted.bind(this);
  }

  // handleDetailsSubmit() {

  // }

  // handleLocationSubmit() {

  // }

  switchToDetails() {
    this.setState({ view: 'details' });
  }

  switchToLocation() {
    this.setState({ view: 'location' });
  }

  handleDetailsSubmitted(details) {
    this.setState({
      view: 'location',
      userId: 1,
      title: details.title,
      price: details.price,
      condition: details.condition,
      description: details.description,
      file: details.file
    });
  }

  render() {
    if (this.state.view === 'details') {
      return <CreateListingFormDetails switchToLocation={this.switchToLocation} handleDetailsSubmitted={this.handleDetailsSubmitted} />;
    } else {
      return <CreateListingFormLocation switchToDetails={this.switchToDetails} data={this.state} />;
    }
  }
}
