import React, { useState,useEffect } from "react";
import PropTypes from "prop-types";
import "../index.css";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import polaroid_styles from "../Styles/polaroid_styles";
import { Translate } from "@mui/icons-material";
import { Button } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import CircularProgress from '@mui/material/CircularProgress';
import home_styles from "../Styles/home_styles";
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

  useEffect(() => {
    if(props.imageUrl != null){
      const img = new Image();
      img.src = props.imageUrl;
      img.onload = () => {
        img.decode()
          .then(() => {
            props.loadFinished(); // Set the source to trigger rendering
          })
          .catch((error) => {
            console.error("Error decoding the image", error);
            // Handle the error (e.g., set a fallback image or a flag to show an error state)
          });
      };
      img.onerror = (error) => {
        console.error("Error loading the image", error, props.imageUrl);
        props.loadFinished();
        // Handle the error (e.g., set a fallback image or a flag to show an error state)
      };

      return () => {
        img.onload = null;
        img.onerror = null;
      };
    }
    else if(props.videoUrl != null){
      const video = document.createElement('video');
      // Assign the source URL to the video element
      video.src = props.videoUrl;
      video.onloadeddata = () => {
        // Video has loaded enough data to play at least a few frames
        props.loadFinished(); // Perform actions after the video is ready
      };
      video.onerror = (error) => {
        // Handle video loading error
        console.error("Error loading the video", error, props.videoUrl);
        props.loadFinished(); // You might still want to remove the loading indicator or handle errors
      };

    }
  }, [props.imageUrl, props.videoUrl]);

  const handleMouseLeave = () => {
    setIsHovering(false);
  };
  // console.log(props.imageUrl, "imgurl");
  // console.log(props.videoUrl, "videourl");
  return (
    <>
      {props.imageUrl != null &&(
        <>
        <div onClick={props.onPress} style={polaroid_styles.polaroid_container}>
          {
          props.loading && 
            <div style={{  ...polaroid_styles.polaroid_image,backgroundColor:"grey",display: 'flex', justifyContent: 'center', alignItems: 'center',}}>
              <CircularProgress />
            </div>
          }
          <img
            src={props.imageUrl}
            onLoad={props.onLoad} // Trigger the onLoad event when the image is loaded
            class="d-block w-100"
            style={{ ...polaroid_styles.polaroid_image, opacity: props.loading ? 0 : 1}}
            alt="..."
            // onLoad={props.loadFinished()}
          />
          
        </div>
        </>
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
const areEqual = (prevProps, nextProps) => {
  
  return prevProps.imageURL === nextProps.imageURL && prevProps.loading === nextProps.loading;
};
const MemoizedPolaroid = React.memo(Polaroid, areEqual);

export { MemoizedPolaroid as Polaroid };

Polaroid.propTypes = {
  onPress: PropTypes.func,
  imageUrl: PropTypes.string,
  link: PropTypes.string,
  loadFinished: PropTypes.func,
  loading: PropTypes.bool,
};
