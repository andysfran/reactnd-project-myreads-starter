import React from 'react'
import { Switch, Route } from 'react-router-dom'

import AppIndex from './AppIndex'
import Search from './Search'

export default () => (
  <Switch>
    <Route exact path="/" component={AppIndex} />
    <Route exact path="/search" component={Search} />
  </Switch>
);
