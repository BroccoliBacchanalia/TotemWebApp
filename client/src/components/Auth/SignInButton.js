import React from 'react';
import localStyles from './AuthStyles.css';

const SignInButton = ({ onSignInClick }) => (
  <div className={localStyles.outer}>
    <div className={localStyles.inner}>
      <img src="img/totem_logo.png" />
      <div className={localStyles.button} onClick={onSignInClick} id="login-button">
        <img src="img/facebook-sign-in.png"/>
      </div>
    </div>
  </div>
);

export default SignInButton;
