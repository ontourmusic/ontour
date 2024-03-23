import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React from 'react'

import artist_styles from '../Styles/artist_styles'

import Slider from "react-slick";
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
// import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext, DotGroup, Image } from 'pure-react-carousel';
import { Polaroid } from './Polaroid';
import { supabase } from './supabaseClient';
import { error } from 'jquery';
import CommentBox1 from './CommentBox1';
const modal_styles = artist_styles.modal;
const ImageModal1 = (props) => {
  const [modalBackgroundColour, setModalBackgroundColour] = useState(
    "rgba(76, 78, 120, 0.9)"
  );
  const [imageBackgroundColour, setImageBackgroundColour] = useState(
    "rgba(5, 2, 14, 1.0)"
  );
  var settings = {
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    dots: true,

  };
  const [textColor, setTextColor] = useState("white");
  const [comments, setComments] = useState([])
  const fetchComments = async () => {
    console.log("fetching comments")
    try {
      const { data, error } = await supabase
        .from('artist_comments')
        .select(`*,artist_images(*)`)
        .eq('artist_images.artist_id', props.artistID)

      if (!error) {
        let x = []
        for (let i = 0; i < data.length; i++) {
          if (data[i].artist_images) {
            x.push(data[i])
            console.log(data[i])
          }
        }
        setComments(x)
      }
    } catch (error) {
      console.log(error)

    }

  }

  useEffect(() => {
    fetchComments()
  }, [props.artistID])



  // console.log(props)
  return (
    <Modal

      open={true}
      onClose={props.handleClose1}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      // style={artist_styles.modal.container}
      style={{ height: "100%", width: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}
    >

      {/* <Grid
        style={{ position: 'relative' }}
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
      > */}
      {/* <div style={{ position: "absolute", right: 10, height: '2rem' }}>
          <button
            id="modalCloseBtn"
            onClick={props.handleClose1}
            style={{ float: "right" }}
            className="btn btn-light"
          >
            X
          </button>
        </div> */}
      <div className='content' style={{
        background: "rgb(9,0,36)",
        background: `linear-gradient(160deg, rgba(9,0,36,1) 63%, rgba(9,9,121,1) 91%, rgba(0,212,255,1) 100%)`, height: "80%", width: "80%", position: "relative"
      }}>
        <div style={{ position: "absolute", top: 10, right: 10, height: '2rem', zIndex: "1000" }}>
          <button
            id="modalCloseBtn"
            onClick={props.handleClose1}
            style={{ float: "right" }}
            className="btn btn-light"
          >
            X
          </button>
        </div>
        <Slider  {...settings}>

          {
            props.images.map((image) => {


              return (
                <div>
                  <img width="100%" height="500" style={{ objectFit: "contain" }} src={image} alt='xyz' />
                  {
                    !!comments.length && comments.map((comment, index) => {
                      return (
                        <>

                          {comment.artist_images.image_url === image &&
                            <div style={{ backgroundColor: "white", border: "1px solid black", padding: "10px", borderRadius: "10px" }}>Comment-:{comment.comment}
                            Date-:{comment.date}
                            Name-:{comment.name}
                            </div>


                          }
                        </>
                      )
                    })
                  }
                </div>
              )
            })
          }
          {/* // props.images.map((image,index) => {
                //   return (
                //     <div key={index}>
                //       <img width="100" height="100"  src={image} alt='xyz' />
                //     </div>
                //   )
                // }) */}


        </Slider>
      </div>

      {/* <Grid item xs={12} md={8} style={modal_styles.imageContainer}>
          

        </Grid> */}
      {/* <Grid
          item
          xs={12}
          md={4}
          sx={{
            paddingLeft: { xs: "0px", md: "10px" },
          }}
        >
          {
            <CommentBox1 comments={comments} />
          }

          {/* abcd */}
      {/* <CommentBox
            textColor={textColor}
            // imageData={props.imageData}
            // isVenue={props.isVenue}
            // isFestival={props.isFestival}
            // user={user}
            // name={ props.name ||props.artistFname || props.venueName|| props.festivalName}
          /> */}
      {/* </Grid> */}
      {/* // </Grid> */}
    </Modal>
  )
}

export default ImageModal1
