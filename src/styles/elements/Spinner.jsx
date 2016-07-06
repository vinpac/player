import classNames from 'classnames';
import React from 'react';

export default class Spinner extends React.Component {

  get className() {
    return classNames(
      "spinner",
      {
        "spinner-light": !!this.props.light
      },
      this.props.className
    )
  }

  render() {
    return (
      <svg className={ this.className } width="48px" height="48px" viewBox="0 0 66 66" >
        <circle className="path" fill="none" strokeWidth="6" strokeLinecap="round" cx="33" cy="33" r="30"></circle>
      </svg>
    );
  }
}
