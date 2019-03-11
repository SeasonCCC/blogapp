import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { HashRouter, Route, Switch } from 'react-router-dom'

import './index.css'
// import Main from "./pages/main/main";
import registerServiceWorker from './registerServiceWorker'

import routes from './router/router'

class Main extends React.Component {
  public render () {
    return (
      <HashRouter>
        <Switch>
          {routes.map((route, i) => {
            return (
              <Route
                path={route.path}
                key={i}
                component={route.component}
                exact={true}
                routes={route.routes}
              />
            )
          })}
        </Switch>
      </HashRouter>
    )
  }
}

ReactDOM.render(<Main />, document.getElementById('root') as HTMLElement)
registerServiceWorker()
