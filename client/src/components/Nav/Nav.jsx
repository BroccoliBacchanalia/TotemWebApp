import React, { Component } from 'react';
import { Header, Button } from 'semantic-ui-react'
import { connect } from 'react-redux';

class HeaderBlock extends Component {
  render() {
    const { nav, dispatch } = this.props;
    return (
      <Header as='h3' block className='nav-header' textAlign='center'> T O T E M
{/*       <img src="img/totem_logo.png" alt="logo" />*/}
        <Button 
          className='menu-button'
          onClick={() => dispatch({type: 'TOGGLE_MENU'})}
          icon='content' />
      </Header>
    )
  }
}

export default connect((store) => {
  return {
    app: store.app
  };
})(HeaderBlock);
