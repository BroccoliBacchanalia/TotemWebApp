import React from 'react';
import { connect } from 'react-redux';
import store from '../store.jsx';
import Map from './Map.jsx';
import NavigationBar from './Nav/Nav.jsx';
import { createUser, deleteUser } from '../actions/userActions.jsx';

export default class App extends React.Component {
  render() {
    return (
      <div>
        <NavigationBar />
      </div>
    );
  }
}

// export default connect((store) => {
//   return {
//     users: store.users
//   };
// })(App);
