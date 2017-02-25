import React from 'react';
import VenueStyles from './VenueStyles.css';
// import { View, Button } from 'react-native';
import { def, days, getArtist, updateStage, stages } from '../../redux/actions/venueScheduleActions.js'

const RenderStages = (selectedDay) => (
 	<div>
    {stages.map((item, key) =>

    <button 
      className={VenueStyles.gRow}
      onClick={updateStage.bind(this, item)}>
      <div>{item}</div>
      <div>
        {getArtist(item, selectedDay.selectedDay)}
      </div>
    </button>
    )}
  </div>
);

export default RenderStages;
