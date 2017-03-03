import store from '../store.js';

export function updateDay(day) {
  store.dispatch({
    type:'UPDATE_DAY',
    payload: { day }
  });
}

export function updateStage(stage) {
  store.dispatch({
    type: 'UPDATE_STAGE',
    payload: { stage }
  });
}

export function getStagesAndDays(scheduleItems) {
  const stages = {};
  const days = {};

  for (let key in scheduleItems) {
    const item = scheduleItems[key];
    stages[item.geofence] = item.geofence;
    days[generateDay(item.day)] = item.day;
  }

  return { stages: Object.keys(stages), days: days };
}

export function getArtist(stage, day){
 let arr=[]
  for(let key in scheduleData) {
    let item = scheduleData[key];
    if(item.geofence === stage && item.day === daysAndDates[day]) {
      arr.push(item.name);
    }
  }
  return arr.join(' | ');
}

function generateDay(dateString) {
  const weekday = [];
  const d = new Date(dateString)

  weekday[0] = "Sunday";
  weekday[1] = "Monday";
  weekday[2] = "Tuesday";
  weekday[3] = "Wednesday";
  weekday[4] = "Thursday";
  weekday[5] = "Friday";
  weekday[6] = "Saturday";

  return weekday[d.getDay()];
}
