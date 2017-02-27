import React from 'react';
import { connect } from 'react-redux';
import localStyles from './VenueStyles.css';
import { updateStage } from '../../redux/actions/venueScheduleActions.js';


const RenderStages = ({ selectedDay, stages }) => {
  return (
 	<div>
    {stages.map((item, index) =>
      <div
        key={index}
        className={localStyles.gRow + " clearfix"}>
        <img src='./img/totem1.png'/>
        <p onClick={updateStage.bind(this, item)}>
          <span className="h3">{item}</span>
          <br/>
         
        </p>
      </div>
    )}
  </div>
);}

export default RenderStages;
