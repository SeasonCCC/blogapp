import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom'

import './index.css'
// import Main from "./pages/main/main";
import registerServiceWorker from './registerServiceWorker'

import routes from './router/router'

// interface IRoute {
//   component: JSX.Element;
//   path: string;
//   routes?: any;
// }

class Main extends React.Component {
  public render (): JSX.Element {
    return (
      <HashRouter>
        <Switch>
          {routes.map((route, i) => {
            const Component = (): JSX.Element => (
              <route.component routes={route.routes} />
            )

            return (
              <Route
                path={route.path}
                key={i}
                exact={route.path === '/login'}
                render={Component}
              />
            )
          })}
          <Redirect to='/login' />
        </Switch>
      </HashRouter>
    )
  }
}

ReactDOM.render(<Main />, document.getElementById('root') as HTMLElement)
registerServiceWorker()
