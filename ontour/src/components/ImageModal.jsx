import React from "react";
import PropTypes from "prop-types";
import artist_styles from "../Styles/artist_styles";
import CommentBox from "./CommentBox";
import { Grid, Modal } from "@mui/material";
import { useState, useEffect } from "react";
import { GetAverageColor, getTextColor, rgbToHex } from "./ColorFunctions";
import mixpanel from "mixpanel-browser";
import { mixPanelId } from "../constants/constants";
import { useAuth0 } from "@auth0/auth0-react";
const modal_styles = artist_styles.modal;

const ImageModal = (props) => {
  var c = 0
  // mixpanel.init(mixPanelId, {debug: true, track_pageview: true, persistence: 'localStorage'});
  const [modalBackgroundColour, setModalBackgroundColour] = useState(
    "rgba(76, 78, 120, 0.9)"
  );
  const [imageBackgroundColour, setImageBackgroundColour] = useState(
    "rgba(5, 2, 14, 1.0)"
  );
  const {user,isAuthenticated} = useAuth0();
  const [textColor, setTextColor] = useState("white");
  const videoExtensions = ["mp4", "mkv", "x-m4v", "quicktime"];
  const [count, setCount] = useState(1);
  console.log(props,"modal")
 
  const handleAverageColorButton = (url) => {
    console.log("Average Color Button Clicked");
    const imageUrl =
      "https://imagez.tmz.com/image/3a/4by3/2021/11/14/3a1b784d843e44bdbd609f17b17bee03_xl.jpg";
    GetAverageColor(url ? url : imageUrl)
      .then((averageColor) => {
        console.log("Average color:", averageColor);
        setModalBackgroundColour(
          `rgb(${averageColor.r}, ${averageColor.g}, ${averageColor.b})`
        );
        setImageBackgroundColour(
          `rgb(${averageColor.r + 45}, ${averageColor.g + 45}, ${
            averageColor.b + 45
          })`
        );
        setTextColor(
          getTextColor(rgbToHex(averageColor.r, averageColor.g, averageColor.b))
        );
      })
      .catch((error) => console.error("Error:", error));
  };
  useEffect(() => {
    
    if(c == 0){
      mixpanel.track("media_clicked", {
        "media_id" : props.imageData.id,
        "media_url" : props.imageData.video_url || props.imageData.image_url,
        "media_type" : (props.imageData.video_url && "video") || (props.imageData.image_url && "image") || "image",
        "entity_id" : props.imageData.artist_id || props.imageData.venue_id || props.imageData.festival_id,
        "entity_name" : props.name ||props.artistFname || props.venueName|| props.festivalName,
        "entity_type" : `${(props.imageData.artist_id && "artist") || (props.imageData.venue_id && "venue") || (props.imageData.festival_id && "festival")}`,
        "user" : user?user:'guest',
        "mode" : props.mode
  })
      c = c + 1
    }
  }, []);
  console.log(props.image);
  let video = document.getElementById("video");
  let closeBtn = document.getElementById("modalCloseBtn");
  let x = 0;
  function sendDataToMixPanel(){
    if(x < Math.floor(video.currentTime.toFixed(2))){
      x =   Math.floor(video.currentTime.toFixed(2))
      mixpanel.track(`video_played`,{
        "play_time" : `${x} secs`,
        "video_id" : props.imageData.id,
        "video_url" : props.imageData.video_url,
        "entity_id" : props.imageData.artist_id || props.imageData.venue_id || props.imageData.festival_id,
        "entity_name" : props.artistFname || props.venueName|| props.festivalName,
        "entity_type" : `${(props.imageData.artist_id && "artist") || (props.imageData.venue_id && "venue") || (props.imageData.festival_id && "festival")}`,
        "user" : user?user:'guest'
        
     });
    }
}
  video && video.addEventListener("pause",sendDataToMixPanel)
  video && closeBtn.addEventListener("click",sendDataToMixPanel)
//   function handlemixPanelMediaClicked(){

//     mixpanel.track("media_clicked_modal", {
//       "media_id" : props.imageData.id,
//       "media_url" : props.imageData.video_url || props.imageData.image_url,
//       "media_type" : (props.imageData.video_url && "video") || (props.imageData.image_url && "image") || "image",
//       "entity_id" : props.imageData.artist_id || props.imageData.venue_id || props.imageData.festival_id,
//       "entity_name" : props.artistFname || props.venueName|| props.festivalName,
//       "entity_type" : `${(props.imageData.artist_id && "artist") || (props.imageData.venue_id && "venue") || (props.imageData.festival_id && "festival")}`,
//       "user" : props.user?props.user:'guest',
//       "mode" : props.mode
// })
//     return true
//   }
  return (
    <Modal
      
      open={true}
      onClose={props.handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      style={modal_styles.container}
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
              onClick={props.handleClose}
              style={{ float: "right" }}
              className="btn btn-light"
            >
              X
            </button>
          </div>
        <Grid item xs={12} md={8} style={modal_styles.imageContainer}>
          {videoExtensions.some((ext) => props.image.includes(ext)) ? (
            <video
              playsInline
              preload="metadata"
              controls
              src={props.image + "#t=0.2"}
              style={modal_styles.image}
              id = "video"
            />
          ) : (
            <img src={props.image} style={modal_styles.image}  />
          )}
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
          <CommentBox
            textColor={textColor}
            imageData={props.imageData}
            isVenue={props.isVenue}
            isFestival={props.isFestival}
          />
        </Grid>
      </Grid>
    </Modal>
  );
};

export default ImageModal;

ImageModal.propTypes = {
  image: PropTypes.string,
  imageData: PropTypes.object,
  isVenue: PropTypes.bool,
  handleClose: PropTypes.func,
};
