import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Lesson from "../lesson/Lesson";
import TabPanel from "../tabPanel/TabPanel";

// function TabPanel(props) {
//   const { children, value, index, ...other } = props;

//   return (
//     <div
//       role="tabpanel"
//       hidden={value !== index}
//       id={`scrollable-auto-tabpanel-${index}`}
//       aria-labelledby={`scrollable-auto-tab-${index}`}
//       {...other}
//     >
//       {value === index && children}
//     </div>
//   );
// }

// TabPanel.propTypes = {
//   children: PropTypes.node,
//   index: PropTypes.any.isRequired,
//   value: PropTypes.any.isRequired,
// };

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    "aria-controls": `scrollable-auto-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function Unit({ index }) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
        >
          <Tab label="Модуль One" {...a11yProps(0)} />
          <Tab label="Модуль Two" {...a11yProps(1)} />
          <Tab label="Модуль Three" {...a11yProps(2)} />
          {index !== 0 && (
            <>
              {/* <Tab label="Модуль Four" {...a11yProps(3)} /> */}
              {/* <Tab label="Модуль Five" {...a11yProps(4)} /> */}
            </>
          )}
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <Box p={3}>
          <Typography>Модуль 1</Typography>
          <Lesson />
        </Box>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Box p={3}>
          <Typography>Модуль 2</Typography>
          <Lesson />
        </Box>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Box p={3}>
          <Typography>Модуль 3</Typography>
          <Lesson />
        </Box>
      </TabPanel>
    </div>
  );
}
