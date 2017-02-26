import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import store from '../../redux/store.js';
import { selectVenue, skipVenue } from '../../redux/actions/venueActions.js';
import { updateVenueId } from '../../redux/actions/userActions';

class ChooseVenue extends React.Component {
  render() {
    const venues = this.props.venues;
    const venueKeys = Object.keys(venues);
    const router = this.context.router;

  	return (
      <div>
        <div>Choose Your Venue</div>
        <ul>
          {venueKeys.map((key, index) => (
            <li key={index}>
              <div onClick={() => {
                updateVenueId.call(this, key);
                router.push('/creategroup');
              }}>
              {venues[key].name}
              </div>
            </li>
          ))}
        </ul>
        <Link to="/creategroup">
          Skip
        </Link>
      </div>
  	);
  }
}

ChooseVenue.contextTypes = {
  router: React.PropTypes.object.isRequired
}

export default connect((store) => {
	return {
		venues: store.venues.venues
	}
})(ChooseVenue)
