import HomeView from "../views/HomeView";
import React, { PropTypes } from 'react'
import { Provider } from 'react-redux'
import CoreLayout from "../layouts/CoreLayout";

export default class Root extends React.Component {
  static propTypes = {
    store: PropTypes.object.isRequired
  };

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
    return (
      <Provider store={this.props.store}>
        <CoreLayout>
          <HomeView />
          {this.devTools}
        </CoreLayout>
      </Provider>
    )
  }
}
