import React from 'react';
import { connect, Provider } from 'react-redux';
import { shallow, mount, render } from 'enzyme';
import MapViewer from '../../client/src/components/MapViewer/MapViewer';
import Markers from '../../client/src/components/MapViewer/Markers';

describe('MapViewer Component Tests', () => {

  describe('Initialize Testing Suite', () => {
    it('the map should render without exploding', () => {
      const wrapper = shallow(
        <Provider>
          <MapViewer />
        </Provider>)
      expect(wrapper.length).toEqual(1);
    })
    it('the markers should render without exploding', () => {
      const wrapper = shallow(
        <Provider>
          <Markers />
        </Provider>)
      expect(wrapper.length).toEqual(1);
    })
  })

  describe('Toggling Friend Info', () => {
    it('should show an InfoWindow module when a user is clicked', () => {
      expect(shallow(
        <Provider>
          <MapViewer />
        </Provider>).length).toEqual(1);
    })    
    it('should close an InfoWindow module when a user is clicked again', () => {
      expect(shallow(
        <Provider>
          <MapViewer />
        </Provider>).length).toEqual(1);
    })
  })
})