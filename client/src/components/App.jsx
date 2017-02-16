import React from 'react';
import { connect } from 'react-redux';
import store from '../store';
import Map from './Map.jsx';


class App extends React.Component {  
  render() {
    return (
      <div>
        <h1>Hello Bacchanalian</h1>
      </div>
    );
  }
}

export default connect((store => {
  return {
    someprop: store.someprop
  }
}))(App)
