const defaults = {
  selectedDay: '',
  chooseStage: {label: 'All Stages', value: 'All Stages'},
  scheduleData: '',
  stages: [],
  days: [],
  daysAndDates: {},
  agenda: [],
  imgURL: ''

};

export default function venueScheduleReducer(state = defaults, action) {
  switch(action.type) {
    case 'UPDATE_DAY': {
      return { ...state, selectedDay: action.payload.day };
    }
    case 'UPDATE_STAGE': {
      return { ...state, chooseStage: action.payload.stage };
    }
    case 'UPDATE_FESTIVAL': {
      return { ...state, scheduleData: action.payload.festival };
    }
    case 'DEF': {
      return { ...state, chooseStage: def };
    }
    case 'UPDATE_SCHEDULE_DATA': {
      return {...state, scheduleData: action.payload.scheduleData };
    }
    case 'AFTER_UPDATING_DATA': {
      return {
        ...state,
        stages: action.payload.allStages,
        days: action.payload.allDays,
        daysAndDates: action.payload.daysAndDates,
        selectedDay: action.payload.selectedDay

      }
    }
    case 'REMOVE_AGENDA': {
      return { ...state, agenda: action.payload.agenda };
    }
    case 'DEFAULT_AGENDA': {
      return { ...state, agenda: action.payload.agenda };
    }
    case 'ADD_AGENDA': {
      return { ...state, agenda: action.payload.agenda };
    }
  }
  return state;
};
