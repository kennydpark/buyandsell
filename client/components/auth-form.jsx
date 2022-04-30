import React from 'react';
// import styled from 'styled-components';

export default class AuthForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      error: null
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
  }

  handleEmailChange(event) {
    this.setState({
      email: event.target.value
    });
  }

  handlePasswordChange(event) {
    this.setState({
      password: event.target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const userInfo = {};
    userInfo.email = this.state.email;
    userInfo.password = this.state.password;
    const { action } = this.props;
    const req = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userInfo)
    };
    fetch(`/api/auth/${action}`, req)
      .then(res => res.json())
      .then(result => {
        if (result.error === 'The email you entered is already in use.') {
          this.setState({
            error: 'The email you entered is already in use.'
          });
        } else if (action === 'sign-up') {
          window.location.hash = 'sign-in';
        } else if (result.user && result.token) {
          this.props.onSignIn(result);
        } else {
          this.setState({
            error: 'The email or password you entered is incorrect.'
          });
        }
      })
      .catch(err => {
        console.error(err);
      });
  }

  render() {
    const { action } = this.props;
    const alternateActionHref = action === 'sign-up'
      ? '#sign-in'
      : '#sign-up';
    const alternateActionText = action === 'sign-up'
      ? 'Sign in'
      : 'Sign up';
    const submitButtonText = action === 'sign-up'
      ? 'Sign up'
      : 'Sign in';
    const alternateActionQuestion = action === 'sign-up'
      ? 'Already have an account?'
      : 'Don\'t have an account?';

    // const Form = styled.form`
    //   color: ${props => props.theme.fontColor};
    //   transition: all .5s ease;
    // `;

    return (
      <form onSubmit={ this.handleSubmit }>
      {/* <Form onSubmit={ this.handleSubmit }> */}
        <div className="front-input-row text-center">
          <input
            required
            id="email"
            type="email"
            name="email"
            placeholder="Email"
            onChange={ this.handleEmailChange }
            className="sign-in-form-style" />
        </div>
        <div className="front-input-row text-center">
          <input
            required
            id="password"
            type="password"
            name="password"
            placeholder="Password"
            onChange={ this.handlePasswordChange }
            className="sign-in-form-style" />
        </div>
        <div className="row row-invalid-sign justify-center">
          <p className="text-invalid-sign-in-error">{ this.state.error }</p>
        </div>
        <div className="front-margin-top text-center">
          <button type="submit" className="front-button">
            { submitButtonText }
          </button>
        </div>
        <div className="row row-alternate-action justify-center">
          <p>{ alternateActionQuestion }</p>
          <span className="front-login-span">
            <a href={ alternateActionHref }
               className="front-login-anchor">{ alternateActionText }
            </a>
          </span>
        </div>
      {/* </Form> */}
      </form>
    );
  }
}
