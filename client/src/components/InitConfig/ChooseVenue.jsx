import React from 'react';
import { connect } from 'react-redux';
import store from '../../redux/store.js';
import { selectVenue, skipVenue } from '../../redux/actions/venueActions.js';
import { updateVenueId } from '../../redux/actions/userActions';

class ChooseVenue extends React.Component {
  render() {
    const venues = this.props.venues;
    const venueKeys = Object.keys(venues);

  	return (
      <div>
      <div>Choose Your Venue</div>
      <ul>
        {venueKeys.map((key, index) => {
          const venue = venues[key];
          return (
            <li key={index}>
              <div onClick={updateVenueId.bind(this, key)}>
              {venue.name}
              </div>
            </li>
          )
        })}
      </ul>
      <div onClick={skipVenue}>Skip this step</div>
      </div>
  	)
  }
}

export default connect((store) => {
	return {
		venues: store.venues.venues
	}
})(ChooseVenue)
