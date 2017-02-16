import React from 'react';
import { connect } from 'react-redux';
import store from '../store.jsx';
import Map from './Map.jsx';
import { createUser, deleteUser } from '../actions/userActions.jsx';

class App extends React.Component {
  render() {
    return (
      <div>
        <h1>Hello Bacchanalian</h1>
        <ul>
          {this.props.users.map(user => (
            <li key={user.id}>{user.name}</li>
          ))}
        </ul>
      </div>
    );
  }

  componentDidMount() {
    setTimeout(() => {
      this.props.dispatch(createUser(5, 'bob'))
    }, 3000);
  }
}

export default connect((store) => {
  return {
    users: store.users
  };
})(App);
