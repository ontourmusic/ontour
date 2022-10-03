import React from "react";
import "../index.css";
import UpcomingSchedule from "./UpcomingSchedule";
import ExternalLink from "./ExternalLink";
import handleClick from "../pages/Artist"

export default function Sidebar(props)
{
    return(
        <div class= "sidebar py-5">
          <div>
          <a href="#review">
            <button id="writebutton" type="button" class="btn btn-dark fw-bold" onClick={handleClick}>Write a Review</button>
          </a>
        </div>
          <ExternalLink mediaLink="https://open.spotify.com/artist/2LIk90788K0zvyj2JJVwkJ?si=ggKw9EM3QlePSkEkRB0o9g" iconLink="images/Spotify_icon.svg.png"/>
          <ExternalLink mediaLink="https://www.stubhub.com/jack-harlow-tickets/category/100275160/" iconLink="images/ticket_icon.png"/>
          <ExternalLink mediaLink="https://www.jackharlow.us" iconLink="images/store_icon.png"/>
          <UpcomingSchedule/>
        </div>
    );
}