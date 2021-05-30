import React, { useEffect } from "react";
import { Route } from "react-router";
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
import s from "./Main.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUser } from "../redux/user/userOperations";

export default function Main(props) {
  const { match } = props;
  const token = useSelector(({ auth }) => auth.token);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCurrentUser());
  }, [token]);
  return (
    <div className={s.main}>
      <Sidebar />
      <div className={s.layout}>
        <Bar />
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
      </div>
    </div>
  );
}
