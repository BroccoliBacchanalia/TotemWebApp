import React from 'react';
import localStyles from './VenueStyles.css';
import { def, updateDay } from '../../redux/actions'
import { connect } from 'react-redux';
import store from '../../redux/store';
import Dropdown from 'react-dropdown'

const RenderDays = ({ venueSchedule}) => (

  <nav>
    <Dropdown options={venueSchedule.days} onChange={updateDay.bind(this)} placeholder={venueSchedule.selectedDay.value} />   
  </nav>
);

export default connect((store) => {
  return {
    venueSchedule: store.venueSchedule
  };
})(RenderDays);

 // <div className={localStyles.navB}
 //        title="<"
 //        onClick={def}
 //        value="<"> &lt;
 //      </div>


 // <select value={venueSchedule.selectedDay} onChange={updateDay.bind(null)}>
 //        {venueSchedule.days.map((item, key) =>
 //          <option className={localStyles.navB}
 //              key={key}
 //              title={item}
 //             // onClick = {updateDay.bind(null,item)}
 //              value={item}>{item}
 //          </option>
 //        )}
 //        </select>