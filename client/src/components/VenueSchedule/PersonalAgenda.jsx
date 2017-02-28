import React, {Component} from 'react';
import { connect } from 'react-redux';
import AgendaRow from './AgendaRow.jsx';
import RenderAgendaDays from './RenderAgendaDays.jsx';
import RenderStages from './RenderStages.jsx';
const displayAgenda={};
class PersonalAgenda extends React.Component {

  componentWillMount(){
    var data = this.props.venueSchedule.scheduleData
    var agenda = this.props.venueSchedule.agenda;
    for(var i =0;i<agenda.length;i++) {
      if( agenda[i] in data) {
        displayAgenda[agenda[i]] = data[agenda[i]]
      }
    }
    console.log("inside compoenet wil mpount: ", displayAgenda);
  }
  render() {

    const venueSchedule = this.props.venueSchedule;
    const stages =  venueSchedule.stages;
    return (
      <div>
        <RenderAgendaDays selectedDay={venueSchedule.selectedDay}/>
        {Object.keys(displayAgenda).map((ite, key) => {
          var item = displayAgenda[ite];
            if(item.day === venueSchedule.daysAndDates[venueSchedule.selectedDay]) {
                 return (
                <AgendaRow
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
    venues: store.venues.venues,
    venueId: store.user.venueId
  };
})(PersonalAgenda);
