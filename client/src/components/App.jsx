import React from 'react';
import { connect } from 'react-redux';
//import store from '../store.js';
//import Map from './Map.jsx';
import NavigationBar from './Nav/Nav.jsx';
//import { createUser, deleteUser } from '../actions/userActions.jsx';

export default class App extends React.Component {
  render() {
    return (
      <div>
        <NavigationBar />
        {this.props.children}
      </div>
    );
  }
}

// export default connect((store) => {
//   return {
//     users: store.users
//   };
// })(App);
