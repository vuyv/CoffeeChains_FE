const initialState = {
  countOfEmployee: 0,
  dailyOrders: 0,
  dailyEarnings: 0,
  weeklyEarnings: [],
  bestSellingProducts: [],
};

const managerStatisticsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "COUNT_OF_BRANCH_EMPLOYEE":
      return {
        ...state,
        countOfEmployee: action.payload,
      };
    case "DAILY_ORDERS":
      return {
        ...state,
        dailyOrders: action.payload,
      };
    case "DAILY_EARNINGS":
      return {
        ...state,
        dailyEarnings: action.payload,
      };
    case "WEEKLY_EARNINGS":
      return {
        ...state,
        weeklyEarnings: action.payload,
      };
    case "BEST_SELLING_PRODUCTS":
      return {
        ...state,
        bestSellingProducts: action.payload,
      };
    default:
      return state;
  }
};

export default managerStatisticsReducer;
