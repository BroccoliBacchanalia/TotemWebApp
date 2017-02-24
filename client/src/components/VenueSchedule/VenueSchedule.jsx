import React, {Component} from 'react';
import scheduleDummyData from './scheduleDummyData.json'
import ScheduleRow from './ScheduleRow.jsx';
import { Route, MemoryRouter as Router } from 'react-router';
import RenderDays from './RenderDays.jsx';
import RenderStages from './RenderStages.jsx';
import { connect } from 'react-redux';
import store from '../../redux/store.jsx'
import { daysAndDates } from '../../redux/actions/venueScheduleActions.js'


class VenueSchedule extends Component {
  render() {
      if(this.props.chooseStage === "") { 
        return (
          <div>
            <RenderDays selectedDay={this.props.selectedDay}/>
            <RenderStages />
          </div>
        );
    } else {
        return (
        <div>
          <RenderDays />
            <ul>
              {
                this.props.scheduleDummyData.map((item, key) => {
                  console.log("item: ",item);
                  console.log("day ",this.props.selectedDay)
                  if(item.geofence === this.props.chooseStage && item.day === daysAndDates[this.props.selectedDay]) {
                    return (
                      <li>
                      <ScheduleRow 
                        key={key}
                        name={item.name} 
                        startTime = {item.starttime}
                        endTime = {item.endtime}
                        geofence={item.geofence}
                        day={item.day}>
                      </ScheduleRow>
                      </li>
                    );
                   
                  } 
                })
              }
            </ul>
        </div>
      )
    } 
    
  } 
};

export default connect((store) => {
  return {
    selectedDay: store.venueSchedule.selectedDay,
    chooseStage: store.venueSchedule.chooseStage,
    scheduleDummyData: store.venueSchedule.scheduleDummyData

  };
})(VenueSchedule);
