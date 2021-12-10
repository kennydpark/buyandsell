import React from 'react';

class LoadingModal extends React.Component {
  componentWillUnmount() {
    this.props.loadingClose();
  }

  render() {
    let modal;
    let window;
    if (this.props.loading === false) {
      modal = 'loading-modal-container hidden';
      window = 'navbar-modal-container-full';
    } else {
      modal = 'loading-modal-container loading-overlay';
      window = 'loading-modal-window text-center';
    }
    return (
      <div className={modal}>
        <div className={window}>
          <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
        </div>
      </div>
    );
  }
}

export default LoadingModal;
