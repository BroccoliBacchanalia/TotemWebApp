import React from 'react';
import { Button, Icon } from 'semantic-ui-react'
import localStyles from './AuthStyles.css';

const SignInButton = ({ onSignInClick }) => (
  <div className={localStyles.outer}>
    <div className={localStyles.inner} id='login-button'>
      <img src="img/newlogo.png"/>
      <div>
        <Button
          className={localStyles.button}
          color='facebook'
          id='signInButton'
          onClick={onSignInClick}>
          <Icon name='facebook' /> Login with facebook
        </Button>
      </div>
    </div>
  </div>
);

export default SignInButton;
