import React from 'react';
import ScrollToTop from '../components/scroll-to-top';
import styled from 'styled-components';

const Notice = styled.p`
  color: ${props => props.theme.fontColor};
  transition: all .5s ease;
`;

export default class NoSavedItems extends React.Component {
  render() {
    const header = 'Saved Items';
    return (
      <div className="container saved-items-container">
        <ScrollToTop header={header} />
        <div className="form-container-full div-published-body text-center">
          <Notice>You have no saved items.</Notice>
        </div>
        <div className="row row-create-new-listing-button justify-center">
          <a href="#browse-all" className="create-new-listing-button">
            <span><i className="fas fa-store create-new-icon"></i></span> Browse listings
          </a>
        </div>
      </div>
    );
  }
}
