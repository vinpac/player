import Player from '../../components/Player';
import Toolbar from '../../components/Toolbar';
import React, { PropTypes } from 'react'
import core from "../../styles/core.scss";

// stateless function
// WILL NOT hot reload
function CoreLayout ({ children }) {
  return (
    <div className='page-container'>
      <Toolbar />
      <Player />
      <div className='view-container'>
        {children}
      </div>
    </div>
  )
}


export default CoreLayout
