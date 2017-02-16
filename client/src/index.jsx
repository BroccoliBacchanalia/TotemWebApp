import React from 'react';
import { render } from 'react-dom';
import { browserHistory, Router, Route } from 'react-router';
import { Provider } from 'react-redux';
import App from './components/App.jsx';
import store from './store.jsx';

render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path='/' component={App}>
      </Route>
    </Router>
  </Provider>, document.getElementById('app'));
