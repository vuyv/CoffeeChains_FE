const initialState = {
  roles: [],
  role: {},
  loading: false,
};

const roleReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_ROLES":
      return {
        ...state,
        roles: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

export default roleReducer;
