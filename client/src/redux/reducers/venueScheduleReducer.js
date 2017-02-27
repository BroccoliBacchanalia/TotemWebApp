//import scheduleDummyData from '../../components/VenueSchedule/scheduleDummyData.js';
const defaults = {
  selectedDay: 'Friday',
  chooseStage: '',
  scheduleDummyData: "",
  stages: [],//['Lands End', 'Sutro', 'Twin Peaks'],
  days: [],//['Friday', 'Saturday'],
  daysAndDates: {}//{'Friday': "2016-08-05T07:00:00.000Z" , "Saturday": "2016-08-06T07:00:00.000Z" }
};

export default function venueScheduleReducer(state = defaults, action) {
  switch(action.type) {
    case 'update_day': {
      return { ...state, selectedDay: action.payload.day };
    }
    case 'update_stage': {
      return { ...state, chooseStage: action.payload.stage };
    }
    case 'update_festival': {
      return { ...state, scheduleDummyData: action.payload.festival };
    }
    case 'def': {
      return { ...state, selectedDay: "Friday", chooseStage: "" };
    }
    case 'update_scheduleData': {
      return {
        ...state, 
        scheduleDummyData: action.payload.scheduleDummyData
        }
    }
    case 'after_updatingData': {
       return {
        ...state,
        stages: action.payload.allStages,
        days: action.payload.allDays,
        daysAndDates: action.payload.daysAndDates
        }
    }
  }
  return state;
};
