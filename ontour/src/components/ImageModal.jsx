import React from "react";
import PropTypes from "prop-types";
import artist_styles from "../Styles/artist_styles";
import CommentBox from "./CommentBox";
import { Grid, Modal } from "@mui/material";
import { useState, useEffect } from "react";
import { GetAverageColor, getTextColor, rgbToHex } from "./ColorFunctions";
import buttonStyle from "../Styles/picture_button_styles"
const modal_styles = {
  ...artist_styles.modal,
  image: {
    maxWidth: '100%', // Ensures the image doesn't exceed the width of its container
    maxHeight: '500px', // Sets a maximum height
    objectFit: 'contain', // Keeps the aspect ratio, and ensures the image fits within the constraints
    width: 'auto', // Adjusts width automatically to maintain aspect ratio
    height: 'auto', // Adjusts height automatically to maintain aspect ratio
    margin: 'auto', // Centers the image if it's smaller than the constraints
  },

};

const ImageModal = (props) => {
  const [modalBackgroundColour, setModalBackgroundColour] = useState(
    "rgba(76, 78, 120, 0.9)"
  );
  const [imageBackgroundColour, setImageBackgroundColour] = useState(
    "rgba(5, 2, 14, 1.0)"
  );
  const [textColor, setTextColor] = useState("white");
  const videoExtensions = ["mp4", "mkv", "x-m4v", "quicktime"];
  // define initialize image index 
  const [currentIndex, setCurrentIndex] = useState(props.initialImageIndex|| 0);

  
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
    console.log("Received initialImageIndex:", props.initialImageIndex, "Setting currentIndex to:", props.initialImageIndex);
    setCurrentIndex(props.initialImageIndex || 0);
  }, [props.initialImageIndex]);

  const currentMedia = props.images && props.images.length > 0 ? props.images[currentIndex] : undefined;

  // functions to go back and ford
  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % props.images.length);
  };
  
  const goToPrev = () => {
    setCurrentIndex((prevIndex) => {
      return (prevIndex - 1 + props.images.length) % props.images.length;
    });
  };

  const handleKeyDown = (event) => {
    if (event.key === "ArrowLeft") {
      goToPrev();
    } else if (event.key === "ArrowRight") {
      goToNext();
    }
  };

  useEffect(() => {
    // Add event listener when the component mounts
    window.addEventListener("keydown", handleKeyDown);

    // Clean up event listener when the component unmounts
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);
  
  return (
    <Modal
      open={true}
      onClose={props.handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', ...modal_styles.container }}
    >
      <div style={{ 
        position: 'relative', 
        width: '80%', 
        maxWidth: '1200px', 
        height: '80vh', 
        overflow: 'hidden', 
        borderRadius: '10px', 
        background: `linear-gradient(110deg, ${modalBackgroundColour} 45%, ${imageBackgroundColour})`,
      }}> 
        {/* Close Button */}
        <button 
          onClick={props.handleClose} 
          style={{ 
            position: 'absolute', 
            right: '10px', 
            top: '10px',
            background: 'transparent',
            border: 'none',
            color: '#fff', 
            fontSize: '20px', 
            padding: '10px', 
            cursor: 'pointer',
          }}
        >
          &#10005;
        </button>
  
        {/* Grid Layout, now without direct background style */}
        <Grid
          container
          style={{
            height: '100%',
            width: '100%',
            padding: '10px', // Apply padding here to affect content but not background
          }}
          columnSpacing={0}
          rowSpacing={{ xs: 1, md: 2 }}
        >
          {/* Media Content */}
          <Grid item xs={12} md={8} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
            {/* Previous Button, only shown if there are multiple images */}
            {props.images && props.images.length > 1 && (
              <button 
                onClick={goToPrev} 
                style={{ 
                  position: 'absolute', 
                  left: '10px', 
                  top: '50%', // Adjust this to vertically center
                  transform: 'translateY(-50%)', // Adjust this to vertically center
                  zIndex: 1, 
                  background: 'none',
                  border: 'none',
                  fontSize: '40px', // Adjust size as needed
                  color: `#5f68cc`, // Adjust color as needed
                  cursor: 'pointer'
                }}>
                &#10594; {/* HTML entity for left-pointing arrow */}
              </button>
            )}
  
            {/* Display Current Image or Video */}
            {props.images && props.images.length > 0 ? (
              props.images[currentIndex] && videoExtensions.some((ext) => props.images[currentIndex].includes(ext)) ? (
                <video
                  playsInline
                  preload="metadata"
                  controls
                  loop
                  src={props.images[currentIndex] + "#t=0.5"}
                  style={{ maxHeight: '100%', maxWidth: '100%' }} // Ensure media fits within the grid item
                />
              ) : (
                <img src={props.images[currentIndex]} style={{ maxHeight: '100%', maxWidth: '100%' }} alt="" />
              )
            ) : (
              <p>No media available</p>
            )}
  
            {/* Next Button, only shown if there are multiple images */}
            {props.images && props.images.length > 1 && (
              <button 
                onClick={goToNext} 
                style={{ 
                  position: 'absolute', 
                  right: '10px', 
                  top: '50%', // Adjust this to vertically center
                  transform: 'translateY(-50%)', // Adjust this to vertically center
                  zIndex: 1, 
                  background: 'none',
                  border: 'none',
                  fontSize: '40px', // Adjust size as needed
                  color: '#5f68cc', // Adjust color as needed
                  cursor: 'pointer'
                }}>
                &#10596; {/* HTML entity for right-pointing arrow */}
              </button>
            )}
          </Grid>
  
          {/* Comment Box */}
          <Grid item xs={12} md={4} style={{ overflowY: 'auto', maxHeight: '100%' }}>
            <CommentBox
              textColor={textColor}
              imageData={props.imageData}
              isVenue={props.isVenue}
              isFestival={props.isFestival}
              imageId={props.imageId[currentIndex]}
            />
          </Grid>
        </Grid>
      </div>
    </Modal>
  );
  
  
  
};

export default ImageModal;

ImageModal.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string), // Accept multiple images
  currentImageIndex: PropTypes.number, // Index of the currently displayed image
  imageData: PropTypes.object,
  isVenue: PropTypes.bool,
  handleClose: PropTypes.func,
  isFestival: PropTypes.bool, 
  initialImageIndex: PropTypes.number,
  imageId: PropTypes.arrayOf(PropTypes.number),
};
