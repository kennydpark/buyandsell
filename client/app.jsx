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
import MyListings from './pages/my-listings';
import MyListingDetails from './pages/my-listing-details';
import EditListing from './pages/edit-listing';
import SavedItems from './pages/saved-items';
import CreateListingFormParent from './pages/create-listing';
import { ThemeProvider } from 'styled-components';
import { themes, GlobalStyles } from './lib/themes.js';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      token: null,
      isAuthorizing: true,
      route: parseRoute(window.location.hash),
      theme: this.props.theme
    };
    this.handleSignIn = this.handleSignIn.bind(this);
    this.handleSignOut = this.handleSignOut.bind(this);
    this.handleTheme = this.handleTheme.bind(this);
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

  handleTheme() {
    if (this.state.theme === 'light') {
      this.setState({ theme: 'dark' });
      localStorage.setItem('theme', JSON.stringify('dark'));
    } else {
      this.setState({ theme: 'light' });
      localStorage.setItem('theme', JSON.stringify('light'));
    }
  }

  renderPage() {
    const { route } = this.state;
    if (route.path === '') {
      return <FrontPage
        user={this.state.user}
        onSignIn={this.handleSignIn}
        theme={this.state.theme}
        handleTheme={this.handleTheme} />;
    }
    if (route.path === 'browse-all') {
      return <BrowseAll
        user={this.state.user}
        token={this.state.token}
        theme={this.state.theme}
        handleTheme={this.handleTheme} />;
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
        token={this.state.token}
        nav={this.state.nav}
        theme={this.state.theme}
        handleTheme={this.handleTheme} />;
    } else if (route.path === 'my-listings') {
      return <MyListings
        user={this.state.user}
        token={this.state.token}
        theme={this.state.theme}
        handleTheme={this.handleTheme} />;
    } else if (route.path === 'my-listing-details') {
      const listingId = route.params.get('listingId');
      return <MyListingDetails
        user={this.state.user}
        token={this.state.token}
        listingId={listingId} />;
    } else if (route.path === 'saved-items') {
      return <SavedItems
        user={this.state.user}
        token={this.state.token}
        theme={this.state.theme}
        handleTheme={this.handleTheme} />;
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
        listingId={listingId}
        theme={this.state.theme}
        handleTheme={this.handleTheme} />;
    } else if (route.path === 'sign-in' || route.path === 'sign-up') {
      return <Auth />;
    }
    return <NotFound />;
  }

  render() {
    if (this.state.isAuthorizing) return null;
    const { user, route, theme } = this.state;
    const { handleSignIn, handleSignOut, handleTheme } = this;
    const contextValue = { user, route, handleSignIn, handleSignOut };

    return (
      <ThemeProvider theme={themes[theme]}>
        <AppContext.Provider value={contextValue}>
          <>
            <GlobalStyles />
              { user && <Navbar user={this.state.user} theme={theme} handleTheme={handleTheme} /> }
              <PageContainer>
                { this.renderPage() }
              </PageContainer>
          </>
        </AppContext.Provider>
      </ThemeProvider>
    );
  }
}
