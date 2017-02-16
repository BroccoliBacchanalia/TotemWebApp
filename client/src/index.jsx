import React from 'react';
import { render } from 'react-dom';
import { browserHistory, Router, Route, IndexRedirect } from 'react-router';
import { Provider } from 'react-redux';
import App from './components/App.jsx';
import store from './store.jsx';

var Root = props => (
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path='/' component={App}>
      </Route>
    </Router>
  </Provider>
);

render(<Root />, document.getElementById('app'));