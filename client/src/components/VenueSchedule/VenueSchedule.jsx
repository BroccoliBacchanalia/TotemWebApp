import React, {Component} from 'react';
import { connect } from 'react-redux';
import ScheduleRow from './ScheduleRow.jsx';
import RenderDays from './RenderDays.jsx';
import RenderStages from './RenderStages.jsx';
import { daysAndDates, allStages } from '../../redux/actions/venueScheduleActions.js';

const VenueSchedule = ({ venueSchedule, venues, venueId }) => {
  const venueScheduleItems = venues[venueId].scheduleitems;
  const stages = allStages(venueScheduleItems);

  if(venueSchedule.chooseStage === '') {
    return (
      <div>
        <RenderDays selectedDay={venueSchedule.selectedDay}/>
        <RenderStages
          selectedDay={venueSchedule.selectedDay}
          stages={stages}
        />
      </div>
    );
  }
  return (
    <div>
      <RenderDays selectedDay={venueSchedule.selectedDay}/>
      {Object.keys(venueSchedule.scheduleDummyData).map((ite, key) => {
        var item = venueSchedule.scheduleDummyData[ite];
        console.log("item: ",ite);
        if(item.geofence === venueSchedule.chooseStage && item.day === daysAndDates[venueSchedule.selectedDay]) {
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

export default connect((store) => {
  return {
    venueSchedule: store.venueSchedule,
    venues: store.venues.venues,
    venueId: store.user.venueId
  };
})(VenueSchedule);
