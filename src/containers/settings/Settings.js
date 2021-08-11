import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

import TabPanel from "../../component/tabPanel/TabPanel";
import Links from "../../component/links/Links";
import PaySettings from "../../component/paySettings/PaySettings";
import ChangePass from "../../component/changePass/ChangePass";
import UserInfo from "../../component/userInfo/UserInfo";

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    height: "100%",
    minHeight: 'calc(100vh - 60px)',
  },
});

export default function Settings() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    // <div className={classes.root}>
    <Paper className={classes.root}>
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        variant="fullWidth"
        centered
      >
        <Tab label="Общая информация" />
        <Tab label="Смена пароля" />
        <Tab label="Платежные реквизиты" />
        <Tab label="Ссылки" />
      </Tabs>
      <TabPanel value={value} index={0}>
        <UserInfo />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <ChangePass />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <PaySettings />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <Links />
      </TabPanel>
    </Paper>
  );
}
