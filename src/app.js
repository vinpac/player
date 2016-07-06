import { Provider } from "react-redux";
import React from 'react'
import ReactDOM from 'react-dom'
import createBrowserHistory from 'history/lib/createBrowserHistory'
import { useRouterHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import AppContainer from './containers/AppContainer'
import createStore from './redux/createStore'

const browserHistory = useRouterHistory(createBrowserHistory)({
  basename: __BASENAME__
})

const initialState = window.__SV_DATA__
const store = createStore(initialState)
const routes = require('./routes/index').default(store)
const history = syncHistoryWithStore(browserHistory, store, {
  selectLocationState: (state) => state.router
})


ReactDOM.render(
  <AppContainer
      store={store}
      history={history}
      routes={routes}
    />,
  document.getElementById('root')
)

delete window.__SV_DATA__
