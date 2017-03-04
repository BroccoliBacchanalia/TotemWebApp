import React, { Component } from 'react';
import { Header, Button } from 'semantic-ui-react'
import { openMenu } from '../../redux/actions'

const HeaderBlock = () => (
  <Header as='h3' block className={localStyles.header} textAlign='center'>
    <img src="img/totemlogo.png" className={localStyles.logo} alt="logo" />
    <Button
      className={localStyles.button}
      onClick={ openMenu }
      icon='content' />
  </Header>
);

export default HeaderBlock;
