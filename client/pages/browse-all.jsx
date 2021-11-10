import React from 'react';

export default class BrowseAll extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listings: []
    };
  }

  componentDidMount() {
    fetch('/api/listings', {
      method: 'GET'
    })
      .then(res => res.json())
      .then(listings => this.setState({ listings }));
  }

  render() {
    return (
      <div className="browse-all-container">
        <div className="row justify-center">
          <h1 className="page-header-text">buyandsell</h1>
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
  // eslint-disable-next-line no-unused-vars
  const { listingId, title, price, imageUrl, condition, description, location } = props.listing;
  const href = `#listings?listingId=${listingId}`;
  return (
    <a
      href={href}
      className="browse-all-listing">
      <img src={imageUrl} className="browse-all-image" />
      <div className="card-body">
        <p className="card-price">${price}</p>
        <p className="card-title">{title}</p>
        <p className="card-location">{ location }</p>
      </div>
    </a>
  );
}
