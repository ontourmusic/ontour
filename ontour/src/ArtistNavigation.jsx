import React, { useState } from 'react'
import { createSearchParams, useNavigate } from 'react-router-dom'

function Navigation() {
  const [artistName, setName] = useState('')

  const navigate = useNavigate()
  const routeChange = (artist) => {
    navigate({
      pathname: '/artist',
      search: createSearchParams({
        artist: artistName,
      }).toString(),
    })
  }

  return (
    <nav id="artist-nav" className="navbar navbar-expand navbar-dark bg-dark">
      <div className="container">
        <a href="/">
          <img id="nav-logo" src="images/logo.png" alt="" />
        </a>
        {/* <div className="navsearch">
          <input id="input" type="text" className="form-control shadow-none" onChange={event => setName(event.target.value)} value={artistName} placeholder="Search for an artist or venue"/>
          <button className="btn btn-dark" onClick={routeChange}>
            <img src="images/search_icon.png" alt="..."/>
          </button>
        </div> */}
      </div>
    </nav>
  )
}

export default Navigation
