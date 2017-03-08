import React from 'react';
import { shallow, mount, render } from 'enzyme';
import { Agenda } from '../../client/src/components/Agenda/Agenda';

describe('Agenda', () => {
  const venue = {
    scheduleitems: [
      {
        name: 'Dillion Francis',
        day: '2017-04-14T07:00:00.000Z'
      },
      {
        name: 'Francis and the lights',
        day: '2017-04-14T07:00:00.000Z'
      }
    ]
  }
  const venues = {
    selectedDay: '',
    selectedStage: ''
  }
  const user = {
  	agenda: ['0', '1'],
    friendList: {}
  }

  const agenda = shallow(<Agenda venueSchedule={ venues } user={ user } venue={ venue }/>);

	it('should show all of the items in the agenda', () => {
    let items = agenda.find('#agenda');
    expect(items.length).toEqual(2);
	})
})