const initialState = {
  newRecipes: [],
  recipeByProduct: [],
  updateRecipe: []
};

const recipeReducer = (state = initialState, action) => {
  switch (action.type) {
    case "CREATE_RECIPE":
      return {
        ...state,
        newRecipes: action.payload,
      };
    case "GET_RECIPE_BY_PRODUCT":
      return {
        ...state,
        recipeByProduct: action.payload,
      };
    case "UPDATE_RECIPE":
      return {
        ...state,
        updateRecipe: action.payload,
      };
    default:
      return state;
  }
};

export default recipeReducer;
