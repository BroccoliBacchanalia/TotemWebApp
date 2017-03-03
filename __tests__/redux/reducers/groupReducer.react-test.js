import groupReducer from '../../../client/src/redux/reducers/groupReducer';
import * as actions from '../../../client/src/redux/actions/groupActions';
import React from 'react';
import renderer from 'react-test-renderer';

describe('Group Reducer', () => {

	test('Should have set defaults', () => {
		expect(groupReducer(undefined, {})).toEqual({
				groupName: '',
				members: {},
				users: {},
				venueId: ''
		})
	})

	test('Should be able to handle UPDATING_GROUP_MEMBER', () => {
		let uid = 123123;
		expect(
			groupReducer(undefined, {
				type: 'UPDATING_GROUP_MEMBER',
				payload: {
			    user: 'John',
			    uid: 123123
			  }
			}).users
			).toEqual({'123123': 'John'})
	})

	test('Should be able to handle USERS_SORT', () => {
		expect(
		groupReducer({users: {'Y3241asss': {label: 'mitch'}, '21341234': {label:'hedberg'}}}, {
			type: 'USERS_SORT',
			payload: {
				method: 'sortAZ'
			}
		}).users
		).toEqual({"21341234": {"key": "21341234", "label": "hedberg"}, "Y3241asss": {"key": "Y3241asss", "label": "mitch"}})
	})

})