import ToolbarSearch from './ToolbarSearch';
import classnames from 'classnames';
import React from 'react';

export default class Toolbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchActive: false
    }
  }

  get className() {
    return classnames(
      "toolbar",
      {
        "toolbar-light": !!this.props.light,
        "toolbar-search-ative": this.state.searchActive
      },
      this.props.className
    );
  }

  render() {
    return (
      <header
        className={ this.className }>
        <div className="toolbar-header">
          <button className="toolbar-btn toolbar-btn-icon">
            <i className="fa fa-bars"></i>
          </button>
          <a href="" className="logo">
            <span>Play</span>
            <span>Music</span>
          </a>
        </div>
        <ToolbarSearch onFocusChange={ hasFocus => this.setState({ searchActive: hasFocus })}/>
      </header>
    );
  }
}
