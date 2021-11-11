import React from 'react';
// import { toDollars } from '../lib';

const styles = {
  image: {
    width: '100%',
    height: '350px',
    objectFit: 'contain'
  },
  longDescription: {
    whiteSpace: 'pre-wrap'
  }
};

export default class ListingDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listing: null
    };
  }

  componentDidMount() {
    fetch(`/api/listings/${this.props.listingId}`)
      .then(res => res.json())
      .then(listing => this.setState({ listing }));
  }

  render() {
    if (!this.state.listing) return null;
    const {
      imageUrl, title, price, condition, description
    } = this.state.listing;
    return (
      <div className="container">
        <div className="card shadow-sm">
          <div className="card-body">
            <div className="row">
              <div className="col">
                {/* this anchor should go back to the catalog at '#' */}
                <a href="#" className="btn text-secondary">
                  &lt; Back to browse-all
                </a>
              </div>
            </div>
            <div className="row mb-4">
              <div className="col-12 col-sm-6 col-md-5">
                <img src={imageUrl} alt={title} style={styles.image} />
              </div>
              <div className="col-12 col-sm-6 col-md-7">
                <h2>{title}</h2>
                <h5 className="text-secondary">${price}</h5>
                <p>{description}</p>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <p style={styles.longDescription}>
                  {condition}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
