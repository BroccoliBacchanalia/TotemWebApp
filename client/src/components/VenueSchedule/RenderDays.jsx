import React from 'react';
// import { View, Button } from 'react-native';
import { def, days } from '../../redux/actions/venueScheduleActions.js'

const RenderDays = () => (
 	<div>
      <button
        title="<"
        onClick={alert('render days to default')}/*this.setStageToDefault.bind(this)*/
        value="<"> back
      </button>
        {days.map((item, key) =>
          <button 
              key={key}
              title={item} 
              onClick = {alert("works")}/*this.onChangeDay.bind(this, item)*/
              value={item}>{item}
          </button>
        )}
    </div>
);

export default RenderDays;
