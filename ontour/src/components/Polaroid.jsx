import React from "react";
import PropTypes from "prop-types";
import "../index.css";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import polaroid_styles from "../Styles/polaroid_styles";
import { Translate } from "@mui/icons-material";

/* 
expected props:
    - imageURL: string
    - link (optional): string (if not provided, the polaroid will not be clickable
*/
const Polaroid = (props) => {
  console.log(props.imageUrl, "imgurl");
  console.log(props.videoUrl, "videourl");
  return (
    <>
     
      {props.imageUrl != null && 
        <div onClick={props.onPress} style={polaroid_styles.polaroid_container}>
          <img
            src={props.imageUrl}
            class="d-block w-100"
            style={polaroid_styles.polaroid_image}
            alt="..."
          />
        </div>
      }
      {props.videoUrl != null && 
        <>
          <div
            onClick={props.onPress}
            style={polaroid_styles.polaroid_container}
          >
            <video
              
              autoplay
              playsInline
              preload="metadata"
              src={props.videoUrl}
              class="d-block w-100"
              style={polaroid_styles.polaroid_image}
             
            />
          </div>
          <div
            style={{
              backgroundColor: "rgba(0,0,0,.7)",
              color: "white",
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%,-50%)",
              zIndex: 1,
              width: "4rem",
              height: "3rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "10px",
              cursor: "pointer",
            }}
          >
            <PlayArrowIcon style={{ width: "2rem", height: "2rem" }} />
          </div>
        </>
      }
    </>
  );
};

export { Polaroid };

Polaroid.propTypes = {
  onPress: PropTypes.func,
  imageURL: PropTypes.string,
  link: PropTypes.string,
};
