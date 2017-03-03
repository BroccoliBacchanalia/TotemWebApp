import React from 'react';
import { connect } from 'react-redux';
import { shallow, mount, render } from 'enzyme';
import AgendaRow from '../../client/src/components/VenueSchedule/AgendaRow';

describe('TEST', () => {


  it('should render without exploding', () => {
    expect(shallow(<AgendaRow />).length).toBeTruthy();
  })
})

