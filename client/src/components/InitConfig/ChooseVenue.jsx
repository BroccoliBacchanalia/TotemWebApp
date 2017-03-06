import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import styles from '../Styles.css';
import localStyles from './ConfigStyles.css';
/*  Actions  */
import { updateVenueId } from '../../redux/actions/groupActions';
import { firebaseSet } from '../../redux/actions/firebaseActions';

const ChooseVenue = ({ venues }) => (
  <div className="custom-container">
    <div className={localStyles.header}>
      <h3>Select a Venue</h3>
    </div>
    <div className={styles.scrollView + ' ' + localStyles.cRow}>
      {Object.keys(venues).map((key, index) => (
        <Link key={index} to='/creategroup'>
          <div
            className={styles.row}
            onClick={updateVenueId.bind(this, key)}>
            {venues[key]}
          </div>
        </Link>
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

export default connect((store) => {
	return {
		venues: store.venue.venues
	}
})(ChooseVenue)
