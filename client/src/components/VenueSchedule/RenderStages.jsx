import React from 'react';
// import VenueStyles from './VenueStyles';
// import { View, Button } from 'react-native';
import { def, days, getArtist } from '../../redux/actions/venueScheduleActions'

const RenderStages = () => (
 	<div>
    {stages.map((item, key) => 
    <button
      onClick={alert("chnage stage")}/*this.onChangeStage.bind(this, item)*/>
      <div>{item}</div>
      <div>
        hello
      </div>
    </button>
    )}
  </div>
);

export default RenderStages;
//getArtist(item, this.state.selectedDay)}