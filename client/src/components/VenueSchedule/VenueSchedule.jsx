import React, {Component} from 'react';
import { connect } from 'react-redux';
import ScheduleRow from './ScheduleRow.jsx';
import RenderDays from './RenderDays.jsx';
import RenderStages from './RenderStages.jsx';
import store from '../../redux/store';
import { getStagesAndDays } from '../../redux/actions/venueScheduleActions';

const VenueSchedule = ({ venue, venueSchedule }) => {
  const { stages, days } = getStagesAndDays(venue.scheduleitems);
  console.log(stages, days);

  if (venueSchedule.chooseStage.value === 'All Stages') {
    return (
      <div>
        <RenderDays days={days} />
        <RenderStages stages={stages} />
        {Object.keys(venueSchedule.scheduleData).map((ite, key) => {
          var item = venueSchedule.scheduleData[ite];
          if(item.day === venueSchedule.daysAndDates[venueSchedule.selectedDay.value]) {
            return (
              <ScheduleRow
                key={key}
                itemKey={ite}
                name={item.name}
                startTime = {item.starttime}
                endTime = {item.endtime}
                geofence={item.geofence}
                day={item.day}
                imgurl={item.imgurl}>
              </ScheduleRow>
            );
          }
        })}
      </div>
    );
  }

  return (
    <div>
      <RenderDays days={days} />
      <RenderStages stages={stages} />
      {Object.keys(venueSchedule.scheduleData).map((ite, key) => {
        var item = venueSchedule.scheduleData[ite];
        if(item.geofence === venueSchedule.chooseStage.value &&
          item.day === venueSchedule.daysAndDates[venueSchedule.selectedDay.value]) {

          return (
            <ScheduleRow
              key={key}
              itemKey={ite}
              name={item.name}
              startTime = {item.starttime}
              endTime = {item.endtime}
              geofence={item.geofence}
              day={item.day}
              imgurl={item.imgurl}>
            </ScheduleRow>
          );
        }
      })}
    </div>
  );
}

export default connect((store) => {
  return {
    venue: store.venue.venue,
    venueSchedule: store.venueSchedule
  };
})(VenueSchedule);
