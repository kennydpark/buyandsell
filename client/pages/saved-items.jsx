import React from 'react';
import Redirect from '../components/redirect';
import NoSavedItems from '../components/no-saved-items';

export default class SavedItems extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listings: []
    };
  }

  componentDidMount() {
    document.body.style.backgroundColor = '#F8F8F8';
    fetch('/api/user/saved', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-Access-Token': this.props.token
      }
    })
      .then(res => res.json())
      .then(listings => this.setState({ listings }));
  }

  render() {
    if (!this.props.user || !this.props.token) return <Redirect to="" />;
    if (this.state.listings.length === 0) {
      return <NoSavedItems />;
    } else {
      return (
        <div className="container saved-items-container">
          <div className="row row-header justify-center">
            <a onClick={this.scrollToTop} className="page-header-anchor"><h1 className="page-header-text">Saved Items</h1></a>
          </div>
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
}

function Listing(props) {
  const { listingId, title, price, imageUrl, location } = props.listing;
  const href = `#saved-item-details?listingId=${listingId}`;
  return (
    <a
      href={href}
      className="browse-all-listing">
      <img src={imageUrl} className="browse-all-image" />
      <div className="card-body">
        <p className="card-price">${price}</p>
        <p className="card-title">{title}</p>
        <p className="card-location">{location}</p>
      </div>
    </a>
  );
}
