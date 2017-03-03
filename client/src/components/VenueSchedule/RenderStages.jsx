import React from 'react';
import { connect } from 'react-redux';
import localStyles from './VenueStyles.css';
import { updateStage } from '../../redux/actions/venueScheduleActions.js';
import store from '../../redux/store';
import Dropdown from 'react-dropdown';

const RenderStages = ({ venueSchedule }) => {
 {venueSchedule.stages.unshift('All Stages')}
  return (
 <nav>
    <Dropdown options={venueSchedule.stages} onChange={updateStage.bind(this)} placeholder={venueSchedule.chooseStage.value} />   
  </nav>
);}

export default connect((store) => {
  return {
    venueSchedule: store.venueSchedule
  };
})(RenderStages);

