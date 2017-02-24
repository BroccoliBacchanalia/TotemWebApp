import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import App from './components/App.jsx';
import firebase from 'firebase';
import { firebaseConfig } from './firebase'

firebase.initializeApp(firebaseConfig);

ReactDOM.render(
	<Provider store={store}>
		<App/>
	</Provider>
, document.getElementById('app'));
