import React from 'react';

export default class CreateListingPublished extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: 'published'
    };
    this.redirect = this.redirect.bind(this);
  }

  componentDidMount() {
    // this.redirect();
  }

  redirect() {
    this.intervalID = setTimeout(() => {
      window.location.href = '#browse-all';
    }, 2200);
  }

  render() {
    return (
      <div className="container published-container">
        <div className="row row-header justify-center">
          <a className="page-header-anchor"><h1 className="page-header-text">Item For Sale</h1></a>
        </div>
        <div className="form-container-full div-published-body text-center">
          <p className="published-text dark-grey-color bold">Your listing has been successfully published!</p>
          <p className="published-redirect-text dark-grey-color italic">Redirecting...</p>
        </div>
      </div>
    );
  }
}
