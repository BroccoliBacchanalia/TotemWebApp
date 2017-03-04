import React, {Component} from 'react';
import { connect } from 'react-redux';
import ScheduleRow from './ScheduleRow.jsx';
import ScheduleNav from './ScheduleNav.jsx';
import store from '../../redux/store';
import { getStagesAndDays } from '../../redux/actions/venueScheduleActions';
import { Grid } from 'semantic-ui-react'


const VenueSchedule = ({ venue, venueSchedule }) => {
  const { stages, days } = getStagesAndDays(venue.scheduleitems);
  const selectedDay = venueSchedule.selectedDay || days[Object.keys(days)[0]];
  const isAllStages = venueSchedule.selectedStage === 'All Stages';

  return (
    <div>
      <ScheduleNav days={days} stages={stages} />
      <Grid>
        {Object.keys(venue.scheduleitems).map((key, index) => {
          const item = venue.scheduleitems[key];
          const isSelectedStage = (item.geofence === venueSchedule.selectedStage);

          if(item.day === selectedDay && (isSelectedStage || isAllStages)) {
            return (
              <ScheduleRow
                key={index}
                itemKey={key}
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
      </Grid>
    </div>
  );
}

export default connect((store) => {
  return {
    venue: store.venue.venue,
    venueSchedule: store.venueSchedule
  };
})(VenueSchedule);
