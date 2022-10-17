import React from "react";
import "../index.css";
import ArtistNavigation from "../ArtistNavigation"
import Result from "../components/Result"

function Results() {
  return (
    <>
      <ArtistNavigation/>
      
      <div class="result-margin">
        <div class="container">
          <div class="row">
            <h4 id="results" class="fw-bold result">Results</h4>
          </div>
              
          <Result name={"Jack Harlow"} rating={"4.5"} src={"https://s1.ticketm.net/dam/a/cbd/3d3ab8ef-7a23-4342-9a0f-8c18cad7acbd_1682661_TABLET_LANDSCAPE_LARGE_16_9.jpg"}/>
          <Result name={"Doja Cat"} rating={"4.6"} src={"https://i.scdn.co/image/ab6761610000e5eb727a2ac15afe659be999beba"}/>
          <Result name={"Tame Impala"} rating={"4.8"} src={"https://i1.sndcdn.com/avatars-yHA8nds2mqg4uYtr-kyxTzw-t500x500.jpg"}/>

        </div>
      </div>
      
    </>
  );
}

export default Results;