import classNames from 'classnames';
import ServerApi from '../../services/ServerApi';
import React, { PropTypes } from 'react';
import { connect } from "react-redux";
//import ImageCover from './image.png';
//import ImageCoverBG from '../../static/img/cover-bg.jpg';
import { AuthorModel, AlbumModel, SongModel } from '../../services/Models';

class HomeView extends React.Component {
  static propTypes = {
    name: React.PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this)
    this.state = {}
    this.getAlbum = this.getAlbum.bind(this);
  }

  componentDidMount() {
    this.getAlbum(this.props.params.id)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.params.id != this.props.params.id) {
      this.getAlbum(nextProps.params.id);
    }
  }

  getAlbum(id) {
    const self = this;
    ServerApi
      .getAlbumById(id)
      .then( data => {
        let length = 0;
        data.songs.forEach( song => length += song.length )

        self.setState({ ...data, duration: length });
      })
      .catch(err => {
        console.error(err)
      })
  }

  onClick() {
    this.props.dispatch({
      type: "ADD"
    })
  }

  renderSong(song, i) {
    return (
      <tr className="song" key={ song.id }>
        <td>{ i + 1 }</td>
        <td>{ song.title }</td>
        <td className="song-length">{ song.length }</td>
        <td className="song-popularity">
          {[1,2,3,4,5].map( n => <i key={n} className={ classNames("fa fa-circle", { "active": song.popularity >= n } ) }></i> )}
        </td>
        <td><button className="btn btn-primary btn-sm fill-width">R$3,19</button></td>
      </tr>
    )
  }

  render() {

    const { album, author, songs, duration } = this.state;
    if (!album || !author) return ( <div className="home-view">Loading...</div>);

    let coverBGStyle = "";
    if (album.cover.color) coverBGStyle = `background-color: ${ album.cover.color ||  album.color  }`;

    if (album.cover.image) coverBGStyle += `; background-image: url(${ album.cover.image })`;


    return (
      <div className="home-view">
        <style>
        {
          `
            .home-view .cover {
              background-color: ${ album.color }
            }

            .toolbar-search-ative {
              background-color: ${ album.color }
            }

            .home-view .cover-bg {
              ${ coverBGStyle }
            }

            .home-view .cover-bg:after {
              background: ${ album.color };
              background: linear-gradient(rgba(255,255,255,0), ${ album.color });
            }

            .btn-light {
              color: ${ album.color }
            }

            .toolbar .toolbar-search > i.fa-search {
              color: ${ album.color }
            }

            .toolbar .toolbar-search > input {
              color: ${ album.color }
            }
          `
        }
        </style>
        <div className="cover">
          <div className="cover-bg" />
          <div className="cover-content container">
            <div className="cover-header">
              <div className="cover-box">
                <div className="cover-card card" style={{"backgroundImage": "url(" + album.image + ")"}}>
                </div>
                <div className="cover-box-buttons row row-sm">
                  <div className="col-xs-9">
                    <button className="btn btn-bordered fill-width">Adicionar à playlist</button>
                  </div>
                  <div className="col-xs-3">
                    <button className="btn btn-light fill-width"><i className="fa fa-bookmark-o"></i></button>
                  </div>
                </div>
              </div>
              <div className="cover-info">
                <span className="subtitle">{ author.name }</span>
                <h1 className="title">{ album.title }</h1>
                <span className="subtitle">{ album.genre }</span>
                <span className="subtitle margin-left-lg">{ songs.length } Songs</span>
                { songs.length != 0
                  ? <span className="subtitle margin-left-lg">{ Math.round(duration / 60) } min</span>
                  : null
                }
                <p className="text text-light">{ album.description }</p>
                <div className="cover-info-buttons">
                  <button className="btn btn-light btn-wide "><i className="fa fa-play margin-right"></i> Play</button>
                </div>
              </div>
            </div>
            <ul className="cover-tabs container-fluid">
              <li className="active">
                <a href="">Overview</a>
              </li>
              <li>
                <a href="">Related Artists</a>
              </li>
              <li>
                <a href="">About</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="tab-content">
          <div className="songs">
            <div className="container">
              <table className="songs-table">
                <tbody>
                  <tr className="table-header">
                    <th width="60"></th>
                    <th>Music</th>
                    <th className="song-length"><i className="fa fa-clock-o"></i></th>
                    <th>Popularity</th>
                    <th width="100"></th>
                  </tr>
                  { songs.map( this.renderSong ) }
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  ( state, props ) => ({
    count: state.counter.count
  })
)(HomeView)
