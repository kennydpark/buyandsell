import React from 'react';
import Redirect from '../components/redirect';
import NoListings from '../components/no-listings';
import PageLoadingModal from '../components/page-loading-modal';
import ScrollToTop from '../components/scroll-to-top';
import styled from 'styled-components';

const Card = styled.a`
  background-color: ${props => props.theme.primary};
  color: ${props => props.theme.fontColor};
  transition: all .5s ease;
`;

export default class MyListings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listings: [],
      hasListings: true,
      loading: true
    };
    this.loadingClose = this.loadingClose.bind(this);
  }

  componentDidMount() {
    fetch('/api/user/listings', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-Access-Token': this.props.token
      }
    })
      .then(res => res.json())
      .then(listings => {
        this.setState({ loading: false });
        if (listings.length === 0) {
          this.setState({ hasListings: false });
        } else {
          this.setState({ listings: listings.reverse() });
        }
      });
  }

  loadingClose() {
    this.setState({ loading: false });
  }

  render() {
    const header = 'My Listings';
    if (!this.props.user || !this.props.token) return <Redirect to="" />;
    if (this.state.loading) {
      return <PageLoadingModal
        loading={this.state.loading}
        loadingClose={this.loadingClose} />;
    }
    if (this.state.hasListings === false) {
      return <NoListings />;
    } else {
      return (
        <div className="container my-listings-container">
          <ScrollToTop header={header} theme={this.props.theme} handleTheme={this.props.handleTheme} />
          <div className="row row-browse-all justify-center">
            {
              this.state.listings.map(listing => (
                <div key={listing.listingId}>
                  <Listing listing={listing} />
                </div>
              ))
            }
          </div>
        </div>
      );
    }
  }
}

function Listing(props) {
  const { listingId, title, price, imageUrl, location } = props.listing;
  const href = `#my-listing-details?listingId=${listingId}`;
  return (
    <Card
      href={href}
      className="browse-all-listing">
      <img src={imageUrl} className="browse-all-image" alt={title} />
      <div className="card-body">
        <p className="card-price">${price}</p>
        <p className="card-title">{title}</p>
        <p className="card-location">{location}</p>
      </div>
    </Card>
  );
}
