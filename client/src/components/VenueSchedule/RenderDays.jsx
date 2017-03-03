import React from 'react';
// import localStyles from './VenueStyles.css';
import { updateDay } from '../../redux/actions'
import Dropdown from 'react-dropdown'

const RenderDays = ({ days }) => (
  <nav>
    <Dropdown
      options={Object.keys(days)}
      onChange={updateDay.bind(this)}
      placeholder={venueSchedule.selectedDay.value}
    />
  </nav>
);

// const RenderDays = ({ days }) => (
//   <div className="navbar navbar-inverse">
//     <div className={localStyles.navB}
//       title="<"
//       onClick={def}
//       value="<"> &lt;
//     </div>
//     {Object.keys(days).map((day, index) =>
//       <div className={localStyles.navB}
//         key={index}
//         title={day}
//         onClick = {updateDay.bind(null, day)}
//         value={day}>{day}
//       </div>
//     )}
//   </div>
// );

export default RenderDays;
