const defaults = {
  selectedDay: null,
  selectedStage: 'All Stages',
 isToggle: false
};

export default function venueScheduleReducer(state = defaults, action) {
  switch(action.type) {
    case 'UPDATE_DAY': {
      console.log(action)
      return { ...state, selectedDay: action.payload.day };
    }
    case 'UPDATE_STAGE': {
      return { ...state, selectedStage: action.payload.stage };
    }
    case 'TOGGLE': {
      return { ...state, isToggle: !state.isToggle };
    }
  }
  return state;
};
