const initialState = {
  materials: [],
  newMaterial: {},
  updateMaterial: {},
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

    case "CREATE_MATERIAl":
      return {
        ...state,
        newMaterial: action.payload,
      };

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
