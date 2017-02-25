import React from 'react';
// import { View, Button } from 'react-native';
import localStyles from './VenueStyles.css';
import { def, days, updateDay } from '../../redux/actions/venueScheduleActions.js'
console.log("----------:",days);
const RenderDays = () => (

  <nav className="navbar navbar-inverse">
      <div className={localStyles.navB}
        title="<"
        onClick={def}/*this.setStageToDefault.bind(this)*/
        value="<"> &lt;
      </div>
        {days.map((item, key) =>
          <div className={localStyles.navB}
              key={key}
              title={item} 
              onClick = {updateDay.bind(null,item)}/*this.onChangeDay.bind(this, item)*/
              value={item}>{item}
          </div>
        )}
  </nav>


);

export default RenderDays;

