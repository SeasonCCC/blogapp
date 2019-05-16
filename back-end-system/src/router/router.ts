import dashboard from '../pages/index/dashboard/dashboard'
import Exposure from '../pages/index/exposure/exposure'
import Index from '../pages/index/index'
import News from '../pages/index/news/news'
import Tips from '../pages/index/tips/tips'
import Login from '../pages/login/login'

const routes = [
  {
    component: Index,
    path: '/index',
    routes: [
      {
        component: dashboard,
        path: '/index/dashboard'
      },
      {
        component: News,
        path: '/index/news'
      },
      {
        component: Tips,
        path: '/index/tips'
      },
      {
        component: Exposure,
        path: '/index/exposure'
      }
    ]
  },
  {
    component: Login,
    path: '/login'
  }
]

export default routes
