import React, { Component } from 'react';
import { Header, Button } from 'semantic-ui-react'
import { openMenu } from '../../redux/actions'
import localStyles from './UtilStyles.css'


export default class HeaderBlock extends Component {
  render() {
    return (
      <Header as='h3' block className={localStyles.header} textAlign='center'> T O T E M
{/*       <img src="img/totem_logo.png" alt="logo" />*/}
        <Button 
          className='menu-button'
          onClick={ openMenu }
          icon='content' />
      </Header>
    )
  }
}

