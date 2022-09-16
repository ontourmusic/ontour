import React from "react";
import '../index.css';
import $ from 'jquery'
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
          <img src="https://www.nationalworld.com/jpim-static/image/2022/01/07/12/GettyImages-1301817545.jpg?width=1200&enable=upscale" class="d-block w-100" alt="..."/>
          <div class="card-body">
            <h5 class="card-title">Card title 2</h5>
            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the
                card's content.</p>
            <a href="#" class="btn btn-primary">Go somewhere</a>
        </div>
      </div>
    </div>
    <div class="carousel-item">
      <div class="card">
        <img src="https://images.complex.com/complex/images/c_fill,dpr_auto,f_auto,q_auto,w_1400/fl_lossy,pg_1/fsz3lm5oh05nslobdcol/weeknd-tour-info?fimg-ssr-default" class="d-block w-100" alt="..."/>
          <div class="card-body">
            <h5 class="card-title">Card title 2</h5>
            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the
                card's content.</p>
            <a href="#" class="btn btn-primary">Go somewhere</a>
          </div>
      </div>
    </div>
    <div class="carousel-item">
        <div class="card">
          <img src="https://media2.dallasobserver.com/dal/imager/u/magnum/14537619/theweeknd_mikelgalicia.jpg?cb=1660165475" class="d-block w-100" alt="..."/>
          <div class="card-body">
            <h5 class="card-title">Card title 2</h5>
            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the
                card's content.</p>
            <a href="#" class="btn btn-primary">Go somewhere</a>
          </div>
        </div>
    </div>
    <div class="carousel-item">
        <div class="card">
          <img src="https://i.pinimg.com/originals/d5/ca/4c/d5ca4c59a1541561d1566f7bf811a87b.jpg" class="d-block w-100" alt="..."/>
          <div class="card-body">
            <h5 class="card-title">Card title 2</h5>
            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the
                card's content.</p>
            <a href="#" class="btn btn-primary">Go somewhere</a>
          </div>
        </div>
    </div>
    <div class="carousel-item">
        <div class="card">
          <img src="https://images.complex.com/complex/images/c_fill,dpr_auto,f_auto,q_auto,w_1400/fl_lossy,pg_1/vwzklxgrg5fr3hrw59yg/jack-harlow?fimg-ssr-default" class="d-block w-100" alt="..."/>
          <div class="card-body">
            <h5 class="card-title">Card title 2</h5>
            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the
                card's content.</p>
            <a href="#" class="btn btn-primary">Go somewhere</a>
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