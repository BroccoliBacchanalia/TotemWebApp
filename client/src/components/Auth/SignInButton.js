import React from 'react';

export default class SignInButton extends React.Component {
  render() {
    const { onSignInClick } = this.props;
    return <button onClick={ onSignInClick }>Signin Here</button>;
  }
}
