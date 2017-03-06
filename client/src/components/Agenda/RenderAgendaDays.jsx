import React from 'react';
import localStyles from './AgendaStyles.css';
/* Actions */
import { updateStage, updateDay } from '../../redux/actions/venueScheduleActions.js';

const RenderAgendaDays = ({ days }) => (
   <nav>
    <select
      id="days-dropdown"
      className="ui selection fluid dropdown agenda-nav"
      onChange={updateValue.bind(this, 'days-dropdown')}>
      {Object.keys(days).map((day, i) => (
        <option key={i} value={days[day]}>{day}</option>
      ))}
    </select>
  </nav>
);

function updateValue(id, e) {
  const value = document.getElementById(id).value;
  return id === 'days-dropdown' ? updateDay(value) : updateStage(value);
}

export default RenderAgendaDays;



