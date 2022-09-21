import React from "react";
import '../index.css';
function Artist() {
  return (
    <div className="artist">
          <div id="artist-background" class="jumbotron bg-cover text-white">
            <div class="container py-5 text-center">
              <h1 class="display-4 font-weight-bold">The Weeknd</h1>
              <p class="font-weight-light mb-0">Rating *****</p>
            </div>
          </div> 

          <div class="container py-5">
            <h2 class="h3 font-weight-bold">Photo Gallery</h2>
          </div>
          <div class="container py-5">
            <h2 class="h3 font-weight-bold">Reviews</h2>
            <div class="list-group">
              <a href="#" class="list-group-item list-group-item-action flex-column align-items-start">
                <div class="d-flex w-100 justify-content-between">
                  <h5 class="mb-1">User A</h5>
                  <small class="text-muted">9/6/2022</small>
                </div>
                <div class="d-flex w-100 justify-content-start">
                  <p class="text-muted">Rating: * * * * * 5/5</p>
                </div> 
                <div class="d-flex w-100 justify-content-start">
                  <p class="mb-1">I love Jack Harlow.</p>
                </div>
              </a>
              <a href="#" class="list-group-item list-group-item-action flex-column align-items-start">
                <div class="d-flex w-100 justify-content-between">
                  <h5 class="mb-1">User B</h5>
                  <small class="text-muted">9/5/2022</small>
                </div>
                <div class="d-flex w-100 justify-content-start">
                  <p class="text-muted">Rating: * * * * * 5/5</p>
                </div>
                <div class="d-flex w-100 justify-content-start">
                  <p class="mb-1">FIRST CLASS.</p>
                </div>
              </a>
              <a href="#" class="list-group-item list-group-item-action flex-column align-items-start">
                <div class="d-flex w-100 justify-content-between">
                  <h5 class="mb-1">User C</h5>
                  <small class="text-muted">9/5/2022</small>
                </div>
                <div class="d-flex w-100 justify-content-start">
                  <p class="text-muted">Rating: * * * * * 5/5</p>
                </div>
                <div class="d-flex w-100 justify-content-start">
                  <p class="mb-1">HE IS SO HOTTT.</p>
                </div>
              </a>
            </div>
          </div>
    </div>
    
  );
}

export default Artist;