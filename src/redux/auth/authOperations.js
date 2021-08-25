import axios from "axios";
import authAction from "./authActions";


export const setToken = (token) => {
  axios.defaults.headers.common["Authorization"] = token;
  return;
}

export const clearToken = () => {
  axios.defaults.headers.common["Authorization"] = '';
};

export const signIn = (userData) => async (dispatch) => {
  dispatch(authAction.signinRequest());
  const statusCode = await axios
    .post("/login", userData)
    .then((response) => {
      setToken(response.data.role)
      axios.defaults.withCredentials = true;
      dispatch(authAction.signinSuccess({
        token: response.data.role,
      }));
    })
    .catch((error) => {
      return { status: '500', message: 'Неверный логин или пароль' };
    });

  return statusCode;
};

export const signUp = (userData) => async (dispatch) => {
  dispatch(authAction.signupRequest());
  return await axios
    .post("/register", userData)
    .then(res => {
      return {status: res.status};
    })
    .catch((error) => {
      return { status: error.response.status, message: error.response.data };
    });
};

export const signOut = (token) => (dispatch) => {
  dispatch(authAction.signoutRequest());
  axios
    .delete("/signOut", { token })
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
