import dashboard from '../pages/index/dashboard/dashboard'
import Exposure from '../pages/index/exposure/exposure'
import Index from '../pages/index/index'
import News from '../pages/index/news/news'
import Tips from '../pages/index/tips/tips'
import Login from '../pages/login/login'

const routes = [
  {
    component: Index,
    path: '/',
    routes: [
      {
        component: dashboard,
        path: '/dashboard'
      },
      {
        component: News,
        path: '/news'
      },
      {
        component: Tips,
        path: '/tips'
      },
      {
        component: Exposure,
        path: '/exposure'
      }
    ]
  },
  {
    component: Login,
    path: '/login'
  }
]

export default routes
