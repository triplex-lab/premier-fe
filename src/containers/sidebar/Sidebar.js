import React from "react";
import Nav from "../../component/nav/Nav";
import s from "./Sidebar.module.css";
import logo from "../../images/logo.png";
import GroupAddIcon from "@material-ui/icons/GroupAdd";
import { Button, Drawer, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  paper: {
    background: '#2e303d',
  }
}));

export default function Sidebar(props) {
  const classes = useStyles();
  const { window } = props;
  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <nav aria-label="sidebar" className={s.root}>
        <Drawer
          container={container}
          variant="temporary"
          anchor='left'
          open={props.isOpen}
          onClose={props.toggle}
          classes={{
            paper: classes.paper,
          }}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
        >
          <Grid container direction='column' spacing={1} alignItems='center' style={ {margin: 0, width: '100%' } }>
            <Grid container item spacing={3} direction='column' alignItems='center' style={ {margin: 0, width: '100%' } }>
              <Grid item>
                <img className={s.img} src={logo} alt="logo" />
              </Grid>
              <Grid container item direction='column'>
                <Button color="primary" variant="outlined" style={{ color: "#dddddd" }}>
                    <GroupAddIcon className={s.icon} />
                    Пригласить в команду
                </Button>
            </Grid>
            </Grid>
            <Grid item container xs>
              <Nav />
            </Grid>
          </Grid>
        </Drawer>
    </nav>
  );
}
