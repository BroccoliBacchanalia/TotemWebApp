import React from 'react';
import { updateStage, updateDay } from '../../redux/actions/venueScheduleActions.js';

const ScheduleNav = ({ days, stages }) => (
  <nav>
    <select
      id="days-dropdown"
      className="ui selection fluid dropdown"
      onChange={updateValue.bind(this, 'days-dropdown')}>
      {Object.keys(days).map((day, i) => (
        <option key={i} value={days[day]}>{day}</option>
      ))}
    </select>
    <select
      id="stages-dropdown"
      className="ui selection fluid dropdown spacing-dropdown"
      onChange={updateValue.bind(this, 'stages-dropdown')}>
      <option value="All Stages">All Stages</option>
      {stages.map((stage, i) => (
        <option key={i} value={stage}>
          {stage}
        </option>
      ))}
    </select>
  </nav>
);

function updateValue(id, e) {
  const value = document.getElementById(id).value;
  return id === 'days-dropdown' ? updateDay(value) : updateStage(value);
}

export default ScheduleNav;
