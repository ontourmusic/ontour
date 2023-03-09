import React, { startTransition } from "react";
import {createSearchParams, useNavigate} from "react-router-dom";
import {useState, useEffect} from "react";
import HomePageArtist from "../components/HomePageArtist";
import Navigation from "../Navigation";
// import { artistList } from "../ArtistInfo";
import MobileHomePageArtist from "../components/MobileHomePageArtist";
import SearchBar from "../components/SearchBar";
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext, DotGroup } from 'pure-react-carousel';
import "pure-react-carousel/dist/react-carousel.es.css";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import '../Styles/carousel.css';
import ArtistCarousel from "../components/ArtistCarousel";

function Home() {
  const [artist_name, setName] = useState('')
  const [ratings, setRatings] = useState({});
  const [reviewCount, setReviewCount] = useState({});
  const [venueRatings, setVenueRatings] = useState({});
  const [venueReviewCount, setVenueReviewCount] = useState({});
  const [loading, setLoading] = useState(true);
  const [artistIDs, setArtistIDs] = useState({});
  const [artistList, setArtistList] = useState({name: "", imageURL: "", artistID: -1});
  const [venueList, setVenueList] = useState({});

  const navigate = useNavigate(); 
  const routeChange = (artist) =>{ 
    navigate({
      pathname: '/artist', 
      search: createSearchParams({
      artist: artist_name,
      }).toString()
    });
  };

  //gets the artist rating data from the database
  const performSearch = async () => {
    var starsResults = {};
    var ratingCount = {};
    var newRatings = {};
    var newCount = {};
    var newVenueRatings = {};
    var newVenueCount = {};
    var artistIDList = {};
    for(var i=1; i <= Object.keys(artistList).length; i++){
      newRatings[i]=0;
      newCount[i]=0;
    }
    for(var i=1; i <= Object.keys(venueList).length; i++){
      newVenueRatings[i]=0;
      newVenueCount[i]=0;
    }
    
    //gets the artist reviews from the database 
    var fetchReviews = await fetch(`http://18.188.104.212:8000/reviews/`, {mode: 'cors'});
    var reviewData = await fetchReviews.json();

    //loop through the reviews and add the ratings to the artist
    for(let i=0; i < reviewData.data.length; i++){
      const currData = reviewData.data[i];
      newRatings[currData.artist_id] += currData.rating;
      newCount[currData.artist_id]++;
    }

    //gets the venue reviews from the database
    var fetchVenueReviews = await fetch(`http://18.188.104.212:8000/venue_reviews/`, {mode: 'cors'});
    var venueReviewData = await fetchVenueReviews.json();
    //same as above but for venues
    for(let i=0; i < venueReviewData.data.length; i++){
      const currData = venueReviewData.data[i];
      newVenueRatings[currData.venue_id] += currData.rating;
      newVenueCount[currData.venue_id]++;
    }
    console.log(newVenueRatings);

    //gets the list of recent artists from the database
    var recentArtistsList = await fetch(`http://18.188.104.212:8000/recent_artists/`, {mode: 'cors'});
    var recentArtists = await recentArtistsList.json();
    const artistObject = {};
    for(let i=0; i < recentArtists["data"].length; i++){
      const currData = recentArtists["data"][i];
      const key = currData.name.replace(/\s+/g, '_').toLowerCase();
      artistObject[key] = {
        name: currData.name,
        imageURL: currData.home_image,
        artistID: currData.artist_id,
      }
    }

    //gets the list of recent venues from the database
    var recentVenueList = await fetch(`http://18.188.104.212:8000/recent_venues/`, {mode: 'cors'});
    var recentVenues = await recentVenueList.json();
    const venueObject = {};
    for(let i=0; i < recentVenues["data"].length; i++){
      const currData = recentVenues["data"][i];
      const key = currData.name.replace(/\s+/g, '_').toLowerCase();
      venueObject[key] = {
        name: currData.name,
        imageURL: currData.home_image,
        venueID: currData.venue_id,
      }
    }
    setVenueList(venueObject);
    setArtistList(artistObject);
    console.log(artistList);

    for (var i = 0; i < Object.keys(artistList).length; i++) {
      var artistNameList = Object.keys(artistList);
      var artistName = artistNameList[i];
      var artistID = artistList[artistName].artistID;
      starsResults[artistName]=(newRatings[artistID]/newCount[artistID]);
      ratingCount[artistName]=newCount[artistID];
      artistIDList[artistName]=artistID;
    }

    for (var i = 0; i < Object.keys(venueList).length; i++) {
      var venueNameList = Object.keys(venueList);
      var venueName = venueNameList[i];
      var venueID = venueList[venueName].venueID;
      venueRatings[venueName]=(newVenueRatings[venueID]/newVenueCount[venueID]);
      venueReviewCount[venueName]=newVenueCount[venueID];
    }

    console.log(venueRatings);


    setRatings(()=> {
      return starsResults
    });
    setReviewCount(()=>{
      return ratingCount
    })
    setArtistIDs(()=>{
      return artistIDList
    })
    setLoading(false);
  }

  //performs the search when the page loads
  useEffect(() => {
    performSearch();
  }, [artistList.name]);

  return (
    <>
      <Navigation />
      <div id="homepage">
      
        <div id="homeheader">
          <img id="home-logo" src= "images/logo.png" alt=""/>
          <div class="home-title">
            Own your next live experience.
          </div>
          <div class="search row">
          <SearchBar></SearchBar>
          </div>
          
          <div id="top-gallery" class="gallery row pt-5 pb-3">
                <div class="col-12 col-sm-9 align-self-center">
                    <h4 class="fw-bold ">Recently Added Artists</h4>
                </div>
          </div>
          {/* Mobile */}
          <div class="d-block d-sm-none">
            <ArtistCarousel artistFlag={1} loading={loading} itemList={artistList} ratings={ratings} reviewCount={reviewCount} slideCount={1}></ArtistCarousel>
          </div>

          {/* Web */}
          <div class="d-none d-sm-block">
            <ArtistCarousel artistFlag={1} loading={loading} itemList={artistList} ratings={ratings} reviewCount={reviewCount} slideCount={3}></ArtistCarousel>
          </div> 

          <div class="gallery row pt-5 pb-3">
                <div class="col-12 col-sm-9 align-self-center">
                    <h4 class="fw-bold ">Recently Added Venues</h4>
                </div>
          </div>
          
          {/* Mobile */}
          <div class="d-block d-sm-none">
            <ArtistCarousel artistFlag={0} loading={loading} itemList={venueList} ratings={venueRatings} reviewCount={venueReviewCount} slideCount={1}></ArtistCarousel>
          </div>

          {/* Web */}
          <div class="d-none d-sm-block">
            <ArtistCarousel artistFlag={0} loading={loading} itemList={venueList} ratings={venueRatings} reviewCount={venueReviewCount} slideCount={3}></ArtistCarousel>
          </div> 
        </div>
      </div>
    </>
  );
}
export default Home;
