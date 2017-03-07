import React from 'react';
import { shallow, mount, render } from 'enzyme';
import Loading from '../../client/src/components/Auth/Loading';
import SignInButton from '../../client/src/components/Auth/SignInButton';

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
  });

  describe('Sign in button', () => {
    it('should have the facebook signin image', () => {
      const onSignInClick = jest.fn();
      const wrapper = render(<SignInButton onSignInClick={onSignInClick} />);
      const imgURL = wrapper.find('#login-button')[0].children[0].attribs.src;
      expect(imgURL).toEqual('img/newlogo.png');
    });

    it('should call onSignInClick when the image is clicked', () => {
      const onSignInClick = jest.fn();
      const wrapper = mount(<SignInButton onSignInClick={onSignInClick} />);
      wrapper.find('#signInButton').simulate('click');
      expect(onSignInClick).toHaveBeenCalled();
    });
  });
});
