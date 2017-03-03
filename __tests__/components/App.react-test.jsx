import React from 'react';
import { Provider } from 'react-redux';
import { shallow } from 'enzyme';
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
});
