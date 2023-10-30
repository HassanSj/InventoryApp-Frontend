
import Category from "views/Category/Category";
import Dashboard from "views/Dashboard.js";
import Inventory from "views/Products/Inventory";
import UserProfile from "views/UserProfile.js";


const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "nc-icon nc-chart-pie-35",
    component: Dashboard,
    layout: "/admin"
  },
  {
    path: "/user",
    name: "User Profile",
    icon: "nc-icon nc-circle-09",
    component: UserProfile,
    layout: "/admin"
  },
  {
    path: "/inventory",
    name: "Inventory",
    icon: "nc-icon nc-notes",
    component: Inventory,
    layout: "/admin"
  },
  {
    path: "/category",
    name: "Category",
    icon: "nc-icon nc-notes",
    component: Category,
    layout: "/admin"
  },
];

export default dashboardRoutes;


