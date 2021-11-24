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
import SavedItems from './pages/saved-items';
// import CreateListing from './pages/create-listing';
import CreateListingFormParent from './components/create-listing-form-parent';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
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
    this.setState({ user, isAuthorizing: false });
  }

  handleSignIn(result) {
    const { user, token } = result;
    window.localStorage.setItem('react-context-jwt', token);
    this.setState({ user });
  }

  handleSignOut() {
    window.localStorage.removeItem('react-context-jwt');
    this.setState({ user: null });
  }

  renderPage() {
    const { route } = this.state;
    if (route.path === '') {
      return <FrontPage />;
    }
    if (route.path === 'browse-all') {
      return <BrowseAll />;
    } else if (route.path === 'listings') {
      const listingId = route.params.get('listingId');
      return <ListingDetails listingId={listingId} />;
    } else if (route.path === 'create-listing') {
      // return <CreateListing />;
      return <CreateListingFormParent userId={this.state.user.userId}/>;
    } else if (route.path === 'your-listings') {
      return <YourListings />;
    } else if (route.path === 'saved-items') {
      return <SavedItems />;
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
          <Navbar user={this.state.user}/>
          <PageContainer>
            { this.renderPage() }
          </PageContainer>
        </>
      </AppContext.Provider>
    );
  }
}
