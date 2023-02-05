import React from 'react'
import '../index.css'
import UpcomingSchedule from './UpcomingSchedule'
import ExternalLink from './ExternalLink'

export default function Sidebar(props) {
  // console.log(props.spotify);
  return (
    <div className="sidebar d-none d-sm-block">
      <a href="#review">
        <button id="writebutton" type="button" className="btn btn-dark fw-bold">
          <div className="row">
            <div className="col-md-3">
              <img id="review-icon" src="../../images/review.png" alt=""></img>
            </div>
            <div id="write-a-review" className="d-none d-md-block col-md-9">
              Write a Review
            </div>
          </div>
        </button>
      </a>
      <div className="row justify-content-center">
        <ExternalLink mediaLink={props.spotify} iconLink="images/spotify_icon.png" />
        <ExternalLink mediaLink={props.tickets} iconLink="images/ticketmaster_icon.png" />
      </div>
      <UpcomingSchedule name={props.name} />
      {/* <a href="#">
            <img id="arrow" src="../../images/arrow.png" alt=""></img>
          </a> */}
    </div>
  )
}
