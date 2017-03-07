import React from 'react';
import { Button, Icon } from 'semantic-ui-react'
import localStyles from './AuthStyles.css';

const SignInButton = ({ onSignInClick }) => (
  <div className={localStyles.outer}>
    <div className={localStyles.inner}>
      <div>
        <img src="img/newlogo.png" />
      </div>
      <div>
        <Button
          className={localStyles.button}
          color='facebook'
          onClick={onSignInClick}>
          <Icon name='facebook' /> Login with facebook
        </Button>
      </div>
    </div>
  </div>
);

export default SignInButton;




      // <div className={localStyles.button} onClick={onSignInClick} id="login-button">
      //   <img src="img/facebook-sign-in.png"/>
      // </div>
