import { Link } from 'react-router';
import Spinner from '../styles/elements/Spinner';
import Image from '../views/HomeView/image.png';
import ServerApi from '../services/ServerApi';
import React from 'react';

let timeout;
export default class ToolbarSearch extends React.Component {
  static propTypes = {
    name: React.PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.state = {
      items: [],
      loading: false,
    }
    this.onChange = this.onChange.bind(this)
    this.onFocus = this.onFocus.bind(this)
    this.renderAlbum = this.renderAlbum.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.close = this.close.bind(this)
  }

  componentDidMount() {
    this.search();
  }

  search(value) {
    const self = this;

    if (!this.state.loading) {
      this.setState({
        loading: true
      })
    }

    ServerApi
      .search(value)
      .then(results => {
        console.log(results)
        self.setState({
          items: results,
          loading: false
        });
      })
  }

  onChange(evt) {
    const self = this;
    const value = evt.target.value;
    clearTimeout(timeout);
    if (!this.state.loading) {
      this.setState({
        loading: true
      })
    }

    timeout = setTimeout(() => {
      self.search(value);
    }, 200)
  }

  renderAlbum(album) {
    return (
      <li key={ album.id }>
        <Link to={"/" + album.id } onClick={ this.close }>
          <span className="image" style={{ backgroundImage: `url(${ album.image })` }}></span>
          <div className="toolbar-search-item-text">
            <span className="text-md">{ album.title }</span>
            <span className="legend">{ album.author_name }</span>
          </div>
        </Link>
      </li>
    )
  }

  onFocus() {
    if (this.state.focus) return;
    this.setState({ focus: true })

    if (this.props.onFocusChange)
      this.props.onFocusChange(true)
  }

  onBlur(evt) {

    const self = this;
    this.setState({ focus: false })
    if (self.props.onFocusChange){
      self.props.onFocusChange(false)
    }
  }

  onSubmit() {
    this.search( this.refs.input.value );
  }

  close() {
    this.setState({ focus: false })
    if (this.props.onFocusChange){
      this.props.onFocusChange(false)
    }
  }

  render() {
    const { items, loading, focus } = this.state;

    return (
      <div className="toolbar-search">
        <input ref="input" type="text" onChange={ this.onChange } onFocus={ this.onFocus } spellCheck="false" defaultValue="Panda" placeholder="Panda" />
        <i className="fa fa-search" onClick={ this.onSubmit }></i>
        { focus && !loading ?
          <div className="toolbar-search-dropdown">
            { !items.length
              ? <div className="toolbar-search-item text-md">Nenhum Album encontrado</div>
              : <ul className="list">
                  { items.map( this.renderAlbum ) }
                </ul>
            }
          </div> : null
        }
        { focus ?
          <div className="toolbar-search-modal" onClick={ this.close }>
            { loading ? <Spinner light/> : null }
          </div>
          : null
        }

      </div>
    );
  }
}
