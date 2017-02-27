import React from 'react';
import localStyles from './VenueStyles.css';
import { def, updateDay } from '../../redux/actions/venueScheduleActions.js'
import { connect } from 'react-redux';
// console.log("----------:",days);
const RenderDays = ({ venueSchedule}) => (

  <nav className="navbar navbar-inverse">
      <div className={localStyles.navB}
        title="<"
        onClick={def}/*this.setStageToDefault.bind(this)*/
        value="<"> &lt;
      </div>
        {
          //console.log("----------------", venueSchedule)
            venueSchedule.days.map((item, key) =>
            <div className={localStyles.navB}
                key={key}
                title={item}
                onClick = {updateDay.bind(null,item)}/*this.onChangeDay.bind(this, item)*/
                value={item}>{item}
            </div>
          )
        }
  </nav>


);

// export default RenderDays;

export default connect((store) => {
  return {
    venueSchedule: store.venueSchedule
  };
})(RenderDays);
