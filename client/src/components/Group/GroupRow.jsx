import React from 'react';
import localStyles from './GroupStyles.css';
// import { getGeofence } from '../../actions/locationActions.jsx'

const GroupRow = ({ friend }) => (
  <div className={localStyles.main}>
    <img src={friend.img} width="50px"/>
    {console.log(friend)}
  </div> //Thin line
);

export default GroupRow;

/*

<div>
  { <Image style={localStyles.profile_img} source={{ uri: friend.img }}/>}
  <div>
    <p>{friend.name}</p>
    <p>
      {'Coordinates' {getGeofence(friend.coordinates)}}
    </p>
  </div>
</div>

*/
