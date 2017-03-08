import React, {Component} from 'react';
import store from '../../redux/store';
import { connect } from 'react-redux';
import localStyles from './AgendaStyles.css';
/* Components */
import AgendaRow from './AgendaRow.jsx';
import AgendaNav from './AgendaNav.jsx';
/* Actions */
import { getStagesAndDays, generateDay } from '../../redux/actions/venueScheduleActions';
import { Grid } from 'semantic-ui-react'

export const Agenda = ({ venueSchedule, venue, user }) => {
  const { days } = getStagesAndDays(venue.scheduleitems);
  let agenda;
  user.agenda ? agenda = user.agenda : agenda = []
  const selectedDay = venueSchedule.selectedDay || days[Object.keys(days)[0]];
  return (
    <div>
      <AgendaNav days={days} selectedDay={selectedDay} />
      <br/>
      <Grid className={localStyles.container}>
        {agenda.map((key) => {
          const item = venue.scheduleitems[key];
          if (item && (item.day === selectedDay)) {
            return (
              <AgendaRow
                key={key}
                itemKey={key}
                name={item.name}
                startTime = {item.starttime}
                endTime = {item.endtime}
                geofence={item.geofence}
                day={item.day}
                id='agenda'
                imgurl={item.imgurl}>
              </AgendaRow>
            );
          }
        })}
      </Grid>
      <br/><br/><br/><br/>
    </div>
  );
}

export default connect((store) => {
  return {
    venueSchedule: store.venueSchedule,
    venue: store.venue.venue,
    user: store.user
  };
})(Agenda);
