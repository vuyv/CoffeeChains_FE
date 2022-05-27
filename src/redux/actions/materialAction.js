export const addMaterial = (item) => {
  return function (dispatch) {
    dispatch({
      type: "ADD_MATERIAL",
      payload: item,
    });
  };
};

export const removeMaterial = (item) => {
  return function (dispatch) {
    dispatch({
      type: "REMOVE_MATERIAL",
      payload: item,
    });
  };
};
