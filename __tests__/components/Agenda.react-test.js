import React from 'react';
import { shallow, mount, render } from 'enzyme';
import { Agenda } from '../../client/src/components/Agenda/Agenda';

describe('Agenda', () => {
  const venue = {
    address: {
      city: 'Indio',
      line1: 'Empire Polo Club'
    },
    dates: {},
    scheduleitems: [
      {
        name: 'Dillion Francis',
        day: '2017-04-14T07:00:00.000Z'
      },
      {
        name: 'Francis and the lights',
        day: '2017-04-14T07:00:00.000Z'
      }
    ],
    emergency: {
      operator: 911
    }
  }
  const venues = {
  	isToggle: false,
    selectedDay: '2017-04-14T07:00:00.000Z',
    selectedStage: 'All Stages'
  }
  const user = {
  	agenda: ['0', '1'],
    dataRetrived: false,
    friendList: {},
    groupId: '123424',
    groupName: 'oui',
    name: 'derek',
    uid: '1244121234'
  }


  const agenda = shallow(<Agenda venueSchedule={ venues } user={ user } venue={ venue }/>);
 
	it('should show all of the items in the agenda', () => {
    let items = agenda.find('#agenda');
    expect(items.length).toEqual(2);
	})
})