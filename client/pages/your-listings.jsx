import React from 'react';
import Redirect from '../components/redirect';

export default class YourListings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listings: [],
      token: this.props.token
    };
  }

  componentDidMount() {
    this.setState({ token: this.props.token });
    fetch('/api/user/listings', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-Access-Token': this.state.token
      }
    })
      .then(res => res.json())
      .then(listings => this.setState({ listings }));
  }

  render() {

    if (!this.props.user) return <Redirect to="" />;

    return (
      <div className="container">
        <div className="row row-header justify-center">
          <h1 className="page-header-text">Your Listings</h1>
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

function Listing(props) {
  const { listingId, title, price, imageUrl, location } = props.listing;
  const href = `#your-listing-details?listingId=${listingId}`;
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
