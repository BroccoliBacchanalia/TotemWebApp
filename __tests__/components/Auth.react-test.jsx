import React from 'react';
import { Provider } from 'react-redux';
import { shallow, mount, render } from 'enzyme';
import store from '../../client/src/redux/store';
import Loading from '../../client/src/components/Auth/Loading';
import ConnectHomeView, { HomeView } from '../../client/src/components/HomeView';
import SignInButton from '../../client/src/components/Auth/SignInButton';
import * as actions from '../../client/src/redux/actions';

describe('Auth', () => {
  describe('Loading...', () => {
    it('the Loading component should render without exploding', () => {
      const wrapper = shallow(<Loading />);
      expect(wrapper.length).toEqual(1);
    });

    it('should render the loading gif', () => {
      const wrapper = shallow(<Loading />);
      expect(wrapper.find('img').props().src).toEqual('img/loading.gif');
    });

    it('should render the signin page when auth.isUserSignedIn is false', () => {
      const wrapper = shallow(
        <HomeView />
      );
      // expect(wrapper.unrendered.props.store.getState().auth.isUserSignedIn).toEqual(false);

      console.log(wrapper.find('input'));
      // console.log(wrapper.renderer.getRenderOutput().find(SignInButton));
      console.log(wrapper.props());
      console.log(wrapper.find(SignInButton));
      expect(wrapper.find(SignInButton).length).toEqual(1);
    });

  //   it('should render the loading while user.dataRetrieved is false', () => {
  //     const wrapper = shallow(
  //       <Provider store={store}>
  //         <HomeView />
  //       </Provider>
  //     );
  //
  //     console.log(wrapper.unrendered.props.store.getState().auth.isUserSignedIn);
  //     actions.signInSuccess('123', 'Bob');
  //     console.log(wrapper.unrendered.props.store.getState().auth.isUserSignedIn);
  //     // expect(wrapper.unrendered.props.store.getState().user.groupId).to.be.false;
  //     // expect(wrapper.find(SignInButton));
  //     // signInSuccess(user.uid, user.displayName);
  //   });
  });



});
