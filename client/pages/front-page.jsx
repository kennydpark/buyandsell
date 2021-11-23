import React from 'react';

export default class FrontPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="container">
        <div className="row row-front-title justify-center">
          <h1 className="front-page-title text-center lobster-font">buyandsell</h1>
        </div>
        <div className="row row-get-started justify-center">
          <a href="#sign-up" className="front-button">Get Started</a>
        </div>
        <div className="row justify-center">
          <p className="dark-grey-color">Already have an account?</p><span className="front-login-span"><a href="#sign-in" className="front-login-anchor">Login</a></span>
        </div>
      </div>
    );
  }
}
