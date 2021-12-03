import React from 'react';
import AppContext from './lib/app-context';
import parseRoute from './lib/parse-route';
import decodeToken from './lib/decode-token';
import Auth from './pages/auth';
import FrontPage from './pages/front-page';
import NotFound from './pages/not-found';
import Navbar from './components/navbar';
import PageContainer from './components/page-container';
import BrowseAll from './pages/browse-all';
import ListingDetails from './pages/listing-details';
import YourListings from './pages/your-listings';
import YourListingDetails from './pages/your-listing-details';
import EditListing from './pages/edit-listing';
import SavedItems from './pages/saved-items';
import CreateListingFormParent from './components/create-listing-form-parent';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      token: null,
      isAuthorizing: true,
      route: parseRoute(window.location.hash)
    };
    this.handleSignIn = this.handleSignIn.bind(this);
    this.handleSignOut = this.handleSignOut.bind(this);
  }

  componentDidMount() {
    window.addEventListener('hashchange', () => {
      const hashChangeParse = parseRoute(window.location.hash);
      this.setState({
        route: hashChangeParse
      });
    });
    const token = window.localStorage.getItem('react-context-jwt');
    const user = token ? decodeToken(token) : null;
    this.setState({ user, token, isAuthorizing: false });
  }

  handleSignIn(result) {
    const { user, token } = result;
    window.localStorage.setItem('react-context-jwt', token);
    this.setState({ user, token });
  }

  handleSignOut() {
    window.localStorage.removeItem('react-context-jwt');
    this.setState({
      user: null,
      token: null
    });
  }

  renderPage() {
    const { route } = this.state;
    if (route.path === '') {
      return <FrontPage user={this.state.user} />;
    }
    if (route.path === 'browse-all') {
      return <BrowseAll
        user={this.state.user}
        token={this.state.token} />;
    } else if (route.path === 'listing-details') {
      const listingId = route.params.get('listingId');
      return <ListingDetails
        user={this.state.user}
        token={this.state.token}
        listingId = {listingId}
        route={this.state.route} />;
    } else if (route.path === 'create-listing') {
      return <CreateListingFormParent
        user={this.state.user}
        token={this.state.token} />;
    } else if (route.path === 'your-listings') {
      return <YourListings
        user={this.state.user}
        token={this.state.token} />;
    } else if (route.path === 'your-listing-details') {
      const listingId = route.params.get('listingId');
      return <YourListingDetails
        user={this.state.user}
        token={this.state.token}
        listingId={listingId} />;
    } else if (route.path === 'saved-items') {
      return <SavedItems
        user={this.state.user}
        token={this.state.token} />;
    } else if (route.path === 'saved-item-details') {
      const listingId = route.params.get('listingId');
      return <ListingDetails
        user={this.state.user}
        token={this.state.token}
        listingId={listingId}
        route={this.state.route} />;
    } else if (route.path === 'edit-listing') {
      const listingId = route.params.get('listingId');
      return <EditListing
        user={this.state.user}
        token={this.state.token}
        listingId={listingId} />;
    } else if (route.path === 'sign-in' || route.path === 'sign-up') {
      return <Auth />;
    }
    return <NotFound />;
  }

  render() {
    if (this.state.isAuthorizing) return null;
    const { user, route } = this.state;
    const { handleSignIn, handleSignOut } = this;
    const contextValue = { user, route, handleSignIn, handleSignOut };
    return (
      <AppContext.Provider value={contextValue}>
        <>
          <Navbar user={this.state.user} />
          <PageContainer>
            { this.renderPage() }
          </PageContainer>
        </>
      </AppContext.Provider>
    );
  }
}
