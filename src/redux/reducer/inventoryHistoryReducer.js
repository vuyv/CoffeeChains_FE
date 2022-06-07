const initialState = {
  dailyImport: [],
  weeklyImport: [],
  monthlyImport: [],
  inventoryHistory: [],
};

const inventoryHistoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case "DAILY_INVENTORY_HISTORY":
      return {
        ...state,
        dailyImport: action.payload,
      };
    case "WEEKLY_INVENTORY_HISTORY":
      return {
        ...state,
        weeklyImport: action.payload,
      };
    case "MONTHLY_INVENTORY_HISTORY":
      return {
        ...state,
        monthlyImport: action.payload,
      };
    case "GET_INVENTORY_HISTORY_BY_TIME":
      return {
        ...state,
        inventoryHistory: action.payload,
      };
    default:
      return state;
  }
};

export default inventoryHistoryReducer;
