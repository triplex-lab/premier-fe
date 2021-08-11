import axios from "axios";
import userAction from "./userActions";

export const getCurrentUser = () => async (dispatch) => {
  dispatch(userAction.getCurrentUserRequest());
  await axios
    .get("/dashboard")
    .then((response) => {
      dispatch(userAction.getCurrentUserSuccess({...response.data.currentUser, legInfo: response.data.legInfo}));
    })
    .catch((error) => {
      dispatch(userAction.getCurrentUserError(error));
    });
};
