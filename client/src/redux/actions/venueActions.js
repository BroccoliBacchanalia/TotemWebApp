import store from '../../redux/store';

export function updateVenue(venue) {
  return store.dispatch({
    type: 'UPDATE_VENUE_DATA',
    payload: { venue }
  });
}
