import * as React from 'react'
import { HashRouter, Route, Switch } from 'react-router-dom'
import routes from '../../router/router'

interface IMainOption {
  location: any
}

class Main extends React.Component<IMainOption, {}> {
  public static defaultProps = {
    location: {}
  }

  constructor (props: IMainOption) {
    super(props)
  }

  public render () {
    return (
      <HashRouter>
        <Switch>
          {/* <Route
            path='/'
            component={Index} /> */}
          {routes.map((route, i) => {
            return (
              <Route
                path={route.path}
                key={i}
                component={route.component}
                exact={true}
              />
            )
          })}
        </Switch>
      </HashRouter>
    )
  }
}

export default Main
