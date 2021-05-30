import React from "react";
import { Box } from "@material-ui/core";
import s from "./TabPanel.module.css";

export default function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
      className={s.root}
    >
      {value === index && children}
    </div>
  );
}
