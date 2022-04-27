const initialState = {
  reportByTime: [],
};

const ownerReportReducer = (state = initialState, action) => {
  switch (action.type) {
    case "REPORT_BY_TIME":
      return {
        ...state,
        reportByTime: action.payload,
      };
    default:
      return state;
  }
};

export default ownerReportReducer;
