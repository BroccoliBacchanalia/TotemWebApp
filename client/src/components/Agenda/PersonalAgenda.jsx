import React, {Component} from 'react';
import store from '../../redux/store';
import { connect } from 'react-redux';
import localStyles from './AgendaStyles.css';
/* Components */
import AgendaRow from './AgendaRow.jsx';
import RenderAgendaDays from './RenderAgendaDays.jsx';
/* Actions */
import { getStagesAndDays, generateDay } from '../../redux/actions/venueScheduleActions';
import { Grid } from 'semantic-ui-react'

class PersonalAgenda extends React.Component {

  render() {
    const data = this.props.venue.scheduleitems;
    const agenda = this.props.user.agenda;
    const venueSchedule = this.props.venueSchedule;
    const { days } = getStagesAndDays(data);
    const selectedDay = venueSchedule.selectedDay || days[Object.keys(days)[0]];

    return (
      <div>
        <RenderAgendaDays days={days}/>
        <br/>
        <Grid className={localStyles.container}>
          {agenda.map((key) => {
            console.log("key: ", key)
            let  item = data[key];
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
                  imgurl={item.imgurl}>
                </AgendaRow>
              );
            }
          })}
        </Grid>

      </div>
    );
  }
}

export default connect((store) => {
  return {
    venueSchedule: store.venueSchedule,
    venue: store.venue.venue,
    venueId: store.user.venueId,
    user: store.user
  };
})(PersonalAgenda);

// import React, {Component} from 'react';
// import store from '../../redux/store';
// import { connect } from 'react-redux';
// /* Components */
// import AgendaRow from './AgendaRow.jsx';
// import RenderAgendaDays from './RenderAgendaDays.jsx';
// /* Actions */
// import { getStagesAndDays } from '../../redux/actions/venueScheduleActions';

// class PersonalAgenda extends React.Component {

//   render() {

//     const displayAgenda={};
//     const data = this.props.venue.scheduleitems;
//     const agenda = this.props.user.agenda;
//     const venueSchedule = this.props.venueSchedule;
//     const { days } = getStagesAndDays(data);

//     for(var i =0;i<agenda.length;i++) {
//       if( agenda[i] in data) {
//         displayAgenda[agenda[i]] = data[agenda[i]]
//       }
//     }

//     return (
//       <div>
//         <RenderAgendaDays days={days}/>
//         {Object.keys(displayAgenda).map((itemKey, index) => {
//           var item = displayAgenda[itemKey];
//           console.log("________________",item);
//           if(item.day === venueSchedule.selectedDay) {
//              return (
//               <AgendaRow
//                 key={index}
//                 itemKey={itemKey}
//                 name={item.name}
//                 startTime = {item.starttime}
//                 endTime = {item.endtime}
//                 geofence={item.geofence}
//                 day={item.day}
//                 imgurl={item.imgurl}>
//               </AgendaRow>
//             );
//           }
//         })}
//       </div>
//     );
//   }
// }

// export default connect((store) => {
//   return {
//     venueSchedule: store.venueSchedule,
//     venue: store.venue.venue,
//     venueId: store.user.venueId,
//     user: store.user
//   };
// })(PersonalAgenda);
