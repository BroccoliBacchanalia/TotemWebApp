import React from 'react';
import localStyles from './VenueStyles.css';
import { def, updateDay } from '../../redux/actions/venueScheduleActions.js'
import { connect } from 'react-redux';
import store from '../../redux/store';

const RenderDays = ({ venueSchedule}) => (

  <nav className="navbar navbar-inverse">
      <div className={localStyles.navB}
        title="<"
        onClick={def}
        value="<"> &lt;
      </div>
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
})(RenderDays);
