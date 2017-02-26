import React from 'react';
import localStyles from './VenueStyles.css';
// import { View, Button } from 'react-native';
import { days, getArtist, updateStage, stages } from '../../redux/actions/venueScheduleActions.js'

const RenderStages = (selectedDay) => (
 	<div>
    {stages.map((item, key) =>
      <div className={localStyles.gRow + " clearfix"}>
      <img src='./img/totem1.png'/>
      <p onClick={updateStage.bind(this, item)}>
        <span className="h3">{item}</span>
        <br/>
         {
           getArtist(item, selectedDay.selectedDay)
         }
      </p>
      </div>
    )}
  </div>
);

export default RenderStages;
