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

function Artist() {

  //gets the name from the artist that was searched for on the home page
  const [searchParams] = useSearchParams();
  const artistName = searchParams.get("artist");

  //set var names here
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [fullName, setFullName] = useState("");
  const [allReviews, setAllReviews] = useState([]);
  const [artistIdNumber, setArtistIdNumber] = useState(0);
  const [aggregateRating, setAggregateRating] = useState(0);

  //gets the artist and review data from the database
  const performSearch = async () => {
    const artistResponse = await fetch(`http://localhost:8000/search_artist/${artistName}`);
    const artistData = await artistResponse.json();
    console.log(artistData);
    console.log(artistData[0].fname);
    setFname(artistData[0].fname);
    setLname(artistData[0].lname);
    setFullName(artistData[0].fname + " " + artistData[0].lname);
    console.log(fname);
    console.log(fullName);
    const artistId = artistData[0].artist_id;
    setArtistIdNumber(artistId);

    const getReviews = await fetch(`http://localhost:8000/reviews/${artistId}`);
    const reviewData = await getReviews.json();
    setAllReviews(parseReviewData(reviewData));
  }

  //performs the search when the page loads
  useEffect(() => {
    performSearch();
  }, []);
  
  //parses the review data from the database
  function parseReviewData(reviewData) {
    var reviewsArray = [];
    var cumulativeRating = 0;
    console.log(reviewData);
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
    console.log(cumulativeRating);
    setAggregateRating(cumulativeRating);
    return reviewsArray;
  }

  return (
    <>
      <ArtistNavigation/>
      <div className="artist" >
        <ArtistHeader name={fullName} rating={aggregateRating}/>

        <Sidebar/>

        <div class="no-sidebar">
          <Carousel/>
          
          <div class="container">
            <hr></hr>
            <h4 id="reviews" class="fw-bold">Reviews</h4>
            <div id="clear" class="list-group">
              {allReviews.map(function(review, index) {
                return <Review user={review[2]} date=" 9/6/2022" key={index} rating={review[1]} venue = "Barclays Center - Brooklyn, NY" text={review[0]}/>
              })}
            </div>
          </div>

          <WriteReview artistId={artistIdNumber}/>
        </div>

      </div>
</>
  );
}
export default Artist;