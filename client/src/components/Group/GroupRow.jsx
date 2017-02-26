import React from 'react';
import localStyles from './GroupStyles.css';
import { getGeofence } from '../../redux/actions/locationActions';

const GroupRow = ({ friend }) => (
  <div className={localStyles.gRow + " clearfix"}>
    <img src={friend.img}/>
    <div>
      <p>
        <span className="h3">{friend.label}</span>
        <br/>
        {friend.position ? getGeofence(friend.position) : ''}
      </p>
    </div>
  </div>
);

export default GroupRow;
