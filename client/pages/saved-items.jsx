import React from 'react';
// import { toDollars } from '../lib';

export default class SavedItems extends React.Component {
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
      <div className="container">
        <div className="row row-header justify-center">
          <h1 className="page-header-text">Saved Items</h1>
        </div>
        {/* <hr /> */}
        <div className="row">
          {/* {
            this.state.listings.map(listing => (
              <div key={listing.listingId} className="">
                <Listing product={listing} />
              </div>
            ))
          } */}
        </div>
      </div>
    );
  }
}
