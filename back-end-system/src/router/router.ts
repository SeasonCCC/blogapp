import Login from '../pages/login/login';
import Main from '../pages/main/main';
import dashboard from '../pages/main/dashboard/dashboard';
import projects from '../pages/main/projects/projects';


const routes: IRoute[] = [
  {
    component: Main,
    path: '/main',
    routes: [
      {
        component: dashboard,
        path: '/main/dashboard',
      },
      {
        component: projects,
        path: '/main/projects',
      },
    ],
    // routes: [
    // {
    //   component: dashboard,
    //   path: '/main/dashboard',
    // },
    // {
    //   component: News,
    //   path: '/main/news',
    // },
    // {
    //   component: Tips,
    //   path: '/main/tips',
    // },
    // {
    //   component: Exposure,
    //   path: '/main/exposure',
    // },
    // {
    //   component: Users,
    //   path: '/main/users',
    // },
    // ],
  },
  {
    component: Login,
    path: '/login',
  },
];

export default routes;
