import React from "react";

function Home() {
  return (
    <div id="homepage">
      <h1 class="display-4 fw-bold" id="homeheader">OnTour</h1>
      <div className="container py-5" id="searchbar">
          <div class="row height d-flex justify-content-center align-items-center">
            <div class="col-md-8">
              <div class="search">
                <i class="fa fa-search"></i>
                <input type="text" class="form-control" placeholder="Search for an artist or venue"/>
                <button class="btn btn-primary bg-dark">Search</button>
              </div>
            </div>
          </div>
      </div>
    </div>
  );
}

export default Home;