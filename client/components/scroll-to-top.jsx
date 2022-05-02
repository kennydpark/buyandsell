import React from 'react';
import styled from 'styled-components';

const Header = styled.div`
  color: ${props => props.theme.fontColor};
  transition: all .5s ease;
`;

export default class ScrollToTop extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.scrollToTop = this.scrollToTop.bind(this);
  }

  scrollToTop() {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }

  render() {
    return (
      <Header className="row row-header justify-center">
        <a onClick={this.scrollToTop} className="page-header-anchor">
          <h1 className="page-header-text">{this.props.header}</h1>
        </a>
      </Header>
    );
  }
}
