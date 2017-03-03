import store from '../../redux/store';

export function updateVenue(venue) {
  store.dispatch({
    type: 'UPDATE_VENUE_DATA',
    payload: { venue }
  });

  store.dispatch({ type: 'DATA_RETRIEVED_FROM_FIREBASE' });
}

export function updateVenueNames(venues) {
  return store.dispatch({
    type: 'UPDATE_VENUE_NAMES',
    payload: { venues }
  });
}
