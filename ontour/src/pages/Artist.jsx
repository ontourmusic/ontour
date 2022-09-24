import React from "react";
import '../index.css';
import "react-multi-carousel/lib/styles.css";
import ArtistHeader from "../components/ArtistHeader";
import ExternalLink from "../components/ExternalLink";
import Carousel from "../components/Carousel";
import UpcomingSchedule from "../components/UpcomingSchedule";
import PreviousSchedule from "../components/PreviousSchedule";
import Review from "../components/Review";
import WriteReview from "../components/WriteReview";

function Artist() {

  return (
    <>
      <div className="artist">
        <ArtistHeader name="Jack Harlow" rating="Rating *****"/>
        <div class= "d-flex justify-content-end">
          <ExternalLink mediaLink="https://open.spotify.com/artist/2LIk90788K0zvyj2JJVwkJ?si=ggKw9EM3QlePSkEkRB0o9g" iconLink="images/Spotify_icon.svg.png"/>
          <ExternalLink mediaLink="https://www.stubhub.com/jack-harlow-tickets/category/100275160/" iconLink="images/ticket_icon.png"/>
          <ExternalLink mediaLink="https://www.jackharlow.us" iconLink="images/store_icon.png"/>
        </div>
        
        <Carousel/>
        
        <UpcomingSchedule/>
        <PreviousSchedule/>
        
        <div class="container py-5">
          <h2 class="h3 font-weight-bold">Reviews</h2>
          <div class="list-group">
            <Review user="User A" date="9/6/2022" rating="Rating: * * * * * 5/5" text="I love Jack Harlow."/>
            <Review user="User B" date="9/5/2022" rating="Rating: * * * * * 5/5" text="FIRST CLASS"/>
            <Review user="User C" date="9/5/2022" rating="Rating: * * * * * 5/5" text="HE IS SO HOTTT."/>
          </div>
        </div>

        <WriteReview/>
      </div>
</>
  );
}
export default Artist;