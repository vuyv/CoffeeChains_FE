import axios from "axios";

export const uploadImage = (file) => {
  return function (dispatch) {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "image_preset");

    axios
      .post(`${process.env.REACT_APP_CLOUDIARY}`, formData)
      .then((res) => {
        dispatch({
          type: "UPLOAD_IMAGE",
          payload: res.data.secure_url,
        });
        dispatch(removeTempImage());
      })
      .catch((error) => console.log(error));
  };
};

export const removeTempImage = () => {
  return function (dispatch) {
    dispatch({
      type: "REMOVE_TEMP_IMAGE",
    });
  };
};