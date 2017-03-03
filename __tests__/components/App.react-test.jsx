import React from 'react';
import { connect } from 'react-redux';
import { shallow, mount, render } from 'enzyme';
import AgendaRow from '../../client/src/components/VenueSchedule/AgendaRow';


const props = { itemKey, name, startTime, endTime, geofence, day, imgurl };

describe('TEST', () => {


  it('should render without exploding', () => {
    expect(shallow(<AgendaRow />).length).toBeTruthy();
  })
})

