import { createAction } from "@reduxjs/toolkit";

const getCurrentUserRequest = createAction("user/getCurrentUserRequest");
const getCurrentUserSuccess = createAction("user/getCurrentUserSuccess");
const getCurrentUserError = createAction("user/getCurrentUserError");

const userAction = {
  getCurrentUserRequest,
  getCurrentUserSuccess,
  getCurrentUserError,
};

export default userAction;
