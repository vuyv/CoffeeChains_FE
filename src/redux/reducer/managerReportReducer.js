const initialState = {
  reportEachBranch: [],
  exportReportEachBranch: [],
};

const managerReportReducer = (state = initialState, action) => {
  switch (action.type) {
    case "REPORT_EACH_BRANCH":
      return {
        ...state,
        reportEachBranch: action.payload,
      };

    case "EXPORT_REPORT_EACH_BRANCH":
      return {
        ...state,
        exportReportEachBranch: action.payload,
      };
    default:
      return state;
  }
};

export default managerReportReducer;
