import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Main from './Pages/Main';
import Details from './Pages/Details';
import Repository from './Pages/Repository';

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Main} />
        <Route path="/details/:user" component={Details} />
        <Route path="/repositories/:repository" component={Repository} />
      </Switch>
    </BrowserRouter>
  );
}

//
