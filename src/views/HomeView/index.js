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
  }

  componentDidMount() {
    const self = this;
    AlbumModel
      .findOne({ "id": "1" })
      .then( album => AuthorModel
          .findOne({ "id": album.authorId })
          .then(author => ({ album, author }))
      )
      .then( data => SongModel
          .find({ "albumId": data.album.id })
          .then(songs => {
            return { ...data, songs }
          })
      )
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
      </div>
    );
  }
}

export default connect(
  ( state, props ) => ({
    count: state.counter.count
  })
)(HomeView)
