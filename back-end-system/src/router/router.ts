import Exposure from "../pages/exposure/exposure";
import Index from "../pages/index/index";
import Login from "../pages/login/login";
import News from "../pages/news/news";
import Tips from "../pages/tips/tips";

const routes = [
  {
    component: Index,
    path: "/",
    routes: [
      {
        component: News,
        path: "/news",
      },
      {
        component: Tips,
        path: "/tips",
      },
      {
        component: Exposure,
        path: "/exposure",
      }
    ]
  },
  {
    component: Login,
    path: "/login",
  }
];

export default routes;