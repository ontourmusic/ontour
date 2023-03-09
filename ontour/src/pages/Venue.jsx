import React from "react";
import "../index.css";
import "react-multi-carousel/lib/styles.css";
import ArtistHeader from "../components/ArtistHeader";
import Carousel from "../components/Carousel";
import WriteVenueReview from "../components/WriteVenueReview";
import { useSearchParams } from "react-router-dom";
import {useState, useEffect} from "react";
import ArtistNavigation from "../ArtistNavigation"
// Change to grid
import { Grid } from "@mui/material";
import ArtistContent from "../components/ArtistContent";
import artist_styles from "../Styles/artist_styles";
import SideContent from "../components/SideContent";
import Footer from "../components/Footer";

function Venue() {

  //gets the name from the artist that was searched for on the home page
  const [searchParams] = useSearchParams();
  const venueNameGet = searchParams.get("venue");
  const venueIDGlobal = searchParams.get("id");
  const venueName = venueNameGet.replace(/_/g, " ").replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
  console.log(venueIDGlobal);
  console.log(venueName);

  //set var names here
  const [venueData, setVenueData] = useState({
    venue_name: "",
    allReviews: [],
    venueIdNumber: 0,
  });

  const [venue_name, setVenueName] = useState("");
  const [allReviews, setAllReviews] = useState([]);
  const [venueIdNumber, setVenueIdNumber] = useState(0);
  const [aggregateRating, setAggregateRating] = useState(0);
  const [totalReviews, setTotalReviews] = useState(0);
  const [artistImage, setVenueImage] = useState("");
  const [ticketLink, setTicketLink] = useState("");
  const [imageArray, setImageArray] = useState([]);
  const [, updateState] = React.useState();
  const forceUpdate = React.useCallback(() => updateState({}), []);

  //gets the artist and review data from the database
  const performSearch = async () => {
    //const venueResponse = await fetch(`http://ec2-3-129-52-41.us-east-2.compute.amazonaws.com:8000/search_venue/${venueName}`, {mode: 'cors'});
    const venueResponse = await fetch(`http://18.188.104.212:8000/venue/${venueIDGlobal}`, {mode: 'cors'});
    const venueData = await venueResponse.json();
    console.log("VENUE DATA: ");
    console.log(venueData);
    console.log(venueData.data[0].name)
    setVenueName(venueData.data[0].name);
    const imageUrls = venueData.data[0].banner_image;
    setVenueImage(imageUrls);
    setVenueIdNumber(venueIDGlobal);
    const venueGallery = await fetch (`http://18.188.104.212:8000/venue_carousel_images/${venueIDGlobal}`)
    const venueGalleryData = await venueGallery.json();
    //initialize an empty array
    var imageGallery = [];
    //loop through the data and push the image urls into the array
    for (var i = 0; i < venueGalleryData.data.length; i++) {
      imageGallery.push(venueGalleryData.data[i].image_url);
    }
    setImageArray(imageGallery);


    //const getReviews = await fetch(`http://ec2-3-129-52-41.us-east-2.compute.amazonaws.com:8000/venue_reviews/${venueId}`, {mode: 'cors'});
    const getReviews = await fetch(`http://18.188.104.212:8000/venue_reviews/${venueIDGlobal}`);
    const reviewData = await getReviews.json();
    console.log("REVIEW DATA: ");
    console.log(reviewData);
    setAllReviews(parseReviewData(reviewData["data"]));

    const tmVenue = await fetch(`https://app.ticketmaster.com/discovery/v2/venues.json?apikey=GcUX3HW4Tr1bbGAHzBsQR2VRr2cPM0wx&keyword=kia+forum`);
    const tmVenueData = await tmVenue.json();
    var venueID = tmVenueData._embedded.venues[0].id;
    var venueURL = tmVenueData._embedded.venues[0].url;
    console.log(venueURL);
    setTicketLink(venueURL);
    const tmEvents = await fetch(`https://app.ticketmaster.com/discovery/v2/events.json?apikey=GcUX3HW4Tr1bbGAHzBsQR2VRr2cPM0wx&venueId=${venueID}` , { mode: 'cors' });
  }

  //performs the search when the page loads
  useEffect(() => {
    performSearch();
  }, [venueIDGlobal]);
  
  //parses the review data from the database
  function parseReviewData(reviewData) {
    var reviewsArray = [];
    var cumulativeRating = 0;
    for(var i = 0; i < reviewData.length; i++) {
      reviewsArray.push([
        reviewData[i].description,
        reviewData[i].rating,
        reviewData[i].name,
        reviewData[i].artistname,
        reviewData[i].date
      ]);

      cumulativeRating += reviewData[i].rating;
    }
    cumulativeRating = cumulativeRating / reviewData.length;
    setAggregateRating(cumulativeRating);
    setTotalReviews(reviewData.length);
    return reviewsArray;
  }

  const formChange = (event) => {
    //sort all reviews array by rating highest to lowest
    var tempArray = allReviews;
    if(event.target.value == 3) {
      tempArray.sort(function(a, b) {
        return b[1] > a[1] ? 1 : -1;
      });
    }
    //lowest to highest
    else if(event.target.value == 4) {
      tempArray.sort(function(a, b) {
        return a[1] > b[1] ? 1 : -1;
      });
    }
    //oldest to newest
    else if(event.target.value == 2) {
      tempArray.sort(function(a, b) {
        return new Date(b[4]) < new Date(a[4]) ? 1 : -1;
      });
    }
    //newest to oldest
    else if(event.target.value == 1) {
      tempArray.sort(function(a, b) {
        return new Date(a[4]) < new Date(b[4]) ? 1 : -1;
      });
    }
    setAllReviews(tempArray);
    forceUpdate();
  }

  return (
    <Grid container spacing={0}>
      <Grid item xs={12}>
        <ArtistNavigation />
      </Grid>
      <Grid item xs={12}>
        <ArtistHeader name={venue_name} rating={aggregateRating} total={totalReviews} image={artistImage} />
      </Grid>
      <Grid container spacing={1} style={artist_styles.grid.body_container}>
        <Grid item xs={12} md={8}>
          <Carousel images={imageArray} />
          <ArtistContent allReviews={allReviews} aggregateRating={aggregateRating} onFormChange={formChange} />
          {venue_name !== "" && <WriteVenueReview venueId={venueIdNumber} name={venue_name} />}
        </Grid>
        <Grid item xs={12} md={4}>
          <SideContent name={venue_name} linkPairs={[[ticketLink, "images/ticketmaster_icon.png"],]} />
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <hr id="artist-footer"></hr>
        <Footer />
      </Grid>
    </Grid>
  )
}
export default Venue;