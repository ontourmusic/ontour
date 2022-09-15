import React from "react";
import '../index.css';
function Artist() {
  return (
    <div className="artist">
          <div id="artist-background" class="container-fluid jumbotron bg-cover text-white">
            <div id="text-contain" class="container text-center py-5">
              <h1 class="display-4 fw-bold">The Weeknd</h1>
              <p class="font-weight-light mb-0">Rating *****</p>
            </div>
          </div> 

          {/* <div class="container py-5">
            <h2 class="h3 font-weight-bold">Photo Gallery</h2>
            <div class="container">
              <div class="row">
                <div class="col-sm">
                  <img src="https://www.nationalworld.com/jpim-static/image/2022/01/07/12/GettyImages-1301817545.jpg?width=1200&enable=upscale" class="img-fluid" alt="Responsive image"/>
                  
                </div>
                <div class="col-sm">
                  <img src="https://images.complex.com/complex/images/c_fill,dpr_auto,f_auto,q_auto,w_1400/fl_lossy,pg_1/fsz3lm5oh05nslobdcol/weeknd-tour-info?fimg-ssr-default" class="img-fluid" alt="Responsive image"/>
                  
                </div>
                <div class="col-sm">
                  <img src="https://media2.dallasobserver.com/dal/imager/u/magnum/14537619/theweeknd_mikelgalicia.jpg?cb=1660165475" class="img-fluid" alt="Responsive image"/>   
                </div>
              </div>
            </div>
          </div> */}

          <div id="gallery" class="container py-5">
            <h2 class="h3 fw-bold">Photo Gallery</h2>
            <div id="carouselExampleCaptions" class="carousel slide" data-bs-ride="false">
              <div class="carousel-indicators">
                <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
                <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
                <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
              </div>
              <div class="carousel-inner">
                <div class="carousel-item active">
                  <img src="https://www.nationalworld.com/jpim-static/image/2022/01/07/12/GettyImages-1301817545.jpg?width=1200&enable=upscale" class="d-block w-100" alt="..."/>
                  <div class="carousel-caption d-none d-md-block">
                    <h5>First slide label</h5>
                    <p>Some representative placeholder content for the first slide.</p>
                  </div>
                </div>
                <div class="carousel-item">
                  <img src="https://images.complex.com/complex/images/c_fill,dpr_auto,f_auto,q_auto,w_1400/fl_lossy,pg_1/fsz3lm5oh05nslobdcol/weeknd-tour-info?fimg-ssr-default" class="d-block w-100" alt="..."/>
                  <div class="carousel-caption d-none d-md-block">
                    <h5>Second slide label</h5>
                    <p>Some representative placeholder content for the second slide.</p>
                  </div>
                </div>
                <div class="carousel-item">
                  <img src="https://media2.dallasobserver.com/dal/imager/u/magnum/14537619/theweeknd_mikelgalicia.jpg?cb=1660165475" class="d-block w-100" alt="..."/>
                  <div class="carousel-caption d-none d-md-block">
                    <h5>Third slide label</h5>
                    <p>Some representative placeholder content for the third slide.</p>
                  </div>
                </div>
              </div>
              <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Previous</span>
              </button>
              <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Next</span>
              </button>
            </div>
          </div>



          
          
    </div>
  );
}

export default Artist;