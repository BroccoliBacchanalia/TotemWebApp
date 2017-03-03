import React from 'react';
import localStyles from './AgendaStyles.css';
import { updateDay } from '../../redux/actions/venueScheduleActions.js'
import { connect } from 'react-redux';
import store from '../../redux/store';

const RenderAgendaDays = ({ venueSchedule}) => (
  <nav className="navbar navbar-inverse">
        {venueSchedule.days.map((item, key) =>
          <div className={localStyles.navB}
              key={key}
              title={item}
              onClick = {updateDay.bind(null,item)}
              value={item}>{item}
          </div>
        )}
  </nav>
);

export default connect((store) => {
  return {
    venueSchedule: store.venueSchedule
  };
})(RenderAgendaDays);
