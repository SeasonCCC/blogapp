import React from 'react';
import ReactDOM from 'react-dom';
import {
  HashRouter, Route, Switch, Redirect, RouteComponentProps,
} from 'react-router-dom';

import './index.scss';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import { Provider } from 'mobx-react';
import userStore from './store/userStore';

import routesSetting from './router/router';
// import * as serviceWorker from './serviceWorker';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
});


ReactDOM.render(
  <ApolloProvider client={client}>
    <Provider userStore={userStore}>
      <HashRouter>
        <Switch>
          {routesSetting.map((route: IRoute): JSX.Element => {
            const Component = (
              props: RouteComponentProps,
            // eslint-disable-next-line react/jsx-props-no-spreading
            ): JSX.Element => (<route.component {...props} routes={route.routes} />);

            return (
              <Route
                path={route.path}
                key={route.path}
                exact={route.path === '/login'}
            // component={route.component}
                render={Component}
              />
            );
          })}
          <Redirect to="/login" />
        </Switch>
      </HashRouter>
    </Provider>
  </ApolloProvider>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
