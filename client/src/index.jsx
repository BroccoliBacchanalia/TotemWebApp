import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './components/App.jsx';
import { Provider } from 'react-redux';
import store from './redux/store';
import App from './components/App.jsx';

ReactDOM.render(
	<Provider store={store}>
		<App/>
	</Provider>
, document.getElementById('app'));
