import scheduleDummyData from '../../components/VenueSchedule/scheduleDummyData';
import store from '../store.jsx';

export function updateDay(day) {
  // return {
  //   type: 'update_day',
  //   payload: { day }
  // }
  console.log('DISPATCH', day)
  store.dispatch({type:'update_day', payload: {day}})
}

export function updateStage(stage) {
  store.dispatch({type: 'update_stage', payload: { stage }})
}

export function updateFestival(festival) {
  return {
    type: 'update_festival',
    payload: { festival }
  }
}

export function def() {
  // return {
  //   type: 'def'
  // }
  store.dispatch({type: 'def'})
  console.log('DEF works');
}



export function allStages (scheduleDummyData) {

    let obj={};
    scheduleDummyData.forEach(function(item){
      if(!(item.geofence in obj)) {
        obj[item.geofence] = item.geofence;
      }
    });
    return Object.keys(obj);
}

export function allDays(scheduleDummyData) {   
    
    let datesDay={};
    scheduleDummyData.forEach(function(item){
      if(!(item.day in datesDay)) {
        datesDay[generateDay(item.day)] = item.day;
      }
    });
    return datesDay;
}

export function generateDay(dateString) {
  let weekday = new Array(7);
  weekday[0] =  "Sunday";
  weekday[1] = "Monday";
  weekday[2] = "Tuesday";
  weekday[3] = "Wednesday";
  weekday[4] = "Thursday";
  weekday[5] = "Friday";
  weekday[6] = "Saturday";
  var d = new Date(dateString)
  return weekday[d.getDay()];
}

export const daysAndDates = allDays(scheduleDummyData);
console.log("daysAndDates: ", daysAndDates);
export const days = Object.keys(daysAndDates);
export const stages = allStages(scheduleDummyData);

export function getArtist(stage, day){
   return scheduleDummyData.filter(function(item){
    if(item.geofence === stage && item.day === daysAndDates[day]) {
      return true
    }
    return false;
  }).map(function(item){
    return item.name;
  }).join("*");

}


