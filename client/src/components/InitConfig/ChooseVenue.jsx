import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import store from '../../redux/store';
import { updateVenueId } from '../../redux/actions/userActions';
import styles from '../Styles.css';
import localStyles from './ConfigStyles.css';

class ChooseVenue extends React.Component {
  render() {
    const venues = this.props.venues;
    const venueKeys = Object.keys(venues);
    const router = this.context.router;

  	return (
      <div className="custom-container">
        <div className={localStyles.header}>
          <h3>Select a Venue</h3>
        </div>
        <div className={styles.scrollView + ' ' + localStyles.cRow}>
          {venueKeys.map((key, index) => (
            <div
              key={index}
              className={styles.row}
              onClick={() => {
                updateVenueId.call(this, key);
                router.push('/creategroup');
              }}>
              {venues[key].name}
            </div>
          ))}
        </div>
        <div className={localStyles.cFooter}>
          <div>
            <Link to="/creategroup">
              Skip
            </Link>
          </div>
        </div>
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
