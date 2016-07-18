import React from 'react';
import PandaImage from '../static/img/panda.jpg';

const color = "#F73C45";
export default class Player extends React.Component {
  static propTypes = {
    name: React.PropTypes.string,
  };

  constructor(props) {
    super(props);
  }

  test() {
    SC.initialize({
      client_id: 'b096d3e942b0519f72e3b77c5418138e'
    });

    // stream track id 293
    SC.stream('/tracks/237603952').then(function(player){
      try {
        console.log(player);
        player.setVolume(.0)
        player.on('time', (a) => {
          console.log(player.currentTime());
        })
        //player.play();
      } catch(e) {
        console.error(e)
      }


    });
  }

  render() {
    return (
      <div className="player">
        <div className="player-cover" style={{ backgroundImage: "url(" + PandaImage + ")"}}></div>
        <div className="player-content">
          <div className="trackbar">
            <div className="content">
              <div className="trackbar-time" style={{ background: color }}></div>
              <div className="trackbar-buffered"></div>
            </div>
          </div>
          <div className="current-track">
            <a className="text-md text-link">Panda</a>
            <a className="text-link legend">Desiigner</a>
          </div>
          <div className="buttons">
            <button className="player-button">
              <i className="fa fa-step-backward"></i>
            </button>
            <button className="player-button player-play-button">
              <i className="fa fa-play"></i>
            </button>
            <button className="player-button">
              <i className="fa fa-step-forward"></i>
            </button>
          </div>
          <div className="flex-fill"></div>
          <div className="volume"></div>
          <div className="track-time">
            <p className="no-margin text-md">1:18 / 3:28</p>
          </div>
        </div>
      </div>
    );
  }
}
