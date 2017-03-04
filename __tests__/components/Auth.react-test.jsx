import React from 'react';
import { shallow, mount, render } from 'enzyme';
import Loading from '../../client/src/components/Auth/Loading';

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
});
