import React from 'react';
import localStyles from './AgendaStyles.css';
/* Actions */
import { updateStage, updateDay } from '../../redux/actions/venueScheduleActions.js';

const AgendaNav = ({ days, selectedDay }) => (
   <nav>
    <select
      id="days-dropdown"
      value={selectedDay}
      className="ui selection fluid dropdown"
      onChange={updateValue.bind(this, 'days-dropdown')}>
      {Object.keys(days).map((day, i) => (
        <option key={i} value={days[day]}>{day}</option>
      ))}
    </select>
  </nav>
);

function updateValue(id, e) {
  return updateDay(document.getElementById(id).value);
}

export default AgendaNav;
