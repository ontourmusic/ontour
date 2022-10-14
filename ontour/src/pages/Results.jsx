import React from "react";
import "../index.css";
import ArtistNavigation from "../ArtistNavigation"
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';

function Results() {
  return (
    <>
      <ArtistNavigation/>
      
      <div class="result-margin">
        <div class="container">
          <div class="row">
            <h4 id="results" class="fw-bold py-4 result">Results</h4>
          </div>
              
          <a href="">
            <div id="result-row" class="row result">
              <div id="result-img" class="col-4">
                <img src="https://s1.ticketm.net/dam/a/cbd/3d3ab8ef-7a23-4342-9a0f-8c18cad7acbd_1682661_TABLET_LANDSCAPE_LARGE_16_9.jpg"></img>
              </div>
              <div class="col-8">
                <div class="row">
                  <h4 class="fw-bold">Jack Harlow</h4>
                </div>
                <div class="row">
                  <Rating
                    name="text-feedback"
                    value={4.5}
                    size = "large"
                    readOnly
                    precision={0.01}
                    emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit"/>}
                  />
                </div>
              </div>
            </div>
          </a>
          
        </div>
      </div>
      
    </>
  );
}

export default Results;