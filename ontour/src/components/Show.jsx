import React from 'react'
import '../index.css'

export default function Show(props) {
  return (
    // <a href="#">
    <div id="show-row" className="row justify-content-center py-3 show">
      <div className="col-12 col-md-4 align-self-center">
        <div className="fw-bold schedule-font">{props.date}</div>
        <div className="schedule-subfont">{props.time}</div>
      </div>
      <div className="d-none d-md-block col-md-7 show-location align-self-center">
        <div className="fw-bold schedule-font">{props.event}</div>
        <div className="schedule-subfont">{props.location}</div>
      </div>
      <div className="d-none d-xl-block col-xl-1 align-self-center">•</div>
    </div>
    // </a>
  )
}
