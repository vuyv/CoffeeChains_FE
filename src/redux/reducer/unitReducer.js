const initialState = {
  newUnit: {},
  allUnits: []
};

const unitReducer = (state = initialState, action) => {
  switch (action.type) {
    case "CREATE_UNIT":
      return {
        ...state,
        newUnit: action.payload,
      };
    case "GET_ALL_UNITS":
      return {
        ...state,
        allUnits: action.payload,
      };
    default:
      return state;
  }
};

export default unitReducer;
