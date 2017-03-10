import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import styles from '../Styles.css';
import localStyles from './ConfigStyles.css';
/*  Actions  */
import { updateVenueId } from '../../redux/actions/groupActions';
import { firebaseSet } from '../../redux/actions/firebaseActions';

const img = ['img/outsideLands.jpg','img/coachella.jpg', 'img/burningMan.jpg'];
export const ChooseVenue = ({ venues }) => (
  <div>
    <div className={localStyles.header}>
      <h3>Select a Venue</h3>
    </div>
    <div
      style={{ height: window.innerHeight - 140 }}
      className={styles.scrollView + ' ' + localStyles.cRow}
    >
      {Object.keys(venues).map((key, index) => (
        
        <Link key={index} to='/creategroup'>
          <div id = 'venueItem' className = {localStyles.outside}
            onClick={updateVenueId.bind(this, key)}>
              <img className={localStyles.oi} src={img[index]}></img>
              <div className={localStyles.inside}>
                <p className={localStyles.text}>{venues[key]}</p>
              </div>
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
