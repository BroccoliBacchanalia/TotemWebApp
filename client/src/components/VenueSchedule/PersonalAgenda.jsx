import React, {Component} from 'react';
import { connect } from 'react-redux';
import RenderDays from './RenderDays.jsx';

class VenueSchedule extends Component {
  render() {
    return (
      <div>
        <RenderDays selectedDay={this.props.selectedDay}/>
        {Object.keys(this.props.scheduleData).map((ite, key) => {
          var item = this.props.scheduleData[ite];
          console.log("item: ",ite);
          if(item.geofence === this.props.chooseStage && item.day === daysAndDates[this.props.selectedDay]) {
            return (
              <ScheduleRow
                itemKey={ite}
                name={item.name}
                startTime = {item.starttime}
                endTime = {item.endtime}
                geofence={item.geofence}
                day={item.day}>
              </ScheduleRow>
            );
          }
        })}
      </div>
    );
  }
}

export default connect((store) => {
  return {
    selectedDay: store.venueSchedule.selectedDay,
    chooseStage: store.venueSchedule.chooseStage,
    scheduleData: store.venueSchedule.scheduleData

  };
})(VenueSchedule);
