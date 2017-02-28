import React, {Component} from 'react';
import { connect } from 'react-redux';
import ScheduleRow from './ScheduleRow.jsx';
import RenderDays from './RenderDays.jsx';
import RenderStages from './RenderStages.jsx';

const VenueSchedule = ({ venueSchedule, venues, venueId }) => {
  const stages =  venueSchedule.stages;
  console.log("here are the stages", stages);
  if(venueSchedule.chooseStage === '') {
    return (
      <div>
        <RenderDays selectedDay={venueSchedule.selectedDay}/>
        <RenderStages
          selectedDay={venueSchedule.selectedDay}
          stages = {stages}
        />
      </div>
    );
  }
  return (
    <div>
      <RenderDays selectedDay={venueSchedule.selectedDay}/>
      {Object.keys(venueSchedule.scheduleData).map((ite, key) => {
        var item = venueSchedule.scheduleData[ite];
        if(item.geofence === venueSchedule.chooseStage && item.day === venueSchedule.daysAndDates[venueSchedule.selectedDay]) {
          return (
            <ScheduleRow
              key={key}
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

export default connect((store) => {
  return {
    venueSchedule: store.venueSchedule,
    venues: store.venues.venues,
    venueId: store.user.venueId
  };
})(VenueSchedule);
