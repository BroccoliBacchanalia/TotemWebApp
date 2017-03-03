import store from '../../redux/store';

export function updateVenue(venue) {
  return store.dispatch({
    type: 'UPDATE_VENUE_DATA',
    payload: { venue }
  });
}

export function updateVenueNames(venues) {
  return store.dispatch({
    type: 'UPDATE_VENUE_NAMES',
    payload: { venues }
  });
}
