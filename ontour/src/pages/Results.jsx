import React from 'react'
import '../index.css'
import StarIcon from '@mui/icons-material/Star'
import Rating from '@mui/material/Rating'
import Navigation from '../Navigation'
import Footer from '../components/Footer'

function Results() {
  return (
    <>
      <Navigation />

      {/* Mobile */}
      <div id="result-wrapper">
        <div className="results d-block d-sm-none">
          <div id="gallery" className="row">
            <div className="col-12 col-sm-9 align-self-center">
              <h4 className="fw-bold ">Results</h4>
            </div>
          </div>
          <div className="row mb-4">
            <a href="/artist?artist=post_malone">
              <div className="card">
                <img
                  src="https://www.syracuse.com/resizer/Gho2h8t584_ZoNDxKzM1zOIiVk4=/arc-anglerfish-arc2-prod-advancelocal/public/ZZ2V33SVNREKLF6ROTZJ32GZXI.jpeg"
                  className="d-block w-100"
                  alt="..."
                />
                <div className="card-body">
                  <h5 className="card-title fw-bold">Post Malone</h5>
                  <Rating
                    name="text-feedback"
                    value={5}
                    size="small"
                    readOnly
                    precision={0.1}
                    emptyIcon={<StarIcon style={{ opacity: 1 }} fontSize="inherit" />}
                  />
                </div>
              </div>
            </a>
          </div>
          <div className="row mb-4">
            <a href="/artist?artist=jack_harlow">
              <div className="card">
                <img
                  src="https://media-cldnry.s-nbcnews.com/image/upload/rockcms/2022-08/jack-harlow-superbowl-citi-concert--inline2-jp-081222-08aa15.jpg"
                  className="d-block w-100"
                  alt="..."
                />
                <div className="card-body">
                  <h5 className="card-title fw-bold">Jack Harlow</h5>
                  <Rating
                    name="text-feedback"
                    value={5}
                    size="small"
                    readOnly
                    precision={0.1}
                    emptyIcon={<StarIcon style={{ opacity: 1 }} fontSize="inherit" />}
                  />
                </div>
              </div>
            </a>
          </div>
          <div className="row mb-4">
            <a href="/artist?artist=elton_john">
              <div className="card">
                <img
                  src="https://www.99images.com/download-image/933920/1920x1280"
                  className="d-block w-100"
                  alt="..."
                />
                <div className="card-body">
                  <h5 className="card-title fw-bold">Elton John</h5>
                  <Rating
                    name="text-feedback"
                    value={5}
                    size="small"
                    readOnly
                    precision={0.1}
                    emptyIcon={<StarIcon style={{ opacity: 1 }} fontSize="inherit" />}
                  />
                </div>
              </div>
            </a>
          </div>
          <div className="row mb-4">
            <a href="/artist?artist=harry_styles">
              <div className="card">
                <img
                  src="https://www.billboard.com/wp-content/uploads/2021/12/harry-styles-2021-billboard-1548.jpg"
                  className="d-block w-100"
                  alt="..."
                />
                <div className="card-body">
                  <h5 className="card-title fw-bold">Harry Styles</h5>
                  <Rating
                    name="text-feedback"
                    value={5}
                    size="small"
                    readOnly
                    precision={0.1}
                    emptyIcon={<StarIcon style={{ opacity: 1 }} fontSize="inherit" />}
                  />
                </div>
              </div>
            </a>
          </div>
          <div className="row mb-4">
            <a href="/artist?artist=dominic_fike">
              <div className="card">
                <img
                  src="https://headlineplanet.com/home/wp-content/uploads/2022/02/Dominic-Fike-on-Fallon-4.jpg"
                  className="d-block w-100"
                  alt="..."
                />
                <div className="card-body">
                  <h5 className="card-title fw-bold">Dominic Fike</h5>
                  <Rating
                    name="text-feedback"
                    value={5}
                    size="small"
                    readOnly
                    precision={0.1}
                    emptyIcon={<StarIcon style={{ opacity: 1 }} fontSize="inherit" />}
                  />
                </div>
              </div>
            </a>
          </div>
        </div>

        <div className="results d-none d-sm-block">
          <div id="gallery" className="row">
            <div className="col-12 col-sm-9 align-self-center">
              <h4 className="fw-bold ">Results</h4>
            </div>
          </div>
          <div className="row mb-5">
            <div className="col-4">
              <a href="/artist?artist=post_malone">
                <div className="card">
                  <img
                    src="https://www.syracuse.com/resizer/Gho2h8t584_ZoNDxKzM1zOIiVk4=/arc-anglerfish-arc2-prod-advancelocal/public/ZZ2V33SVNREKLF6ROTZJ32GZXI.jpeg"
                    className="d-block w-100"
                    alt="..."
                  />
                  <div className="card-body">
                    <h5 className="card-title fw-bold">Post Malone</h5>
                    <Rating
                      name="text-feedback"
                      value={5}
                      size="small"
                      readOnly
                      precision={0.1}
                      emptyIcon={<StarIcon style={{ opacity: 1 }} fontSize="inherit" />}
                    />
                  </div>
                </div>
              </a>
            </div>
            <div className="col-4">
              <a href="/artist?artist=jack_harlow">
                <div className="card">
                  <img
                    src="https://media-cldnry.s-nbcnews.com/image/upload/rockcms/2022-08/jack-harlow-superbowl-citi-concert--inline2-jp-081222-08aa15.jpg"
                    className="d-block w-100"
                    alt="..."
                  />
                  <div className="card-body">
                    <h5 className="card-title fw-bold">Jack Harlow</h5>
                    <Rating
                      name="text-feedback"
                      value={5}
                      size="small"
                      readOnly
                      precision={0.1}
                      emptyIcon={<StarIcon style={{ opacity: 1 }} fontSize="inherit" />}
                    />
                  </div>
                </div>
              </a>
            </div>
            <div className="col-4">
              <a href="/artist?artist=elton_john">
                <div className="card">
                  <img
                    src="https://www.99images.com/download-image/933920/1920x1280"
                    className="d-block w-100"
                    alt="..."
                  />
                  <div className="card-body">
                    <h5 className="card-title fw-bold">Elton John</h5>
                    <Rating
                      name="text-feedback"
                      value={5}
                      size="small"
                      readOnly
                      precision={0.1}
                      emptyIcon={<StarIcon style={{ opacity: 1 }} fontSize="inherit" />}
                    />
                  </div>
                </div>
              </a>
            </div>
          </div>
          <div className="row">
            <div className="col-4">
              <a href="/artist?artist=harry_styles">
                <div className="card">
                  <img
                    src="https://www.billboard.com/wp-content/uploads/2021/12/harry-styles-2021-billboard-1548.jpg"
                    className="d-block w-100"
                    alt="..."
                  />
                  <div className="card-body">
                    <h5 className="card-title fw-bold">Harry Styles</h5>
                    <Rating
                      name="text-feedback"
                      value={5}
                      size="small"
                      readOnly
                      precision={0.1}
                      emptyIcon={<StarIcon style={{ opacity: 1 }} fontSize="inherit" />}
                    />
                  </div>
                </div>
              </a>
            </div>
            <div className="col-4">
              <a href="/artist?artist=dominic_fike">
                <div className="card">
                  <img
                    src="https://headlineplanet.com/home/wp-content/uploads/2022/02/Dominic-Fike-on-Fallon-4.jpg"
                    className="d-block w-100"
                    alt="..."
                  />
                  <div className="card-body">
                    <h5 id="hi" class="card-title fw-bold">
                      Dominic Fike
                    </h5>
                    <Rating
                      name="text-feedback"
                      value={5}
                      size="small"
                      readOnly
                      precision={0.1}
                      emptyIcon={<StarIcon style={{ opacity: 1 }} fontSize="inherit" />}
                    />
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>

      <hr id="results-footer"></hr>
      <Footer />
    </>
  )
}

export default Results
