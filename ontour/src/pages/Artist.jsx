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
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';
import Form from 'react-bootstrap/Form';

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
  const [sortOption, setSortOption] = useState(0);
  const [reviews, setReviews] = useState([]);
  const [spotifyLink, setSpotifyLink] = useState("");
  const [ticketLink, setTicketLink] = useState("");
  const [imageArray, setImageArray] = useState([]);

  //gets the artist and review data from the database
  const performSearch = async () => {
    const artistResponse = await fetch(`http://localhost:8000/search_artist/${artistName}`);
    const artistData = await artistResponse.json();
    console.log(artistData);
    setFullName(artistData[0].fname + " " + artistData[0].lname);
    const artistId = artistData[0].artist_id;
    const imageUrls = artistData[0].image_url;
    setArtistImage(imageUrls);
    setArtistIdNumber(artistId);
    const imageGallery = artistData[0].images;
    setImageArray(imageGallery);

    const getReviews = await fetch(`http://ec2-3-17-148-99.us-east-2.compute.amazonaws.com:8000/reviews/${artistId}`);
    const reviewData = await getReviews.json();
    setAllReviews(parseReviewData(reviewData));

    //gets the tickemaster artist details 
    const tmArtist = await fetch(`https://app.ticketmaster.com/discovery/v2/attractions.json?apikey=NwphXHPsTvSzPp0XwvUNdp3vyzE3vEww&keyword=${artistName}`);
    const tmData = await tmArtist.json();
    console.log(tmData);
    var spotify = tmData._embedded.attractions[0].externalLinks.spotify[0].url;
    var tickets = tmData._embedded.attractions[0].url;
    setTicketLink(tickets);
    setSpotifyLink(spotify);
  }

  //performs the search when the page loads
  useEffect(() => {
    performSearch();
  }, [artistName]);
  
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
      var date = reviewData[i].date;
      review.push(rDescription);
      review.push(rRating);
      review.push(reviewFullName);
      review.push(reviewEvent);
      review.push(date);
      reviewsArray.push(review);
      cumulativeRating += rRating;
    }
    cumulativeRating = cumulativeRating / reviewData.length;
    setAggregateRating(cumulativeRating);
    return reviewsArray;
  }

  const formChange = (event) => {
    setSortOption(event.target.value);
    //sort all reviews array by rating highest to lowest
    if(event.target.value == 3) {
      allReviews.sort(function(a, b) {
        return b[1] > a[1];
      });
    }
    //lowest to highest
    else if(event.target.value == 4) {
      allReviews.sort(function(a, b) {
        return a[1] > b[1];
      });
    }
    //oldest to newest
    else if(event.target.value == 2) {
      allReviews.sort(function(a, b) {
        return new Date(b[4]) < new Date(a[4]);
      });
    }
    //newest to oldest
    else if(event.target.value == 1) {
      allReviews.sort(function(a, b) {
        return new Date(a[4]) < new Date(b[4]);
      });
    }
  }


  return (
    <>
      <ArtistNavigation/>
      <div className="artist" >
        <aside>
          <ArtistHeader name={fullName} rating={aggregateRating} image={artistImage}/>
          <Sidebar name={fullName} spotify={spotifyLink} tickets={ticketLink}/>

          <div class="no-sidebar">
            <Carousel images={imageArray}/>
            
            <div class="container">
              <hr></hr>
              <h4 id="reviews" class="fw-bold">Reviews</h4>
              {allReviews.length > 0 &&
              <div id="clear">
                <div class="row pb-4">
                  <div class="col-12 col-sm-9 align-self-center">
                    <div class="rating fw-bold">
                      Overall Rating: {aggregateRating.toFixed(1)} out of 5
                    </div>
                    <div class="rating">
                      <Rating
                            name="text-feedback"
                            value={aggregateRating}
                            size = "large"
                            readOnly
                            precision={0.01}
                            emptyIcon={<StarIcon style={{ opacity: 1 }} fontSize="inherit"/>}
                      />
                    </div>
                  </div>

                  <div class="col-12 col-sm-3 pt-5">
                    <div class="dropdown">
                      <Form.Select onChange={formChange} aria-label="Default select example">
                          <option>Recommended</option>
                          <option value="1">Newest First</option>
                          <option value="2">Oldest First</option>
                          <option value="3">Highest Rated</option>
                          <option value="4">Lowest Rated</option>
                      </Form.Select>
                    </div>
                  </div>
                </div>

                <div class="list-group">
                  {allReviews.map(function(review, index) {
                    return <Review user={review[2]} date={review[4]} key={index} rating={review[1]} venue = {review[3]} text={review[0]}/>
                  })}
                </div>
              </div>
              }
              {/* <a>See More</a> */}
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