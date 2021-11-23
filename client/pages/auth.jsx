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
        <div className="text-center">
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
