import React from 'react';
import Redirect from '../components/redirect';
import PageLoadingModal from '../components/page-loading-modal';
import ScrollToTop from '../components/scroll-to-top';

export default class BrowseAll extends React.Component {
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
    document.body.style.backgroundColor = '#F8F8F8';
    if (this.props.user) {
      fetch('/api/listings', {
        method: 'GET'
      })
        .then(res => res.json())
        .then(listings => {
          this.setState({ loading: false });
          if (listings.length === 0) {
            this.setState({ hasListings: false });
          } else {
            this.setState({ listings });
          }
        })
        .catch(err => {
          this.setState({ loadError: true });
          console.error(err);
        });
    }
  }

  loadingClose() {
    this.setState({ loading: false });
  }

  render() {
    const header = 'buyandsell';
    if (!this.props.user || !this.props.token) return <Redirect to="" />;
    if (this.state.loading) {
      return <PageLoadingModal
        loading={this.state.loading}
        loadingClose={this.loadingClose} />;
    }
    return (
        <div className="browse-all-container">
          <ScrollToTop header={header} />
          <div className="row row-browse-all justify-center">
            {
              this.state.listings.reverse().map(listing => (
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

function Listing(props) {
  const { listingId, title, price, imageUrl, location } = props.listing;
  const href = `#listing-details?listingId=${listingId}`;
  return (
    <a
      href={href}
      className="browse-all-listing">
      <img src={imageUrl} className="browse-all-image" alt={title} />
      <div className="card-body">
        <p className="card-price">${price}</p>
        <p className="card-title">{title}</p>
        <p className="card-location">{ location }</p>
      </div>
    </a>
  );
}
