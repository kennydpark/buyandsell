import React from 'react';

class LoadError extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.tryAgain = this.tryAgain.bind(this);
  }

  // componentWillUnmount() {
  //   this.props.loadingClose();
  // }

  tryAgain() {
    this.props.closeAllModals();
  }

  render() {
    let modal;
    let window;
    if (this.props.loadError === false) {
      modal = 'loading-modal-container hidden';
      window = 'navbar-modal-container-full';
    } else {
      modal = 'loading-modal-container loading-overlay';
      window = 'loading-modal-window text-center';
    }
    return (
      <div className={modal}>
        <div className={window}>
          <div className="row">
            <p className="white">Sorry, there was an error processing your request.</p>
          </div>
          <div className="row row-create-new-listing-button justify-center">
            <a onClick={this.tryAgain} className="create-new-listing-button">
              <span><i className="fas fa-redo-alt create-new-icon"></i></span> Try again
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default LoadError;
