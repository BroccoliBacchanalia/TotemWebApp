import firebase from 'firebase';
const defaults = {
  selectedDay: 'Friday',
  chooseStage: '',
  scheduleData: "",
  stages: [],
  days: [],
  daysAndDates: {},
  agenda: []

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
      return { ...state, scheduleData: action.payload.festival };
    }
    case 'def': {
      return { ...state, selectedDay: "Friday", chooseStage: "" };
    }
    case 'update_scheduleData': {
      return {...state, scheduleData: action.payload.scheduleData };
    }
    case 'after_updatingData': {
      return {
        ...state,
        stages: action.payload.allStages,
        days: action.payload.allDays,
        daysAndDates: action.payload.daysAndDates
      }
    }
    case 'remove_agenda': {
      return { ...state, agenda: action.payload.agenda };
    }
    case 'default_agenda': {
      return { ...state, agenda: action.payload.agenda };
    }
    case 'add_agenda': {
      return { ...state, agenda: action.payload.agenda };
    }
  }
  return state;
};
