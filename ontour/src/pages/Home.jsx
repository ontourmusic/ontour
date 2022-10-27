import React from "react";
import {createSearchParams, useNavigate} from "react-router-dom";
import {useState} from "react";
import Navigation from "../Navigation";

function Home() {
  const [artist_name, setName] = useState('')

  const navigate = useNavigate(); 
  const routeChange = (artist) =>{ 
    navigate({
      pathname: '/artist', 
      search: createSearchParams({
      artist: artist_name,
      }).toString()
    });
  };

  // const handleSearch = event => {
  //   console.log("in clicked search");
  //   console.log(artist_name);
  // }

  return (
    <>
      <Navigation />
      <div id="homepage">
        <div id="homeheader" class="container">
          <img id="home-logo" src= "images/logo.png" alt=""/>
          <div class="home-title">
            Own your next live experience.
          </div>
          {/* <div class="search row">
            <input id="input" type="text" class="form-control shadow-none" onChange={event => setName(event.target.value)} value={artist_name} placeholder="Search for an artist or venue"/>
            <button class="btn btn-dark" onClick={routeChange}>
              <img src="../../images/search_icon.png" alt="..."/>
            </button>
          </div> */}

          <div class="container">
            <div id="gallery" class="row">
                <div class="col-12 col-sm-9 align-self-center">
                    <h4 class="fw-bold ">Recently Added Artists</h4>
                </div>
            </div>
            <div class="row mb-5">
                <div class="col-4">
                  <a href="/artist?artist=post_malone">
                    <div class="card bg-dark">
                        <img src="https://www.syracuse.com/resizer/Gho2h8t584_ZoNDxKzM1zOIiVk4=/arc-anglerfish-arc2-prod-advancelocal/public/ZZ2V33SVNREKLF6ROTZJ32GZXI.jpeg" class="d-block w-100" alt="..."/>
                        <div class="card-body">
                            <h5 class="card-title">Post Malone</h5>
                        </div>
                    </div>
                  </a>
                </div>
                <div class="col-4">
                  <a href="/artist?artist=jack_harlow">
                    <div class="card bg-dark">
                        <img src="https://media-cldnry.s-nbcnews.com/image/upload/rockcms/2022-08/jack-harlow-superbowl-citi-concert--inline2-jp-081222-08aa15.jpg" class="d-block w-100" alt="..."/>
                        <div class="card-body">
                            <h5 class="card-title">Jack Harlow</h5>
                        </div>
                    </div>
                  </a>
                </div>
                <div class="col-4">
                  <a href="/artist?artist=elton_john">
                    <div class="card bg-dark">
                        <img src="https://www.99images.com/download-image/933920/1920x1280" class="d-block w-100" alt="..."/>
                        <div class="card-body">
                            <h5 class="card-title">Elton John</h5>
                        </div>
                    </div>
                  </a>
                </div>
            </div>
            <div class="row">
                <div class="col-4">
                  <a href="/artist?artist=harry_styles">
                    <div class="card bg-dark">
                        <img src="https://www.billboard.com/wp-content/uploads/2021/12/harry-styles-2021-billboard-1548.jpg" class="d-block w-100" alt="..."/>
                        <div class="card-body">
                            <h5 class="card-title">Harry Styles</h5>
                        </div>
                    </div>
                  </a>
                </div>
                <div class="col-4">
                  <a href="/artist?artist=dominic_fike">
                    <div class="card bg-dark">
                        <img src="https://headlineplanet.com/home/wp-content/uploads/2022/02/Dominic-Fike-on-Fallon-4.jpg" class="d-block w-100" alt="..."/>
                        <div class="card-body">
                            <h5 class="card-title">Dominic Fike</h5>
                        </div>
                    </div>
                  </a>
                </div>
            </div>
          </div> 
        </div>
      </div>
    </>
  );
}
export default Home;
