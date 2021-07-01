import { Suspense, useEffect, useState } from "react";
import { Switch, BrowserRouter, Redirect } from "react-router-dom";
import app from "./App.css"

import PrivateRoute from "./views/helpers/PrivateRoute";
import PublicRoute from "./views/helpers/PublicRoute";
import routes from "./routers";
// import { verify, decode } from "jsonwebtoken";
// const jwt = require("jsonwebtoken");

import axios from "axios";
import { useSelector } from "react-redux";
axios.defaults.baseURL = process.env.REACT_APP_DOMAIN_ADDRESS;

function verifyToken(token) {
  if (token) {
    return true;
  }
  return false;
}

function App() {
  const token = useSelector(({ auth }) => auth.token);
  const [flagAuth, setflagAuth] = useState(false);

  useEffect(() => {
    axios.defaults.headers.common["Authorization"] = token;
    setflagAuth(() => verifyToken(token));
  }, [token]);

  return (
    <div className={app.App}>
      <BrowserRouter>
        <Suspense fallback={<p>Loading</p>}>
          <Switch>
            {routes.map((route) =>
              route.private ? (
                <PrivateRoute
                  key={route.label}
                  {...route}
                  isAuthenticated={flagAuth}
                />
              ) : (
                <PublicRoute
                  key={route.label}
                  {...route}
                  isAuthenticated={flagAuth}
                />
              )
            )}
            {/* <Route component={NotFound} /> */}
            <Redirect to="/" />
          </Switch>
        </Suspense>
      </BrowserRouter>
    </div>
  );
}

export default App;
