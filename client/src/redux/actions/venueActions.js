import store from '../store.js';
import firebase from 'firebase';

export function selectGroup(group) {
	store.dispatch({type: 'choose_group', payload: { group }})
}

export function selectVenue(venue){
	store.dispatch({type: 'choose_venue', payload: { venue }})
}

export function skipVenue(){
	store.dispatch({type: 'skip_venue'})
}

export function skipCreateGroup(){
	store.dispatch({type: 'skip_create_group'})
}

export function skipGroup(){
	store.dispatch({type: 'skip_group'})
}