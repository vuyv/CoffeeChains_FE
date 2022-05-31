const initialState = {
  materials: [],
  importMaterials: [],
  material: {},
  materialItems: [],
  newMaterials: [],
};

const materialReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_MATERIALS":
      return {
        ...state,
        materials: action.payload,
      };
    case "ADD_TO_MATERIAL_ARRAY":
      const itemIndex = state.materialItems.findIndex(
        (item) => item.id === action.payload.id
      );
      const updatedState = { ...state };
      if (itemIndex >= 0) {
        return updatedState;
      }

      const newMaterial = action.payload;
      updatedState.materialItems.push(newMaterial);
      return updatedState;

    case "REMOVE_FROM_MATERIAL_ARRAY": {
      const updatedState = { ...state };

      const nextItems = updatedState.materialItems.filter(
        (item) => item.name !== action.payload.name
      );

      updatedState.materialItems = nextItems;
      return updatedState;
    }
    case "CLEAR_MATERIAL_ARRAY": {
      const updatedState = { ...state };
      updatedState.materialItems = [];
      return updatedState;
    }
    case "GET_MATERIAL_BY_ID":
      return {
        ...state,
        material: action.payload,
      };

    case "GET_MATERIALS_BY_BRANCH":
      return {
        ...state,
        importMaterials: action.payload,
      };
    case "ADD_MATERIALS":
      return {
        ...state,
        newMaterials: action.payload,
      };

    default:
      return state;
  }
};

export default materialReducer;
