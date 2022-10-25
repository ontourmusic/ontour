import React from "react";
import "../index.css";
import UpcomingSchedule from "./UpcomingSchedule";
import ExternalLink from "./ExternalLink";

export default function Sidebar(props)
{
    return(
        <div class= "sidebar">
          <a href="#review">
            <button id="writebutton" type="button" class="btn btn-dark fw-bold">
              <div class="row">
                <div class="col-md-3">
                  <img id="review-icon" src="../../images/review.png" alt=""></img>
                </div>
                <div id="write-a-review" class="d-none d-md-block col-md-9">
                  Write a Review
                </div>
              </div>
            </button>
          </a>
          <div class="row justify-content-center">
            <ExternalLink mediaLink="https://open.spotify.com/artist/2LIk90788K0zvyj2JJVwkJ?si=ggKw9EM3QlePSkEkRB0o9g" iconLink="images/spotify_icon.png"/>
            <ExternalLink mediaLink="https://www.stubhub.com/jack-harlow-tickets/category/100275160/" iconLink="images/ticket_icon.png"/>
            <ExternalLink mediaLink="https://www.jackharlow.us" iconLink="images/store_icon.png"/>
          </div>
          <UpcomingSchedule name={props.name}/>
          <a href="#">
            <img id="arrow" class="mt-4" src="../../images/arrow.png" alt=""></img>
          </a>
        </div>
    );
}
