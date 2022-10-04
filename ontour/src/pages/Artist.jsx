import React from "react";
import "../index.css";
import "react-multi-carousel/lib/styles.css";
import ArtistHeader from "../components/ArtistHeader";
import ExternalLink from "../components/ExternalLink";
import Carousel from "../components/Carousel";
import UpcomingSchedule from "../components/UpcomingSchedule";
import PreviousSchedule from "../components/PreviousSchedule";
import Review from "../components/Review";
import WriteReview from "../components/WriteReview";
import Sidebar from "../components/Sidebar";
import { useSearchParams } from 'react-router-dom';
import {useState, useEffect} from 'react';

function Artist() {

  const [searchParams] = useSearchParams();
  const artistName = searchParams.get("artist");
  console.log('value is:', searchParams.get("artist"));

  //set var names here
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [fullName, setFullName] = useState("");

  const performSearch = async () => {
    const artistResponse = await fetch(`http://localhost:8000/search_artist/${artistName}`);
    const artistData = await artistResponse.json();
    console.log(artistData);
    setFname(artistData[0].fname);
    setLname(artistData[0].lname);
    setFullName(fname + " " + lname);
    const artistId = artistData[0].artist_id;

    const getReviews = await fetch("http://localhost:8000/reviews/1");
    const reviewData = await getReviews.json();
    console.log(reviewData);
  }

  useEffect(() => {
    performSearch();
  }, [fname]);
  
  const fetchData = async () => {
    const response = await fetch("http://localhost:8000/reviews/1")
    const data = await response.json();
    console.log(data);
  }

  const fetchSpotify = async () => {
    const response = await fetch("https://api.spotify.com/v1/search?q=Jack%20Harlow&type=artist");
  }

  return (
    <>
      <div className="artist" >
        <ArtistHeader name={fullName} rating="4.5"/>

        <Sidebar/>

        <div class="no-sidebar">
          <Carousel/>
          
          <div class="container py-5">
            <h4 class="fw-bold">Reviews</h4>
            <div class="list-group">
              <Review user="User A" date=" 9/6/2022 " rating={5} venue = "Barclays Center - Brooklyn, NY" text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."/>
              <Review user="User B" date=" 9/5/2022 " rating={4} venue = "Barclays Center - Brooklyn, NY" text="Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?"/>
              <Review user="User C" date=" 9/5/2022 " rating={3} venue = "Barclays Center - Brooklyn, NY" text="But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure?"/>
            </div>
          </div>

          <WriteReview/>
        </div>

      </div>
</>
  );
}
export default Artist;