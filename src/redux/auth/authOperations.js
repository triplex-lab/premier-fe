import axios from "axios";
import authAction from "./authActions";
export const setToken = (token) =>
  (axios.defaults.headers.common["Authorization"] = token);

export const clearToken = () =>
  (axios.defaults.headers.common["Authorization"] = "");

export const signIn = (userData) => async (dispatch) => {
  dispatch(authAction.signinRequest());
  const statusCode = await axios
    .post("/api/auth/signin", userData)
    .then((response) => {
      setToken(response.data.token);
      dispatch(authAction.signinSuccess(response.data));
    })
    .catch((error) => {
      return { status: error.response.status, message: error.response.data };
    });
  return statusCode;
};

export const signUp = (userData) => async (dispatch) => {
  dispatch(authAction.signupRequest());
  const data = {
    email: userData.email,
    password: userData.password,
    ref: userData.ref,
  };
  return await axios
    .post("/api/auth/signUp", data)
    .then(({ status }) => {
      return { status };
    })
    .catch((error) => {
      return { status: error.response.status, message: error.response.data };
    });
};

export const signOut = (token) => (dispatch) => {
  dispatch(authAction.signoutRequest());
  axios
    .delete("/api/auth/signOut", { token })
    .then(() => {
      dispatch(authAction.signoutSuccess());
    })
    .catch((err) => dispatch(authAction.signoutError(err)))
    .finally(clearToken());
};

export const recoveryPassword = (userData) => async (dispatch) => {
  dispatch(authAction.recoveryPassRequest());
  const statusCode = await axios
    .post("/api/auth/recoverypass", userData)
    .then(({ status }) => {
      dispatch(authAction.recoveryPassSuccess(status));
      return { status };
    })
    .catch((error) => {
      dispatch(authAction.recoveryPassError(error.response));
      return { status: error.response.status, message: error.response.data };
    });
  return statusCode;
};
