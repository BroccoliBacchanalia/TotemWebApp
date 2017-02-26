import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './components/App.jsx';
import store from './redux/store';
import firebase from 'firebase';
import { firebaseConfig } from './firebase'

firebase.initializeApp(firebaseConfig);

const Root = props => (
  <Provider store={store}>
    <App/>
  </Provider>
);

ReactDOM.render(<Root />, document.getElementById('app'));
