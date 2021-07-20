import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Error404 from '../../components/App/Error404'
import Home from '../Home'

export default function GuestRoutes(props) {
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
    <Route path="/" component={Error404} />
  </Switch>
}