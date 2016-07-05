import { Provider } from "react-redux";
import React from 'react'
import ReactDOM from 'react-dom'
import Root from './containers/Root'
import configureStore from './redux/configureStore'

const initialState = window.__SV_DATA__
const store = configureStore(initialState)

ReactDOM.render(
  <Root store={store}/>,
  document.getElementById('root')
)

delete window.__SV_DATA__
