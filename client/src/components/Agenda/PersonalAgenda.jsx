import React, {Component} from 'react';
import { connect } from 'react-redux';
import AgendaRow from './AgendaRow.jsx';
import RenderAgendaDays from './RenderAgendaDays.jsx';
import store from '../../redux/store';

class PersonalAgenda extends React.Component {

  render() {

    var displayAgenda={};
    var data = this.props.venueSchedule.scheduleData

    var agenda = this.props.venueSchedule.agenda;
    console.log('agenda', agenda)
    for(var i =0;i<agenda.length;i++) {
      if( agenda[i] in data) {
        displayAgenda[agenda[i]] = data[agenda[i]]
      }
    }
    const venueSchedule = this.props.venueSchedule;
    const stages =  venueSchedule.stages;
    return (
      <div>
        <RenderAgendaDays selectedDay={venueSchedule.selectedDay}/>
        {Object.keys(displayAgenda).map((ite, index) => {
          var item = displayAgenda[ite];
          //console.log("item::::::",item);
            if(item.day === venueSchedule.daysAndDates[venueSchedule.selectedDay]) {
                 return (

                <AgendaRow
                  key={index}
                  itemKey={ite}
                  name={item.name}
                  startTime = {item.starttime}
                  endTime = {item.endtime}
                  geofence={item.geofence}
                  day={item.day}>
                </AgendaRow>
              );
            }

        })}
      </div>
    );
  }
}

export default connect((store) => {
  return {
    venueSchedule: store.venueSchedule,
    venues: store.venue.venues,
    venueId: store.user.venueId
  };
})(PersonalAgenda);
