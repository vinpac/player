import React from 'react'
import { Route, IndexRoute } from 'react-router'

// Layouts
import CoreLayout from '../layouts/CoreLayout';

// Views
import HomeView from '../views/HomeView';

export default store => (
  <Route path='/' component={CoreLayout}>
    <Route path=":id" component={ HomeView } />
  </Route>
)
