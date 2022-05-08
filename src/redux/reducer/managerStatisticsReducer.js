const initialState = {
  countOfEmployee: 0,
  dailyOrders: 0,
  dailyEarnings: 0,
  weeklyEarnings: [],
  bestSellingProducts: [],
  currentMonthRevenue: 0,
  currentWeekRevenue: 0,
  compareLastMonthRevenue: 0,
  monthlyOrderQuantity: []
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
    case "COMPARE_LAST_MONTH_BRANCH_REVENUE":
      return {
        ...state,
        compareLastMonthRevenue: action.payload,
      };
    case "CURRENT_MONTH_BRANCH_REVENUE":
      return {
        ...state,
        currentMonthRevenue: action.payload,
      };
    case "CURRENT_WEEK_BRANCH_REVENUE":
      return {
        ...state,
        currentWeekRevenue: action.payload,
      };
    case "MONTHLY_ORDER_QUANTITY":
      return {
        ...state,
        monthlyOrderQuantity: action.payload,
      };
    default:
      return state;
  }
};

export default managerStatisticsReducer;
