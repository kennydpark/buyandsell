import React from 'react';
import CreateListingFormDetails from './create-listing-form-details';
import CreateListingFormLocation from './create-listing-form-location';
import CreateListingPublished from './create-listing-published';
import Redirect from './redirect';

export default class CreateListingFormParent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      details: {
        title: '',
        price: '',
        condition: 'Condition',
        description: '',
        file: null
      },
      view: 'details',
      location: ''
    };
    this.handleLocationSubmitted = this.handleLocationSubmitted.bind(this);
    this.switchToDetails = this.switchToDetails.bind(this);
    this.handleDetailsSubmitted = this.handleDetailsSubmitted.bind(this);
    this.handleLocationSelect = this.handleLocationSelect.bind(this);
  }

  componentDidMount() {
    document.body.style.backgroundColor = 'white';
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
    formData.append('image', this.state.details.file);
    formData.append('title', this.state.details.title);
    formData.append('price', this.state.details.price);
    formData.append('location', location);
    formData.append('condition', this.state.details.condition);
    formData.append('description', this.state.details.description);
    fetch('/api/listings', {
      method: 'POST',
      headers: {
        'X-Access-Token': this.props.token
      },
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
          },
          view: 'published'
        });
      })
      .catch(err => console.error(err));
  }

  handleLocationSelect(address) {
    this.setState({ location: address });
  }

  render() {
    if (!this.props.user || !this.props.token) return <Redirect to="" />;
    if (this.state.view === 'details') {
      return <CreateListingFormDetails
      switchToLocation={this.switchToLocation}
      handleDetailsSubmitted={this.handleDetailsSubmitted}
      details={this.state.details}
      user={this.props.user} />;
    } else if (this.state.view === 'location') {
      return <CreateListingFormLocation
      switchToDetails={this.switchToDetails}
      handleLocationSubmitted={this.handleLocationSubmitted}
      location={this.state.location}
      nav={this.props.nav}
      handleLocationSelect={this.handleLocationSelect} />;
    } else if (this.state.view === 'published') {
      return <CreateListingPublished />;
    }
  }
}
