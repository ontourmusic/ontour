import React from "react";
import "../index.css";
import "react-multi-carousel/lib/styles.css";
import ArtistHeader from "../components/ArtistHeader";
import Carousel from "../components/Carousel";
import Review from "../components/Review";
import WriteReview from "../components/WriteReview";
import Sidebar from "../components/Sidebar";
import { useSearchParams } from "react-router-dom";
import {useState, useEffect} from "react";
import ArtistNavigation from "../ArtistNavigation"
import Footer from "../components/Footer"

function Artist() {

  //gets the name from the artist that was searched for on the home page
  const [searchParams] = useSearchParams();
  const artistName = searchParams.get("artist");

  //set var names here
  const [fullName, setFullName] = useState("");
  const [allReviews, setAllReviews] = useState([]);
  const [artistIdNumber, setArtistIdNumber] = useState(0);
  const [aggregateRating, setAggregateRating] = useState(0);
  const [artistImage, setArtistImage] = useState("");

  //gets the artist and review data from the database
  const performSearch = async () => {
    const artistResponse = await fetch(`http://localhost:8000/search_artist/${artistName}`);
    const artistData = await artistResponse.json();
    setFullName(artistData[0].fname + " " + artistData[0].lname);
    const artistId = artistData[0].artist_id;
    const imageUrls = artistData[0].image_url;
    // console.log(imageUrls);
    setArtistImage(imageUrls);
    setArtistIdNumber(artistId);

    const getReviews = await fetch(`http://localhost:8000/reviews/${artistId}`);
    const reviewData = await getReviews.json();
    setAllReviews(parseReviewData(reviewData));

    //gets the tickemaster artist details 
    // const tmArtist = await fetch(`https://app.ticketmaster.com/discovery/v2/attractions.json?apikey=NwphXHPsTvSzPp0XwvUNdp3vyzE3vEww&keyword=${artistName}`);
    // const tmData = await tmArtist.json();
    // console.log(tmData);

 

    // const eventDetails = await fetch(`https://app.ticketmaster.com/discovery/v2/events/rZ7HnEZ1A3pFp4.json?apikey=NwphXHPsTvSzPp0XwvUNdp3vyzE3vEww`)
    // const eventDetailsData = await eventDetails.json();
    // console.log(eventDetailsData);
  }

  //performs the search when the page loads
  useEffect(() => {
    performSearch();
  }, []);
  
  //parses the review data from the database
  function parseReviewData(reviewData) {
    var reviewsArray = [];
    var cumulativeRating = 0;
    for(var i = 0; i < reviewData.length; i++) {
      var review = [];
      var rDescription = reviewData[i].description;
      var rRating = reviewData[i].rating;
      var reviewFname = reviewData[i].fname;
      var reviewLname = reviewData[i].lname;
      var reviewFullName = reviewFname + " " + reviewLname;
      var reviewEvent = reviewData[i].eventname;
      review.push(rDescription);
      review.push(rRating);
      review.push(reviewFullName);
      review.push(reviewEvent);
      reviewsArray.push(review);
      cumulativeRating += rRating;
    }
    cumulativeRating = cumulativeRating / reviewData.length;
    setAggregateRating(cumulativeRating);
    return reviewsArray;
  }

  return (
    <>
      <ArtistNavigation/>

      <div className="artist" >
        <aside>
        <ArtistHeader name={fullName} rating={aggregateRating} image={artistImage}/>

        <Sidebar name={fullName}/>

        <div class="no-sidebar">
          <Carousel/>
          <div class="container">
            <hr></hr>
            <h4 id="reviews" class="fw-bold">Reviews</h4>
            <div id="clear" class="list-group">
              {allReviews.map(function(review, index) {
                return <Review user={review[2]} date=" 9/6/2022" key={index} rating={review[1]} venue = {review[3]} text={review[0]}/>
              })}
            </div>
            </div>

            <WriteReview artistId={artistIdNumber}/>
          </div>
        </aside>

        <hr class="home-footer"></hr>
        <Footer/>
      </div>
</>
  );
}
export default Artist;