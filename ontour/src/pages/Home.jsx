import React from "react";
import {createSearchParams, useNavigate} from "react-router-dom";
import {useState, useEffect} from "react";
import HomePageArtist from "../components/HomePageArtist";
import Navigation from "../Navigation";
import { artistIDs } from "../ArtistInfo";
import MobileHomePageArtist from "../components/MobileHomePageArtist";

function splitArtistsToRows(artists, rowLength){
  var splitArray = [];
  for(var i=0; i<artists.length; i+=(rowLength)){
    splitArray.push(artists.slice(i, i+(rowLength)));
  }
  return splitArray;
}

function Home() {
  const [artist_name, setName] = useState('')
  const [ratings, setRatings] = useState({});
  const [loading, setLoading] = useState(true);

  var artistRows = splitArtistsToRows(artistIDs,3);

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
    for (var i = 0; i < artistIDs.length; i++) {
      try {
        var artistResponse = await fetch(`http://ec2-3-129-52-41.us-east-2.compute.amazonaws.com:8000/search_artist/${artistIDs[i]}`, {mode: 'cors'});
        var artistData = await artistResponse.json();
        var artistId = artistData[0].artist_id;
        var getReviews = await fetch(`http://ec2-3-129-52-41.us-east-2.compute.amazonaws.com:8000/reviews/${artistId}`, {mode: 'cors'});
        var reviewData = await getReviews.json();
      }
      catch (error){
        reviewData = 0;
      }
      starsResults[artistIDs[i]]=parseReviewData(reviewData);
    }
    setRatings(()=> {
      return starsResults
    });
    setLoading(false);
  }

  function parseReviewData(reviewData) {
    var cumulativeRating = 0;
    for(var i = 0; i < reviewData.length; i++) {
      var rRating = reviewData[i].rating;
      cumulativeRating += rRating;
    }
    cumulativeRating = cumulativeRating / reviewData.length;
    return cumulativeRating;
  }

  function generateRow(rowItems){
    var row = [];
    rowItems.map((artist) => {
      row.push(<HomePageArtist artist={artist} rating={ratings[artist]} loading={loading}></HomePageArtist>);
    })
    return row;
  }

  //performs the search when the page loads
  useEffect(() => {
    performSearch();
  });
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
            <input id="input" type="text" class="form-control shadow-none" onChange={event => setName(event.target.value)} value={artist_name} placeholder="Search for an artist or venue"/>
            <button class="btn btn-dark" onClick={() => {alert('Feature coming soon! (see artists below)')}}>
              <img src="../../images/search_icon.png" alt="..."/>
            </button>
          </div>

          {/* Mobile */}
          <div class="d-block d-sm-none">
            <div id="gallery" class="row">
                <div class="col-12 col-sm-9 align-self-center">
                    <h4 class="fw-bold ">Recently Added Artists</h4>
                </div>
            </div>
            {artistIDs.map((item)=>{
                    return <MobileHomePageArtist artist={item} rating={ratings[item]}></MobileHomePageArtist>
                })
            }
          </div>

          {/* Web */}
          <div class="d-none d-sm-block">
            <div id="gallery" class="row">
                <div class="col-12 col-sm-9 align-self-center">
                    <h4 class="fw-bold ">Recently Added Artists</h4>
                </div>
            </div>
            {
              artistRows.map((item)=>{
                return <div class="row mb-5">
                      {generateRow(item)}
                  </div> 
              })
            }
          </div> 
        </div>
      </div>
    </>
  );
}
export default Home;
