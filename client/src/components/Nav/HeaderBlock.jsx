import React, { Component } from 'react';
import { Header, Button } from 'semantic-ui-react'
import { openMenu } from '../../redux/actions'

const HeaderBlock = () => (
  <Header as='h3' block className='nav-header' textAlign='center'>
     T O T E M
    <Button
      className='menu-button'
      onClick={ openMenu }
      icon='content'
    />
  </Header>
);

export default HeaderBlock;
