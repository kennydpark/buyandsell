import React from 'react';
import Redirect from '../components/redirect';
import AuthForm from '../components/auth-form';
import AppContext from '../lib/app-context';
import styled from 'styled-components';

const AuthContainer = styled.div`
  background-color: ${props => props.theme.primary};
  color: ${props => props.theme.fontColor};
  transition: all .5s ease;
`;

const BackButton = styled.a`
  color: ${props => props.theme.fontColor};
  transition: all .5s ease;
`;
export default class AuthPage extends React.Component {

  render() {
    const { user, route, handleSignIn } = this.context;
    if (user) return <Redirect to="" />;
    const welcomeMessage = route.path === 'sign-in'
      ? 'Welcome back'
      : 'Create an account';

    return (
        <div className="text-center">
          <div className="row row-front-back">
            <BackButton href="#"><i className="fas fa-angle-left front-back-icon"></i></BackButton>
          </div>
          <AuthContainer className="auth-container">
            <div className="row row-front-title justify-center">
              <h1 className="welcome-message text-center">{ welcomeMessage }</h1>
            </div>
            <div>
              <AuthForm
                key={route.path}
                action={route.path}
                onSignIn={handleSignIn} />
            </div>
          </AuthContainer>
        </div>
    );
  }
}

AuthPage.contextType = AppContext;
