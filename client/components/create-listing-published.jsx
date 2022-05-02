import React from 'react';
import styled from 'styled-components';

const Published = styled.div`
  color: ${props => props.theme.fontColor};
  transition: all .5s ease;
`;

export default class CreateListingPublished extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: 'published'
    };
  }

  render() {
    return (
      <Published className="container published-container">
        <div className="row row-header justify-center">
          <a className="page-header-anchor"><h1 className="page-header-text">Item For Sale</h1></a>
        </div>
        <div className="form-container-full div-published-body text-center">
          <p className="published-text bold">Your listing has been successfully published!</p>
        </div>
        <div className="row row-create-new-listing-button justify-center">
          <a href="#browse-all" className="create-new-listing-button">
            <span><i className="fas fa-store create-new-icon"></i></span> Browse listings
          </a>
        </div>
      </Published>
    );
  }
}
