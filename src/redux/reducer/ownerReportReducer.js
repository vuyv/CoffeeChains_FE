const initialState = {
  dailyRevenueAllBranch: [],
};

const ownerReportReducer = (state = initialState, action) => {
  switch (action.type) {
    case "DAILY_REVENUE_ALL_BRANCH":
      return {
        ...state,
        dailyRevenueAllBranch: action.payload,
      };
    default:
      return state;
  }
};

export default ownerReportReducer;
