import React from "react";
import '../index.css';
function Artist() {
  return (
    <div className="about">

          {/* <div class="mt-5">
            <h1 class="font-weight-light">Artist</h1>
            <p>
              This is the artist page
            </p>
          </div> */}
          <div id="artist-background" class="jumbotron bg-cover text-white">
            <div class="container py-5 text-center">
              <h1 class="display-4 font-weight-bold">The Weeknd</h1>
              <p class="font-weight-light mb-0">Rating *****</p>
            </div>
          </div> 

    </div>
  );
}

export default Artist;