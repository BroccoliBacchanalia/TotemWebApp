import groupReducer from '../../../client/src/redux/reducers/groupReducer';
import * as actions from '../../../client/src/redux/actions/groupActions';
import React from 'react';
import { sortMethods } from '../../../client/src/redux/actions/sortActions';
import { updateGroup } from '../../../client/src/redux/actions/groupActions';
import * as locationActions from '../../../client/src/redux/actions/locationActions';
import * as firebaseActions from '../../../client/src/redux/actions/firebaseActions';

describe('Group Reducer', () => {

	it('Should have set defaults', () => {
		expect(groupReducer(undefined, {})).toEqual({
      "groupName": "",
      "memberKeys": {},
      "members": {},
      "placeTotem": false,
      "showTotemInfo": false,
      "totem": {
      	"coords": {},
        "meetupTime": null,
        "name": "Basecamp"
      },
      "venueId": ""
		});
	});

	it('Should be able to handle UPDATING_GROUP_MEMBER', () => {
		let uid = 123123;
		expect(
			groupReducer(undefined, {
				type: 'UPDATING_GROUP_MEMBER',
				payload: {
			    user: 'John',
			    uid: 123123
			  }
			}).members
			).toEqual({'123123': 'John'})
	});

	it('Should add user listener to each user in group', () => {
		const group = {
			memberKeys : {
        '1232321' : 'Derek',
        '2342344' : 'Patrick',
        '1213131' : 'Smriti'
			}
		}
		firebaseActions.firebaseOnce = jest.fn();
    locationActions.addUserListener = jest.fn();
    updateGroup(group);
    expect(locationActions.addUserListener).toHaveBeenCalledTimes(3);
	})

	it('Should be able to handle USERS_SORT sortAZ', () => {
		expect(
		groupReducer({users: {'Y3241asss': {'label': 'mitch'}, '21341234': {'label':'hedberg'}}}, {
			type: 'USERS_SORT',
			payload: {
				method: sortMethods.sortAZ
			}
		}).users
		).toEqual({"21341234": {"label": "hedberg"}, "Y3241asss": {"label": "mitch"}});
	})

	it('Should be able to handle USERS_SORT sortGeofence', () => {
		expect(
		groupReducer({users: {'Y3241asss': {'geofence': {'name': 'Sahara Tent'}}, '21341234': {'geofence': {'name': 'Coachella Stage'}}}}, {
			type: 'USERS_SORT',
			payload: {
				method: sortMethods.sortGeofence
			}
		}).users
		).toEqual({"21341234": {"geofence": {"name": "Coachella Stage"}}, "Y3241asss": {"geofence": {"name": "Sahara Tent"}}});
	})
})
