import React from 'react';
import styled from 'styled-components';

const Header = styled.a`
  color: ${props => props.theme.fontColor};
  transition: all .5s ease;
`;

const Notice = styled.h3`
  color: ${props => props.theme.fontColor};
  transition: all .5s ease;
`;

const styles = {
  pageContent: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100%',
    paddingTop: '20%',
    maxWidth: '80%',
    margin: 'auto'
  }
};

export default function NotFound(props) {

  return (
    <div style={styles.pageContent}>
      <div className="row">
        <div className="row row-header justify-center">
          <Header href="#browse-all" className="page-header-anchor"><h1 className="page-header-text">buyandsell</h1></Header>
        </div>
        <div className="col text-center mb-5">
          <Notice>
            Uh oh, we could not find the page you were looking for!
          </Notice>
          <div className="row justify-center return-home-row">
            <a href="#" className="return-home-button white">Return Home</a>
          </div>
        </div>
      </div>
    </div>
  );
}
