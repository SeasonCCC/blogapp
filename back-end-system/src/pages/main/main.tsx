import * as React from "react";
import { HashRouter, Route, Switch, withRouter } from "react-router-dom";
// import routes from "../../router/router";
import Index from "../index/index";

interface IMainOption {
  location: any;
}

@withRouter()
class Main extends React.Component<IMainOption, {}> {
  public static defaultProps = {
    location: {}
  };

  constructor(props: IMainOption) {
    super(props);
    // this.renRoute = this.renRoute.bind(this);
  }

  // public renRoute(route: any) {
  //   // console.log((props: any) => <route.component {...props} routes={route.routes} />);
  //   return (props: any) => <route.component {...props} routes={route.routes} />;
  //   // return (props: any) => <div>1231321</div>;
  // }

  // public renRoute = (props: any) => {
  //   // return <route.component {...props} routes={route.routes} />;
  //   return <Index />;
  // }

  public render() {
    const { location } = this.props;
    return (
      <HashRouter>
        <Switch location={location}>
          <Route
            path='/'
            component={Index} />
          {/* {routes.map((route, i) => {
            console.log(route);
            return (
              <Route
                path={route.path}
                key={i}
                component={route.component}
              />
            );
          })} */}
        </Switch>
      </HashRouter>
    );
  }
}

export default Main;
