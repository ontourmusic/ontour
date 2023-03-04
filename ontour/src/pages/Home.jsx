import React, { startTransition } from "react";
import {createSearchParams, useNavigate} from "react-router-dom";
import {useState, useEffect} from "react";
import HomePageArtist from "../components/HomePageArtist";
import Navigation from "../Navigation";
import { artistList } from "../ArtistInfo";
import MobileHomePageArtist from "../components/MobileHomePageArtist";
import SearchBar from "../components/SearchBar";

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
  const [reviewCount, setReviewCount] = useState({});
  const [loading, setLoading] = useState(true);

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
    for(var i=1; i <= Object.keys(artistList).length; i++){
      newRatings[i]=0;
      newCount[i]=0;
    }
    var fetchReviews = await fetch(`http://ec2-3-129-52-41.us-east-2.compute.amazonaws.com:8000/reviews/`, {mode: 'cors'});
    var reviewData = await fetchReviews.json();

    console.log(reviewData);
    reviewData.forEach((element) => {
      newRatings[element.artist_id] += element.rating;
      newCount[element.artist_id]++;
    });

    for (var i = 0; i < Object.keys(artistList).length; i++) {
      var artistNameList = Object.keys(artistList);
      var artistName = artistNameList[i];
      var artistID = artistList[artistName].artistID;
      starsResults[artistName]=(newRatings[artistID]/newCount[artistID]);
      ratingCount[artistName]=newCount[artistID];
    }

    setRatings(()=> {
      return starsResults
    });
    setReviewCount(()=>{
      return ratingCount
    })
    setLoading(false);
  }

  function generateRow(rowItems){
    var row = [];
    rowItems.map((artist) => {
      row.push(<HomePageArtist artist={artist} rating={ratings[artist]} loading={loading} reviewCount={reviewCount[artist]}></HomePageArtist>);
    })
    return row;
  }

  //performs the search when the page loads
  useEffect(() => {
    performSearch();
  }, [artistRows]);
  var artistRows = splitArtistsToRows(Object.keys(artistList),3);

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
            {/* <input id="input" type="text" class="form-control shadow-none" onChange={event => setName(event.target.value)} value={artist_name} placeholder="Search for an artist or venue"/>
            <button class="btn btn-dark" onClick={() => {alert('Feature coming soon! (see artists below)')}}>
              <img src="../../images/search_icon.png" alt="..."/>
            </button> */}
          </div>

          {/* Mobile */}
          <div class="d-block d-sm-none">
            <div id="gallery" class="row">
                <div class="col-12 col-sm-9 align-self-center">
                    <h4 class="fw-bold ">Recently Added Artists</h4>
                </div>
            </div>
            {Object.keys(artistList).map((item)=>{
                    return <MobileHomePageArtist artist={item} rating={ratings[item]} reviewCount={reviewCount[item]}></MobileHomePageArtist>
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
                return (
                  <div class="row mb-5">
                    {generateRow(item)}
                  </div>)
              })
            }
          </div> 
        </div>
      </div>
    </>
  );
}
export default Home;
