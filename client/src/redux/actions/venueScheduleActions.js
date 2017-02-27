import scheduleDummyData from '../../components/VenueSchedule/scheduleDummyData.js';
import store from '../store.js';
export function updateDay(day) {
  store.dispatch({
    type:'update_day',
    payload: { day }
  });
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
  //console.log('DEF works');
}

export function allStages (scheduleItems) {
  const stages = {};

  for(let key in scheduleItems) {
    const item = scheduleItems[key];
    if(!(item.geofence in stages)) {
      stages[item.geofence] = item.geofence;
    }
  }
  return Object.keys(stages);
}

export function allDays(scheduleDummyData) {

    let datesDay={};
    for(var key in scheduleDummyData) {
      var item = scheduleDummyData[key];
      if(!(item.day in datesDay)) {
        datesDay[generateDay(item.day)] = item.day;
      }
    }

    return datesDay;
}

export const daysAndDates = allDays(scheduleDummyData);
export const days = Object.keys(daysAndDates);

export function getArtist(stage, day){
 var arr=[]
  for(var key in scheduleDummyData) {
    var item = scheduleDummyData[key];
    if(item.geofence === stage && item.day === daysAndDates[day]) {
      arr.push(item.name);
    }
  }
  return arr.join(' | ');

}

function generateDay(dateString) {
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
