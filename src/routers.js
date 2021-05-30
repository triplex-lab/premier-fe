import { lazy } from "react";

const routers = [
  {
    path: "/",
    label: "Premier-club",
    exact: true,
    component: lazy(() => import("./views/Home")),
    private: false,
  },
  {
    path: "/signin",
    label: "signIn",
    exact: true,
    component: lazy(() => import("./views/Signin")),
    private: false,
  },
  {
    path: "/signup/:referral",
    label: "signUp",
    exact: false,
    component: lazy(() => import("./views/Signup")),
    private: false,
  },
  {
    path: "/recovery-password",
    label: "recovery-password",
    exact: true,
    component: lazy(() => import("./views/RecoveryPassword")),
    private: false,
  },
  {
    path: "/verification/:verificationToken",
    label: "Verify",
    exact: false,
    component: lazy(() => import("./views/TokenVerifyView")),
    private: false,
  },
  {
    path: "/dashboard",
    label: "Premier-club",
    exact: false,
    component: lazy(() => import("./views/Main")),
    private: true,
  },
];

export default routers;
