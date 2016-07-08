import ToolbarSearch from './ToolbarSearch';
import classnames from 'classnames';
import React from 'react';

export default class Toolbar extends React.Component {

  ACTIVE_SCROLL_POS = 100;

  constructor(props) {
    super(props);
    this.state = {
      active: false
    }
    this.handleScroll = this.handleScroll.bind(this)
    this.toggleActive = this.toggleActive.bind(this)
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.active != this.props.active) {
      if (nextProps.active) {
        window.addEventListener('scroll', this.handleScroll);
      } else {
        window.removeEventListener('scroll', this.handleScroll);
      }
      this.setState({ active: nextProps.active });
    }
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll() {
    if (event.srcElement.body.scrollTop > this.ACTIVE_SCROLL_POS) {
      if (!this.state.active)
        return  this.setState({ active: true })
    } else if (this.state.active) {
      return this.setState({ active: false })
    }
  }

  toggleActive(hasFocus) {
    if (document.body.scrollTop > this.ACTIVE_SCROLL_POS) {
      if (!this.state.active) {
        this.setState({ active: true })
      }
    } else {
      this.setState({ active: hasFocus })
    }
  }

  get className() {
    return classnames(
      "toolbar",
      {
        "toolbar-light": !!this.props.light,
        "toolbar-active": this.state.active
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
        <ToolbarSearch onFocusChange={ hasFocus => this.toggleActive( hasFocus ) }/>
      </header>
    );
  }
}
