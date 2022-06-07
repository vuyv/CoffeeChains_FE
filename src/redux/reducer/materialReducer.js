const initialState = {
  materials: [],
  materialsInStock: [],
  material: {},
  materialItems: [],
  newMaterials: [],
  exportItems: [],
  exportMaterials: [],
  dailyQuantityByDate: [],
  dailyInventories: [],
  weeklyQuantityByDate: [],
  monthlyQuantityByDate: [],
};

const materialReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_MATERIALS":
      return {
        ...state,
        materials: action.payload,
      };
    case "ADD_TO_MATERIAL_ARRAY": {
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
    }

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
        materialsInStock: action.payload,
      };
    case "ADD_MATERIALS":
      return {
        ...state,
        newMaterials: action.payload,
      };
    case "ADD_TO_EXPORT_MATERIAL_ARRAY": {
      const itemIndex = state.exportItems.findIndex(
        (item) => item.rawMaterial.id === action.payload.rawMaterial.id
      );
      const updatedState = { ...state };
      if (itemIndex >= 0) {
        return updatedState;
      }

      const newMaterial = action.payload;
      updatedState.exportItems.push(newMaterial);
      return updatedState;
    }
    case "REMOVE_FROM_EXPORT_MATERIAL_ARRAY": {
      const updatedState = { ...state };

      const nextItems = updatedState.exportItems.filter(
        (item) => item.rawMaterial.name !== action.payload.name
      );

      updatedState.exportItems = nextItems;
      return updatedState;
    }
    case "CLEAR_EXPORT_MATERIAL_ARRAY": {
      const updatedState = { ...state };
      updatedState.exportItems = [];
      return updatedState;
    }
    case "EXPORT_MATERIALS": {
      return {
        ...state,
        exportMaterials: action.payload,
      };
    }
    case "COUNT_DAILY_QUANTITY_BY_TIME": {
      return {
        ...state,
        dailyQuantityByDate: action.payload,
      };
    }
    case "GET_DAILY_INVENTORY_BY_TIME": {
      return {
        ...state,
        dailyInventories: action.payload,
      };
    }
    case "COUNT_WEEKLY_QUANTITY_BY_DATE": {
      return {
        ...state,
        weeklyQuantityByDate: action.payload,
      };
    }
    case "COUNT_MONTHLY_QUANTITY_BY_DATE": {
      return {
        ...state,
        monthlyQuantityByDate: action.payload,
      };
    }
    default:
      return state;
  }
};

export default materialReducer;
