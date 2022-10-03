import React from "react";
import {useState} from 'react';

function Home() {
  const [name, setName] = useState("");

  const handleSearch = event => {
    console.log("in clicked search");
    console.log(name);
  }


  return (
    <div id="homepage">
      <h1 class="display-4 fw-bold" id="homeheader">OnTour</h1>
      <div className="container py-5" id="searchbar">
          <div class="row height d-flex justify-content-center align-items-center">
            <div class="col-md-8">
              <div class="search">
                <i class="fa fa-search"></i>
                <input type="text" class="form-control" onChange={event => setName(event.target.value)} value={name} placeholder="Search for an artist or venue"/>
                <button class="btn btn-primary bg-dark" onClick={handleSearch}>Search</button>
              </div>
            </div>
          </div>
      </div>
    </div>
  );
}

export default Home;