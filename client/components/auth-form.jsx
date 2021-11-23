import React from 'react';

export default class AuthForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { action } = this.props;
    const req = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state)
    };
    fetch(`/api/auth/${action}`, req)
      .then(res => res.json())
      .then(result => {
        if (action === 'sign-up') {
          window.location.hash = 'sign-in';
        } else if (result.user && result.token) {
          this.props.onSignIn(result);
        }
      });
  }

  render() {
    const { action } = this.props;
    const { handleChange, handleSubmit } = this;
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
    return (
      <form onSubmit={handleSubmit}>
        <div className="front-input-row text-center">
          <input
            required
            id="email"
            type="text"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            className="sign-in-form-style" />
        </div>
        <div className="front-input-row text-center">
          <input
            required
            id="password"
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            className="sign-in-form-style" />
        </div>
        <div className="front-margin-top text-center">
          <button type="submit" className="front-button">
            {submitButtonText}
          </button>
        </div>
        <div className="row justify-center">
          <p className="dark-grey-color">{ alternateActionQuestion }</p>
          <span className="front-login-span">
            <a href={alternateActionHref} className="front-login-anchor">{alternateActionText}</a>
          </span>
        </div>
      </form>
    );
  }
}
