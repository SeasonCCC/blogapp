import React from 'react';
import ReactDOM from 'react-dom';
import {
  HashRouter, Route, Switch, Redirect,
} from 'react-router-dom';

import './index.scss';
import routes from './router/router';

// import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <HashRouter>
    <Switch>
      {routes.map((route): JSX.Element => (
        <Route
          path={route.path}
          key={route.path}
          exact={route.path === '/login'}
          render={route.component}
        />
      ))}
      <Redirect to="/login" />
    </Switch>
  </HashRouter>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
