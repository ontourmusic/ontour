import React, { useState } from "react";
import PropTypes from "prop-types";
import "../index.css";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import polaroid_styles from "../Styles/polaroid_styles";
import { Translate } from "@mui/icons-material";
import { Button } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";

/* 
expected props:
    - imageURL: string
    - link (optional): string (if not provided, the polaroid will not be clickable
*/
const Polaroid = (props) => {
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };
  // console.log(props.imageUrl, "imgurl");
  // console.log(props.videoUrl, "videourl");
  return (
    <>
      {props.imageUrl != null && (
        <div onClick={props.onPress} style={polaroid_styles.polaroid_container}>
          <img
            src={props.imageUrl}
            class="d-block w-100"
            style={polaroid_styles.polaroid_image}
            alt="..."
          />
        </div>
      )}
      {props.videoUrl != null && (
        <>
          <div
            data-src1={props.videoUrl}
            onClick={props.onPress}
            style={{
              backgroundColor: isHovering ? "rgba(0,0,0,.5)" : "rgba(0,0,0)",
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
              // cursor: "pointer",
              pointerEvents: "auto",
              transition: "background-color 0.3s, width 0.3s",
            }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            &#9658;
            {/* <FontAwesomeIcon data-src1 = {props.videoUrl}   icon={faPlay} /> */}
          </div>
          <div
            onClick={props.onPress}
            data-src1={props.videoUrl}
            style={polaroid_styles.polaroid_container}
          >
            <video
              onClick={props.onPress}
              data-src1={props.videoUrl}
              autoplay
              playsInline
              preload="metadata"
              src={props.videoUrl + "#t=0.2"}
              class="d-block w-100"
              style={polaroid_styles.polaroid_image}
            />
          </div>
        </>
      )}
    </>
  );
};

export { Polaroid };

Polaroid.propTypes = {
  onPress: PropTypes.func,
  imageURL: PropTypes.string,
  link: PropTypes.string,
};
