import { createAction } from "@reduxjs/toolkit";

const signupRequest = createAction("auth/signupRequest");
const signupSuccess = createAction("auth/signupSuccess");
const signupError = createAction("auth/signupError");

const signinRequest = createAction("auth/signinRequest");
const signinSuccess = createAction("auth/signinSuccess");
const signinError = createAction("auth/signinError");

const signoutRequest = createAction("auth/signoutRequest");
const signoutSuccess = createAction("auth/signoutSuccess");
const signoutError = createAction("auth/signoutError");

const recoveryPassRequest = createAction("auth/recoveryPassRequest");
const recoveryPassSuccess = createAction("auth/recoveryPassSuccess");
const recoveryPassError = createAction("auth/recoveryPassError");

const authAction = {
  signupRequest,
  signupSuccess,
  signupError,
  signinRequest,
  signinSuccess,
  signinError,
  signoutRequest,
  signoutSuccess,
  signoutError,
  recoveryPassRequest,
  recoveryPassSuccess,
  recoveryPassError,
};

export default authAction;
