import React, { PropTypes } from 'react'
import { Router } from 'react-router'
import { Provider } from 'react-redux'

export default class AppContainer extends React.Component {
static propTypes = {
    history: PropTypes.object.isRequired,
    routes: PropTypes.object.isRequired,
    routerKey: PropTypes.number,
    store: PropTypes.object.isRequired
  }

  get devTools () {
    if (__DEBUG__) {
      if (__DEBUG_NEW_WINDOW__) {
        if (!window.devToolsExtension) {
          require('../redux/utils/createDevToolsWindow').default(this.props.store)
        } else {
          window.devToolsExtension.open()
        }
      } else if (!window.devToolsExtension) {
        const DevTools = require('containers/DevTools').default
        return <DevTools />
      }
    }
  }

  render () {
    const { history, routes, routerKey, store } = this.props
    return (
      <Provider store={this.props.store}>
        <Router history={history} children={routes} key={routerKey} />
      </Provider>
    )
  }
}
