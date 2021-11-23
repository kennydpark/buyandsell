import React from 'react';
import Redirect from '../components/redirect';
import AuthForm from '../components/auth-form';
import AppContext from '../lib/app-context';

export default class AuthPage extends React.Component {
  render() {

    const { user, route, handleSignIn } = this.context;

    if (user) return <Redirect to="" />;

    const welcomeMessage = route.path === 'sign-in'
      ? 'Welcome back'
      : 'Create an account';

    return (
    // <div className="container">
    //   <div className="front-body">
    //     <div className="row row-front-title justify-center">
    //       <h1 className="front-page-title text-center lobster-font">buyandsell</h1>
    //     </div>
    //     <div className="row row-get-started justify-center">
    //       <a href="#sign-up" className="front-button">Get Started</a>
    //     </div>
    //     <div className="row justify-center">
    //       <p className="dark-grey-color">{ welcomeMessage }</p><span className="front-login-span"><a href="#sign-in" className="front-login-anchor">Login</a></span>
    //     </div>
    //     <div>
    //       <AuthForm
    //         key={route.path}
    //         action={route.path}
    //         onSignIn={handleSignIn} />
    //     </div>
    //   </div>
    // </div>
        <div className="front-body text-center">
          <div className="row row-front-title justify-center margin-auto">
            <h1 className="welcome-message text-center">{ welcomeMessage }</h1>
          </div>
          <div>
            <AuthForm
              key={route.path}
              action={route.path}
              onSignIn={handleSignIn} />
          </div>
        </div>
    );
  }
}

AuthPage.contextType = AppContext;
