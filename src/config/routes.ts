import CreateWorkout from "../pages/CreateWorkout";
import CurrentUser from "../pages/CurrentUser";
import Dashboard from "../pages/Dashboard";
import Homepage from "../pages/Homepage";

export default [
  {
    path: "/welcome",
    permissions: [""],
    component: Homepage,
    auth: false,
  },
  {
    path: "/create-workout",
    permissions: [""],
    component: CreateWorkout,
    auth: true,
  },
  {
    path: "/current",
    permissions: [""],
    component: CurrentUser,
    auth: false,
  },
  {
    path: "/",
    permissions: [""],
    component: Dashboard,
    auth: true,
    exact: true,
  },
];
