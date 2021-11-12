import React from 'react';
import Navbar from './components/navbar';
import Home from './pages/home';
import BrowseAll from './pages/browse-all';
import ListingDetails from './pages/listing-details';
import YourListings from './pages/your-listings';
import SavedItems from './pages/saved-items';
import { parseRoute } from './lib';
import CreateListing from './pages/create-listing';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      route: parseRoute(window.location.hash)
    };
  }

  componentDidMount() {
    window.addEventListener('hashchange', () => {
      const hashChangeParse = parseRoute(window.location.hash);
      this.setState({
        route: hashChangeParse
      });
    });
  }

  renderPage() {
    const { route } = this.state;
    if (route.path === '') {
      return <Home />;
    }
    if (route.path === 'browse-all') {
      return <BrowseAll />;
    } else if (route.path === 'listings') {
      const listingId = route.params.get('listingId');
      return <ListingDetails listingId={listingId} />;
    } else if (route.path === 'create-listing') {
      return <CreateListing />;
    } else if (route.path === 'your-listings') {
      return <YourListings />;
    } else if (route.path === 'saved-items') {
      return <SavedItems />;
    }
  }

  render() {
    return (
      <>
        <Navbar />
        { this.renderPage() }
      </>
    );
  }
}
