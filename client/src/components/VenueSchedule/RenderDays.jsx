import React from 'react';
// import { View, Button } from 'react-native';
import { def, days, updateDay } from '../../redux/actions/venueScheduleActions.js'
console.log("----------:",days);
const RenderDays = () => (
 	<div>
      <button
        title="<"
        onClick={def}/*this.setStageToDefault.bind(this)*/
        value="<"> back
      </button>
        {days.map((item, key) =>
          <button 
              key={key}
              title={item} 
              onClick = {updateDay.bind(null,item)}/*this.onChangeDay.bind(this, item)*/
              value={item}>{item}
          </button>
        )}
    </div>
);

export default RenderDays;
