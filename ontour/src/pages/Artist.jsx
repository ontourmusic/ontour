import React from "react";
import '../index.css';
import "react-multi-carousel/lib/styles.css";

function Artist() {

  return (
    <div className="artist">
        <div id="artist-background" class="container-fluid jumbotron bg-cover text-white">
            <div id="text-contain" class="container text-center py-5">
              <h1 class="display-4 fw-bold">Jack Harlow</h1>
              <p class="font-weight-light mb-0">Rating *****</p>
          </div>
        </div> 

<div class="container py-5">
  <h2 class="h3 font-weight-bold">Photo Gallery</h2>
  <div id="carouselExampleControls" class="carousel slide" data-bs-ride="carousel">
    <div class="carousel-inner">
      <div class="carousel-item active">
        <div class="card">
          <img src="https://www.rollingstone.com/wp-content/uploads/2022/05/jack-harlow-tour.jpg" class="d-block w-100" alt="..."/>
          <div class="card-body">
            <h5 class="card-title">Card title 2</h5>
        </div>
      </div>
    </div>
    <div class="carousel-item">
      <div class="card">
        <img src="https://www.leoweekly.com/wp-content/uploads/2019/12/Harlow3.jpg" class="d-block w-100" alt="..."/>
          <div class="card-body">
            <h5 class="card-title">Card title 2</h5>
          </div>
      </div>
    </div>
    <div class="carousel-item">
        <div class="card">
          <img src="https://www.gannett-cdn.com/presto/2021/10/10/NA36/01000ac6-e203-4ed3-96ba-c5382420d8ac-DCQ_ACL21_SAT_010_1.JPG" class="d-block w-100" alt="..."/>
          <div class="card-body">
            <h5 class="card-title">Card title 2</h5>
            {/* <p class="card-text">Some quick example text to build on the card title and make up the bulk of the
                card's content.</p>
            <a href="#" class="btn btn-primary">Go somewhere</a> */}
          </div>
        </div>
    </div>
    
    </div>
    <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Previous</span>
    </button>
    <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Next</span>
    </button>
  </div>       
</div>


</div>
  );
}

export default Artist;