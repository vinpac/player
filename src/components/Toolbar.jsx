import classnames from 'classnames';
import React from 'react';

export default class Toolbar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <header className={ classnames("toolbar", {
        "toolbar-light": !!this.props.light
      }) }>
        <div className="toolbar-header">
          <button className="toolbar-btn toolbar-btn-icon">
            <i className="fa fa-bars"></i>
          </button>
          <a href="" className="logo">
            <span>Play</span>
            <span>Music</span>
          </a>
        </div>
        <div className="toolbar-search ">
           <input type="text" defaultValue="The revenant" spellCheck="false" placeholder="The revenant" />
           <i className="fa fa-search"></i>
        </div>
      </header>
    );
  }
}
