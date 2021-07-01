import React, { useEffect } from "react";
import { Route } from "react-router";
import s from "./Main.module.css"
import Bar from "../containers/bar/Bar";
import Dashboard from "../containers/dashboard/Dashboard";
import Sidebar from "../containers/sidebar/Sidebar";
import Team from "../containers/team/Team";
import School from "../containers/school/School";
import Finance from "../containers/finance/Finance";
import Store from "../containers/store/Store";
import Instruction from "../containers/instruction/Instruction";
import Settings from "../containers/settings/Settings";
import Support from "../containers/support/Support";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUser } from "../redux/user/userOperations";
import {Container, Grid} from "@material-ui/core";


export default function Main(props) {
  const { match } = props;
  const token = useSelector(({ auth }) => auth.token);
  const dispatch = useDispatch();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  useEffect(() => {
    dispatch(getCurrentUser());
  }, [token]);


  return (
    <div className={s.root}>
        <Sidebar toggle={handleDrawerToggle} isOpen={mobileOpen}/>
            <Bar toggle={handleDrawerToggle} />
            <Container className={s.content}>
              <Route path={`${match.path}`} exact>
                <Dashboard />
              </Route>
              <Route path={`${match.path}/team`} component={Team} exact />
              <Route path={`${match.path}/school`} component={School} exact />
              <Route path={`${match.path}/finance`} component={Finance} exact />
              <Route path={`${match.path}/store`} component={Store} exact />
              <Route
                path={`${match.path}/instruction`}
                component={Instruction}
                exact
              />
              <Route path={`${match.path}/settings`} component={Settings} exact />
              <Route path={`${match.path}/support`} component={Support} exact />
            </Container>
    </div>
  );
}
