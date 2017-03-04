import React from 'react';
import { Button } from 'semantic-ui-react'
export default class SignInButton extends React.Component {

  render() {
    const { onSignInClick } = this.props;
    return <Button onClick={ onSignInClick }>Signin Here</Button>;
  }
}
