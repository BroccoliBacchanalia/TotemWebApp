import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './components/App.jsx';
import store from './redux/store';
import firebase from 'firebase';
import { firebaseConfig } from './firebase'
import injectTapEventPlugin from 'react-tap-event-plugin';

firebase.initializeApp(firebaseConfig);
injectTapEventPlugin();

const Root = props => (
  <Provider store={store}>
    <App/>
  </Provider>
);

ReactDOM.render(<Root />, document.getElementById('app'));
