/*
 * @Author: Season
 * @Date: 2020-04-02 10:14:20
 * @LastEditTime: 2020-06-05 15:08:08
 * @FilePath: \back-end-system\src\router\router.ts
 */
import Login from '../pages/login/login';
import Main from '../pages/main/main';
import dashboard from '../pages/main/dashboard/dashboard';
import projects from '../pages/main/projects/projects';
import articles from '../pages/main/articles/articles';
import users from '../pages/main/users/users';
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
        component: users,
        path: '/main/users',
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
