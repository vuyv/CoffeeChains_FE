const initialState = {
  materials: [],
};

const materialReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_MATERIAL":
      {
        const updatedState = { ...state };
        const newItem = { material: action.payload };
        updatedState.materials.push(newItem);
        return updatedState;
      }
      break;
    case "REMOVE_MATERIAL":
      {
       const updatedState = { ...state };
        return updatedState;
      }
      break;
    default:
      return state;
  }
};

export default materialReducer;
