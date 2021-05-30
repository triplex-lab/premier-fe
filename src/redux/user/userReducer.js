import { combineReducers } from "redux";
import { createReducer } from "@reduxjs/toolkit";
import actions from "./userActions";

const userReducer = createReducer(
  {},
  {
    [actions.getCurrentUserSuccess]: (state, { payload }) => {
      return {
        ...state,
        ...payload,
      };
    },
  }
);

export default userReducer;
