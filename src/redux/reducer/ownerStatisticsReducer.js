const initialState = {
  countOfAllEmployee: 0,
  allDailyOrders: 0,
  allDailyEarnings: 0,
  allProducts: 0,
  dailyOrdersEachBranch: [],
  dailyTotalPriceEachBranch: [],
  employeeEachBranch: [],
  compareLastMonthRevenue: 0,
  compareLastWeekRevenue: 0,
  topWeeklySeller: [],
  currentMonthRevenue: 0,
  currentWeekRevenue: 0,
};

const ownerStatisticsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "COUNT_OF_ALL_EMPLOYEE":
      return {
        ...state,
        countOfAllEmployee: action.payload,
      };
    case "ALL_DAILY_ORDERS":
      return {
        ...state,
        allDailyOrders: action.payload,
      };
    case "ALL_DAILY_EARNINGS":
      return {
        ...state,
        allDailyEarnings: action.payload,
      };
    case "ALL_PRODUCTS":
      return {
        ...state,
        allProducts: action.payload,
      };
    case "DAILY_ORDERS_EACH_BRACH":
      return {
        ...state,
        dailyOrdersEachBranch: action.payload,
      };
    case "DAILY_TOTAL_PRICE_EACH_BRACH":
      return {
        ...state,
        dailyTotalPriceEachBranch: action.payload,
      };
    case "EMPLOYEE_EACH_BRANCH":
      return {
        ...state,
        employeeEachBranch: action.payload,
      };
    case "COMPARE_LAST_MONTH_REVENUE":
      return {
        ...state,
        compareLastMonthRevenue: action.payload,
      };
    case "COMPARE_LAST_WEEK_REVENUE":
      return {
        ...state,
        compareLastWeekRevenue: action.payload,
      };
    case "TOP_WEEKLY_SELLER":
      return {
        ...state,
        topWeeklySeller: action.payload,
      };
    case "CURRENT_MONTH_REVENUE":
      return {
        ...state,
        currentMonthRevenue: action.payload,
      };
    case "CURRENT_WEEK_REVENUE":
      return {
        ...state,
        currentWeekRevenue: action.payload,
      };
   
    default:
      return state;
  }
};

export default ownerStatisticsReducer;
