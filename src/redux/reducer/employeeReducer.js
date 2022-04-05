const initialState = {
  employees: [],
  employee: {},
  disable: false,
  currentUser: {},
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
    case "GET_EMPLOYEES_BY_BRANCH":
      return {
        ...state,
        employees: action.payload,
      };
    case "GET_CURRENT_USER":
      return {
        ...state,
        currentUser: action.payload,
      };
    case "CHANGE_PASSWORD":
      return {
        ...state,
        currentUser: action.payload,
      };
    case "REMOVE_CURRENT_USER":
      return {
        ...state,
        currentUser: null,
      };
    default:
      return state;
  }
};

export default employeeReducer;
