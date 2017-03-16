import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import styles from '../Styles.css';
import localStyles from './ConfigStyles.css';
/*  Actions  */
import { updateVenueId } from '../../redux/actions/groupActions';
import { firebaseSet } from '../../redux/actions/firebaseActions';

const img = ['img/outsideLands.jpg', 'img/burningMan.jpg'];
export const ChooseVenue = ({ venues }) => (
  <div>
    <div className={localStyles.header}>
      <h3>Select a Venue</h3>
    </div>
    <div
      style={{ height: window.innerHeight - 140 }}
      className={styles.scrollView + ' ' + localStyles.cRow}
    >   <Link to = 'createGroup'>
          <div id = 'venueItem' key = '3' className = {localStyles.outside}
            onClick = {updateVenueId.bind(this, '-KdqnkqC4Sz0L4yh9-Jb')}>
              <img className = {localStyles.oi} src = 'img/coachella.jpg'></img>
              <div className = {localStyles.inside}>
                <p className = {localStyles.text}>{venues['-KdqnkqC4Sz0L4yh9-Jb']}</p>
              </div>
          </div>
        </Link>
      {delete venues['-KdqnkqC4Sz0L4yh9-Jb']}
      

      {Object.keys(venues).map((key, index) => (
          <div id = 'venueItem' key = {index} className = {localStyles.outside}
            onClick = {updateVenueId.bind(this, key)}>
              <img className ={localStyles.oi} src = {img[index]}></img>
              <div className = {localStyles.inside}>
                <p className = {localStyles.text}>{venues[key]}</p>
              </div>
          </div>
        
      ))}
    </div>
    <div className={localStyles.cFooter}>
      <div>
        <Link to="/creategroup" className={localStyles.skipFont}>
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
// -KdqnkqC4Sz0L4yh9-Jb
