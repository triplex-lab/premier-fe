import axios from "axios";
import userAction from "./userActions";

export const getCurrentUser = () => async (dispatch) => {
  dispatch(userAction.getCurrentUserRequest());
  await axios
    .get("/api/user")
    .then((response) => {
      dispatch(userAction.getCurrentUserSuccess(response.data));
    })
    .catch((error) => {
      dispatch(userAction.getCurrentUserError(error));
    });
};
