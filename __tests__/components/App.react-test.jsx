import React from 'react';
import { Provider } from 'react-redux';
import { shallow, mount, render } from 'enzyme';
import injectTapEventPlugin from 'react-tap-event-plugin';
import firebase from 'firebase';
import { firebaseConfig } from '../../client/src/firebase'
import store from '../../client/src/redux/store';
import App from '../../client/src/components/App';

describe('App', () => {
  it('the App component should render without exploding', () => {
    const wrapper = shallow(
      <Provider store={store}>
        <App />
      </Provider>);
    expect(wrapper.length).toEqual(1);
  });

  it('should render the login page if the user is not authorized', () => {
    const wrapper = render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    expect(wrapper.length).toEqual(1);
  });
});
