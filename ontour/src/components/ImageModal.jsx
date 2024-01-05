import React from "react";
import PropTypes from "prop-types";
import artist_styles from "../Styles/artist_styles";
import CommentBox from "./CommentBox";
import { Grid, Modal } from "@mui/material";
import { useState, useEffect } from "react";
import { GetAverageColor, getTextColor, rgbToHex } from "./ColorFunctions";
const modal_styles = artist_styles.modal;

const ImageModal = (props) => {
  const [modalBackgroundColour, setModalBackgroundColour] = useState(
    "rgba(76, 78, 120, 0.9)"
  );
  const [imageBackgroundColour, setImageBackgroundColour] = useState(
    "rgba(5, 2, 14, 1.0)"
  );
  const [textColor, setTextColor] = useState("white");
  const videoExtensions = ["mp4", "mkv", "x-m4v", "quicktime"];
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
    // handleAverageColorButton(props.image);
    /*
        options:
        linear-gradient(110deg, #2d2d4e, 60%, #ccd0de)
        linear-gradient(110deg, #4c4e78, 42%, #05020e)
        */
  }, []);
  console.log(props.image);
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
              loop
              src={props.image + "#t=0.2"}
              style={modal_styles.image}
            />
          ) : (
            <img src={props.image} style={modal_styles.image} />
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
         

          <CommentBox
            textColor={textColor}
            imageData={props.imageData}
            isVenue={props.isVenue}
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
