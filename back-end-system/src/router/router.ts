import Login from '../pages/login/login';
import Main from '../pages/main/main';
import dashboard from '../pages/main/dashboard/dashboard';
import projects from '../pages/main/projects/projects';
import articles from '../pages/main/articles/articles';
import details from '../pages/main/details/details';


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
      {
        component: articles,
        path: '/main/articles',
      },
      {
        component: details,
        path: '/main/details',
      },
    ],
  },
  {
    component: Login,
    path: '/login',
  },
];

export default routes;
