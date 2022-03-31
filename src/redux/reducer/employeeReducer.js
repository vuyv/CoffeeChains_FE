const initialState = {
  employees: [],
  employee: {},
  disable: false,
};

const employeeReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_EMPLOYEES":
      return {
        ...state,
        employees: action.payload,
      };
    case "CREATE_EMPLOYEE":
      return {
        ...state,
        employee: action.payload,
      };
    case "GET_EMPLOYEE_BY_ID":
      return {
        ...state,
        employee: action.payload,
      };
    case "UPDATE_EMPLOYEE":
      return {
        ...state,
        employee: action.payload,
      };
    case "DISABLE_EMPLOYEE":
      return {
        ...state,
        employee: action.payload,
      };
    default:
      return state;
  }
};

export default employeeReducer;
