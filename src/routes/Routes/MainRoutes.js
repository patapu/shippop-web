import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import Error404 from '../../components/App/Error404'
import Home from '../Home'

export default function MainRoutes(props) {
  return <Switch>
    <Route
      exact
      path="/"
      component={Home}
    />
    <Route
      path="/home"
      component={Home}
    />
    <Route
      path="/"
      render={() => <Redirect to="/" />}
    />
  </Switch>
}