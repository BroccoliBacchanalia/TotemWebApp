// import React from 'react';
// import { shallow, mount, render } from 'enzyme';
// import { Agenda } from '../../client/src/components/Agenda/Agenda';

// describe('Agenda', () => {
//   const venue = {
//     address: {'111 Main': 'OutsideLands'},
//     dates: {},
//     emergency: {
//       operator: 911
//     }
//   }
//   const venues = {
//   	'venue1': '123423',
//   	'venue2': '124234',
//   	'venue3': '123442'
//   }
//   const user = {
//   	agenda: [
//       {'agenda1': '9787978967869'},
//       {'agenda2' : '786987678867'},
//       {'agenda3' : '897897878y98'}
//   	]
//   }


//   const agenda = shallow(<Agenda venueSchedule={ venues } user={ user } venue={ venue }/>);
//   console.log('!!!!!!!!!!!!!!!!!', agenda.debug())
// 	it('should remove agenda items when clicked', () => {
//     let items = agenda.find('#moots');
//     expect(items.length).toEqual(2);
//     console.log('++++++++++', items.length)
// 	})
// })