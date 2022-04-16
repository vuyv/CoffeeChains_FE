const initialState = {
  countOfAllEmployee: 0,
  allDailyOrders: 0,
  allDailyEarnings: 0,
  allProducts: 0,
  dailyOrdersEachBrach: [],
  dailyTotalPriceEachBrach: [],
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
        dailyOrdersEachBrach: action.payload,
      };
    case "DAILY_TOTAL_PRICE_EACH_BRACH":
      return {
        ...state,
        dailyTotalPriceEachBrach: action.payload,
      };
    default:
      return state;
  }
};

export default ownerStatisticsReducer;
