import React from 'react';

export default class CreateListingPublished extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: 'published'
    };
  }

  render() {
    return (
      <div className="container">
        <div className="row row-header justify-center">
          <h1 className="page-header-text">Item For Sale</h1>
        </div>
        <div className="form-container-full div-published-body text-center">
          <p className="dark-grey-color">Your listing has been successfully published!</p>
        </div>
      </div>
    );
  }
}
