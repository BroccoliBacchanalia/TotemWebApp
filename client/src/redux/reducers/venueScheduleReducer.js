const defaults = {
  agenda: [],
  selectedDay: null,
  selectedStage: 'All Stages'
};

export default function venueScheduleReducer(state = defaults, action) {
  switch(action.type) {
    case 'UPDATE_DAY': {
      return { ...state, selectedDay: action.payload.day };
    }
    case 'UPDATE_STAGE': {
      return { ...state, selectedStage: action.payload.stage };
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
