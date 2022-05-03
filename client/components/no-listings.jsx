import React from 'react';
import ScrollToTop from '../components/scroll-to-top';
import styled from 'styled-components';

const Notice = styled.p`
  color: ${props => props.theme.fontColor};
  transition: all .5s ease;
`;

export default class NoListings extends React.Component {
  render() {
    const header = 'My Listings';
    return (
      <div className="container no-listings-container">
        <ScrollToTop header={header} />
        <div className="form-container-full div-published-body text-center">
          <Notice>When you start selling, your listings will appear here.</Notice>
        </div>
        <div className="row row-create-new-listing-button justify-center">
          <a href="#create-listing" className="create-new-listing-button">
            <span><i className="fas fa-plus create-new-icon"></i></span> Create new listing
          </a>
        </div>
      </div>
    );
  }
}
