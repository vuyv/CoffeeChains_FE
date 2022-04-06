const initialState = {
  url: "",
  loading: false,
};

const imageReducer = (state = initialState, action) => {
  switch (action.type) {
    case "UPLOAD_IMAGE":
      return {
        ...state,
        url: action.payload,
        loading: false,
      };
    case "REMOVE_TEMP_IMAGE":
      return {
        ...state,
        url: {},
        loading: false,
      };
    default:
      return state;
  }
};

export default imageReducer;
