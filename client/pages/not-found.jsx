import React from 'react';

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
        <div className="col text-center mb-5">
          <h3 className="dark-grey-color">
            Uh oh, we could not find the page you were looking for!
          </h3>
          <div className="row justify-center return-home-row">
            <a href="#" className="return-home-button white">Return Home</a>
          </div>
        </div>
      </div>
    </div>
  );
}
