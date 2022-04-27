const initialState = {
  reportEachBranch: [],
};

const managerReportReducer = (state = initialState, action) => {
  switch (action.type) {
    case "REPORT_EACH_BRANCH":
      return {
        ...state,
        reportEachBranch: action.payload,
      };
    default:
      return state;
  }
};

export default managerReportReducer;
