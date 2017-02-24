import scheduleDummyData from '../../components/VenueSchedule/scheduleDummyData.json';
const defaults = {
  selectedDay: 'friday',
  chooseStage: '',
  scheduleDummyData: scheduleDummyData,
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
      return { ...state, selectedDay: "" };
    }
  }
  return state;
};
