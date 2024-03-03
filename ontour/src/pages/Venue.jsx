import React from "react";
import "../index.css";
import "react-multi-carousel/lib/styles.css";
import ArtistHeader from "../components/ArtistHeader";
import WriteVenueReview from "../components/WriteVenueReview";
import { useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import ArtistNavigation from "../ArtistNavigation";
// Change to grid
import { Grid } from "@mui/material";
import ArtistContent from "../components/ArtistContent";
import artist_styles from "../Styles/artist_styles";
import SideContent from "../components/SideContent";
import Footer from "../components/Footer";
import { createClient } from "@supabase/supabase-js";
import ImageCarousel from "../components/ImageCarousel";
import Fuse from "fuse.js";
import common_styles from "../Styles/common_styles";
import { Helmet } from "react-helmet";

const window_breakpoints = common_styles.window_breakpoints;

function Venue() {
  //gets the name from the artist that was searched for on the home page
  const [searchParams] = useSearchParams();
  const venueNameGet = searchParams.get("venue");
  const venueIDGlobal = searchParams.get("id");
  const venueName = venueNameGet
    .replace(/_/g, " ")
    .replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  const supabase = createClient(
    "https://zouczoaamusrlkkuoppu.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpvdWN6b2FhbXVzcmxra3VvcHB1Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY3ODE1ODUyMSwiZXhwIjoxOTkzNzM0NTIxfQ.LTuL_u0tzmsj8Zf9m6JXN4JivwLq1aRXvU2YN-nDLCo"
  );

  //set var names here
  const [venueData, setVenueData] = useState({
    venue_name: "",
    allReviews: [],
    venueIdNumber: 0,
  });

  const [venue_name, setVenueName] = useState("");
  const [allReviews, setAllReviews] = useState([]);
  const [filteredReviews, setFilteredReviews] = useState([]);
  const [venueIdNumber, setVenueIdNumber] = useState(0);
  const [venueCity, setVenueCity] = useState("");
  const [aggregateRating, setAggregateRating] = useState(0);
  const [totalReviews, setTotalReviews] = useState(0);
  const [artistImage, setVenueImage] = useState("");
  const [ticketLink, setTicketLink] = useState("");
  const [imageArray, setImageArray] = useState([]);
  const [videoArray, setVideoArray] = useState([]);
  const [, updateState] = React.useState();
  const forceUpdate = React.useCallback(() => updateState({}), []);
  const [showResults, setShowResults] = useState(false);
  const [verified, setVerified] = useState(false);
  const [adminLoggedIn, setAdminLoggedIn] = useState(false);
  const [originalBannerImage,setOriginalBannerImg] = useState("");
  const handleAdminLoggedIn = () => {
    setAdminLoggedIn(true);
}
  const [websiteLink, setWebsiteLink] = useState("");
  const [instaLink, setInstaLink] = useState("");

  const searchReviews = (searchTerm) => {
    const options = {
      keys: ["review", "event"],
      minMatchCharLength: 3,
    };
    const fuse = new Fuse(filteredReviews, options);
    const results = fuse.search(searchTerm);
    setFilteredReviews(
      results.map((result) => {
        return result.item;
      })
    );
    setShowResults(true);
  };

  const clearSearch = () => {
    setShowResults(false);
    setFilteredReviews(allReviews);
  };

  //gets the artist and review data from the database
  const performSearch = async () => {
    try {
      const venueData = await supabase
        .from("venues")
        .select("*")
        .eq("venue_id", venueIDGlobal);
      setVenueName(venueData.data[0].name);
      const imageUrls = venueData.data[0].banner_image;
      var city = venueData.data[0].city;
      var state = venueData.data[0].state;
      var cityState = city + ", " + state;
      setVenueCity(cityState);
      setVenueImage(imageUrls);
      setVenueIdNumber(venueIDGlobal);
      setVerified(venueData.data[0]["verified"]);
      let bannerImage = venueData.data[0].cropped_image || venueData.data[0].banner_image;
      bannerImage+="?dts=" + new Date().getTime();
      setVenueImage(bannerImage);
      setOriginalBannerImg(venueData.data[0].banner_image);
      setWebsiteLink(venueData.data[0]["website_link"]);
      setInstaLink(venueData.data[0]["instagram_link"]);

      const venueGalleryData = await supabase
        .from("venue_carousel_images")
        .select("*")
        .eq("venue_id", venueIDGlobal);
      //initialize an empty array
      var imageGallery = [];
      //loop through the data and push the image urls into the array
      for (var i = 0; i < venueGalleryData.data.length; i++) {
        imageGallery.push(venueGalleryData.data[i].image_url);
      }
      var videoArray = [];
      for (var i = 0; i < venueGalleryData.data.length; i++) {
        console.log(venueGalleryData.data[i].video_url);
        videoArray.push(venueGalleryData.data[i].video_url);
      }
      setImageArray(imageGallery);
      setVideoArray(videoArray);
      console.log(imageArray);
      const reviewData = await supabase
        .from("venue_reviews")
        .select("*")
        .eq("venue_id", venueIDGlobal);

      setAllReviews(parseReviewData(reviewData["data"]));
      setFilteredReviews(parseReviewData(reviewData["data"]));

      const tmVenue = await fetch(
        `https://app.ticketmaster.com/discovery/v2/venues.json?apikey=GcUX3HW4Tr1bbGAHzBsQR2VRr2cPM0wx&keyword=kia+forum`
      );
      const tmVenueData = await tmVenue.json();
      var venueID = tmVenueData._embedded.venues[0].id;
      var venueURL = tmVenueData._embedded.venues[0].url;

      setTicketLink(venueURL);
      const tmEvents = await fetch(
        `https://app.ticketmaster.com/discovery/v2/events.json?apikey=GcUX3HW4Tr1bbGAHzBsQR2VRr2cPM0wx&venueId=${venueID}`,
        { mode: "cors" }
      );
    } catch {
      console.log("Webpage error. Please reload the page.");
    }
  };

  //performs the search when the page loads
  useEffect(() => {
    performSearch();
  }, [venueIDGlobal]);

  //parses the review data from the database
  function parseReviewData(reviewData) {
    var reviewsArray = [];
    var cumulativeRating = 0;
    for (var i = 0; i < reviewData.length; i++) {
      reviewsArray.push({
        id: reviewData[i].id, // review id
        review: reviewData[i].review, // review description
        rating: reviewData[i].rating, // review rating
        name: reviewData[i].name, // review author
        artist: reviewData[i].artist, // review event
        eventDate: reviewData[i].eventDate, // review date
        likeCount: reviewData[i].likeCount, // review like count
        likedUsers: reviewData[i].likedUsers, // review liked users
        dislikedUsers: reviewData[i].dislikedUsers, // review disliked users
      });

      cumulativeRating += reviewData[i].rating;
    }
    cumulativeRating = cumulativeRating / reviewData.length;
    setAggregateRating(cumulativeRating);
    setTotalReviews(reviewData.length);
    return reviewsArray;
  }

  const ratingFilter = (event) => {
    var tempArray = allReviews;
    if (event.target.value > 0) {
      tempArray = tempArray.filter(
        (review) => review.rating == event.target.value
      );
    }
    setFilteredReviews(tempArray);
    forceUpdate();
  };

  const formChange = (event) => {
    //sort all reviews array by rating highest to lowest
    var tempArray = allReviews;
    if (event.target.value == 3) {
      tempArray.sort(function (a, b) {
        return b.rating > a.rating ? 1 : -1;
      });
    }
    //lowest to highest
    else if (event.target.value == 4) {
      tempArray.sort(function (a, b) {
        console.log(a.rating + " " + b.rating);
        return a.rating > b.rating ? 1 : -1;
      });
    }
    //oldest to newest
    else if (event.target.value == 2) {
      tempArray.sort(function (a, b) {
        return new Date(b.eventDate) < new Date(a.eventDate) ? 1 : -1;
      });
    }
    //newest to oldest
    else if (event.target.value == 1) {
      tempArray.sort(function (a, b) {
        return new Date(a.eventDate) < new Date(b.eventDate) ? 1 : -1;
      });
    }
    setFilteredReviews(tempArray);
    forceUpdate();
  };
  const changeBannerImage = (image,orgImg)=>{
    console.log(orgImg,image);
    setVenueImage(image+"?timestamp=" + new Date().getTime());
    orgImg != "" && setOriginalBannerImg(orgImg+"?timestamp=" + new Date().getTime());
}
  return (
    <>
    <Helmet>
      <title>{venueName}</title>
    </Helmet>
    <Grid container spacing={0}>
      <Grid item xs={12}>
        <ArtistNavigation handleAdminLoggedIn={handleAdminLoggedIn}/>
      </Grid>
      <Grid item xs={12}>
        <ArtistHeader
          name={venue_name}
          rating={aggregateRating}
          total={totalReviews}
          image={artistImage}
          isVenue={1}
          city={venueCity}
          onTour={false}
          verified={verified}
          images={imageArray}
          adminLoggedIn={adminLoggedIn} 
          venueID={venueIDGlobal}
          changeBannerImage={changeBannerImage}
          originalBannerImage={originalBannerImage}
        />
      </Grid>
      <Grid container spacing={1} style={artist_styles.grid.body_container}>
        <Grid item xs={12} md={8}>
          <ImageCarousel
            images={imageArray}
            videos={videoArray}
            slideCount={window.innerWidth < window_breakpoints.sm ? 1 : 3}
            isVenue={1}
            venueID={venueIDGlobal}
          />
          <ArtistContent
            allReviews={allReviews}
            filteredReviews={filteredReviews}
            aggregateRating={aggregateRating}
            onFormChange={formChange}
            onRatingChange={ratingFilter}
            onReviewSearch={searchReviews}
            searchResults={showResults}
            onClearSearch={clearSearch}
            reviewTable={"venue_reviews"}
          />
          {venue_name !== "" && (
            <WriteVenueReview
              venueId={venueIdNumber}
              name={venue_name}
              numReviews={totalReviews}
            />
          )}
        </Grid>
        <Grid item xs={12} md={4}>
          <SideContent
            name={venue_name}
            venue={true}
            linkPairs={[[websiteLink, "images/web_icon.pic.jpg"],[instaLink, "images/instagram.png.webp"], [ticketLink, "images/ticketmaster_icon.png"]]}
          />
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <hr id="artist-footer"></hr>
        <Footer />
      </Grid>
    </Grid>
    </>
  );
}
export default Venue;
