import React from 'react';
// import { Image, Text, View, Button } from 'react-native';
// import styles from '../../styles';
// import VenueStyles from './VenueStyles';

const ScheduleRow = ({ name, startTime, endTime, geoFences, day }) => (
  <div>
    <div>
      <div>{name}</div>
      <div>
        <div>{geoFences}</div>
        <div>
          {startTime.slice(0,-6)+" "+startTime.slice(startTime.length-2)+" "+
           " - "+endTime.slice(0,-6)+" "+endTime.slice(endTime.length-2)
          }
        </div>
      </div>
    </div>
    <div/>
  </div>
);

export default ScheduleRow;


