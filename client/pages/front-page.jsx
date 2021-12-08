import React from 'react';
import Redirect from '../components/redirect';

export default class FrontPage extends React.Component {
  componentDidMount() {
    document.body.style.backgroundColor = 'white';
  }

  render() {
    if (this.props.user) return <Redirect to="browse-all" />;

    return (
      <div className="container">
        <div className="row row-front-title justify-center">
          <h1 className="front-page-title text-center lobster-font">buyandsell</h1>
        </div>
        <div className="row row-get-started justify-center">
          <a href="#sign-up" className="front-button">Get Started</a>
        </div>
        <div className="row justify-center">
          <p className="dark-grey-color">Already have an account?</p>
          <span className="front-login-span">
            <a href="#sign-in" className="front-login-anchor">Sign in</a>
          </span>
        </div>
      </div>
    );
  }
}
