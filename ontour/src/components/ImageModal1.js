import React from 'react'
import artist_styles from '../Styles/artist_styles'

import PropTypes from "prop-types";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import CommentBox from "./CommentBox";
import { Grid, Modal } from "@mui/material";
import { useState, useEffect } from "react";
import { GetAverageColor, getTextColor, rgbToHex } from "./ColorFunctions";
import mixpanel from "mixpanel-browser";
import { mixPanelId } from "../constants/constants";
import { useAuth0 } from "@auth0/auth0-react";
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext, DotGroup, Image } from 'pure-react-carousel';
import { Polaroid } from './Polaroid';
const modal_styles = artist_styles.modal;
const ImageModal1 = (props) => {
    const [modalBackgroundColour, setModalBackgroundColour] = useState(
        "rgba(76, 78, 120, 0.9)"
      );
      const [imageBackgroundColour, setImageBackgroundColour] = useState(
        "rgba(5, 2, 14, 1.0)"
      );
      const [textColor, setTextColor] = useState("white");
      useEffect(() => {
        let backBtn = document.getElementById("backbtn");
        console.log(backBtn)
        document.addEventListener('keydown', (event) => {
          console.log(event) 
          if (event.key === 'ArrowLeft' ) {
            backBtn.click()
            console.log('Button clicked by pressing Enter!');
          }
        });
      },[])
      


      // console.log(props)
  return (
    <Modal
      
      open={true}
      onClose={props.handleClose1}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      style={artist_styles.modal.container}
    >
         
      <Grid
        style={{position:'relative'}}
        container
        columnSpacing={0}
        rowSpacing={{ xs: 1, md: 0 }}
        sx={{
          ...modal_styles.gridContainer,
          p: { xs: 1, md: 2, lg: 3 },
          background: `linear-gradient(110deg, ${modalBackgroundColour}, 45%, ${imageBackgroundColour})`,
          "&:focus": {
            outline: "none",
          },
        }}
      >
         <div style={{ position: "absolute", right: 10,height:'2rem' }}>
            <button
              id = "modalCloseBtn"
              onClick={props.handleClose1}
              style={{ float: "right" }}
              className="btn btn-light"
            >
              X
            </button>
          </div>
          
        <Grid item xs={12} md={8} style={modal_styles.imageContainer}>
          
        <CarouselProvider
                orientation="horizontal"
                visibleSlides={1}
                totalSlides={props.images.length}
                step={1}
                // naturalSlideWidth={50}
                // naturalSlideHeight={50}
                isIntrinsicHeight={true}
                // style={artist_styles.carousel.container}
            >
                <Slider>
                    {/* <Slide style={artist_styles.carousel.slide}>
                    <img src="https%3A%2F%2Fstock.adobe.com%2Fsearch%3Fk%3Ddemo&psig=AOvVaw2REVUOGqDE3GnHOer4dD3v&ust=1710931577246000&source=images&cd=vfe&opi=89978449&ved=0CBMQjRxqFwoTCLim1vmSgIUDFQAAAAAdAAAAABAE" alt='xyz'/>
                    </Slide> */}
                 {
                    props.images.map((image)=>{
                        return(
                            <Slide >
                            <Image src={image} alt='xyz'/>
                            </Slide>
                        )
                    })
                 }
                  
                </Slider>
                <div className="controls">
                    <button id="backbtn">back</button>
                    <ButtonBack  className="btn-arrow" style={{  color: "white" }}>
                        <FontAwesomeIcon  icon={faAngleLeft} size="lg" />
                    </ButtonBack>
                    <DotGroup className="dot-group" />
                    <ButtonNext className="btn-arrow" style={{ color: "white" }}>
                        <FontAwesomeIcon icon={faAngleRight} size="lg" />
                    </ButtonNext>
                </div>
                 </CarouselProvider>
        </Grid>
        <Grid
          item
          xs={12}
          md={4}
          sx={{
            paddingLeft: { xs: "0px", md: "10px" },
          }}
        >
         {/* abcd */}
          {/* <CommentBox
            textColor={textColor}
            // imageData={props.imageData}
            // isVenue={props.isVenue}
            // isFestival={props.isFestival}
            // user={user}
            // name={ props.name ||props.artistFname || props.venueName|| props.festivalName}
          /> */}
        </Grid>
      </Grid>
    </Modal>
  )
}

export default ImageModal1
