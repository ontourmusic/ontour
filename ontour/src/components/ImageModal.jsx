import React from "react";
import PropTypes from "prop-types";
import artist_styles from "../Styles/artist_styles";
import CommentBox from "./CommentBox";
import { Grid, Modal } from "@mui/material";
import { useState, useEffect } from "react";
import { GetAverageColor, getTextColor, rgbToHex } from "./ColorFunctions";
import { HelpfulButton, UnhelpfulButton } from "./Buttons";
import { useAuth0 } from "@auth0/auth0-react";
import { createClient } from "@supabase/supabase-js";
const modal_styles = artist_styles.modal;

const ImageModal = (props) => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const supabase = createClient(
    "https://zouczoaamusrlkkuoppu.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpvdWN6b2FhbXVzcmxra3VvcHB1Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY3ODE1ODUyMSwiZXhwIjoxOTkzNzM0NTIxfQ.LTuL_u0tzmsj8Zf9m6JXN4JivwLq1aRXvU2YN-nDLCo"
  );
  const [modalBackgroundColour, setModalBackgroundColour] = useState(
    "rgba(76, 78, 120, 0.9)"
  );
  const [imageBackgroundColour, setImageBackgroundColour] = useState(
    "rgba(5, 2, 14, 1.0)"
  );
  const [textColor, setTextColor] = useState("white");
  const videoExtensions = ["mp4", "mkv", "x-m4v", "quicktime"];
  const [isHelpfulActive, setIsHelpfulActive] = useState(
    isAuthenticated && props.imageData.likedUsers.includes(user.username)
  );
  const [isUnhelpfulActive, setIsUnhelpfulActive] = useState(
    isAuthenticated && props.imageData.dislikedUsers.includes(user.username)
  );
  const [count, setCount] = useState(props.imageData.likeCount);
  const handleNotLogin = (event) => {
    alert("Please login to like or dislike an image.");
  };
  const handleHelpful = (event) => {
    // event.currentTarget.classList.toggle("fw-bold");
    // event.currentTarget.classList.toggle("btn-outline-light");
    console.log("????", isHelpfulActive);
    if (!isHelpfulActive) {
      if (isUnhelpfulActive) {
        setIsUnhelpfulActive(false);
        setCount(count + 1);
        removedUnlikedUser(user.username);
        postData(count + 1);
      } else {
        setIsHelpfulActive(true);
        setCount(count + 1);
        addLikedUser(user.username);
        postData(count + 1);
      }
    } else {
      // de-selecting helpful
      setIsHelpfulActive(false);
      setCount(count - 1);
      removeLikedUser(user.username);
      postData(count - 1);
    }
  };

  const handleUnHelpful = (event) => {
    // event.currentTarget.classList.toggle("fw-bold");
    // event.currentTarget.classList.toggle("btn-outline-light");
    if (!isUnhelpfulActive) {
      if (isHelpfulActive) {
        setIsHelpfulActive(false);
        setCount(count - 1);
        removeLikedUser(user.username);
        postData(count - 1);
      } else {
        setIsUnhelpfulActive(true);
        setCount(count - 1);
        addUnlikedUser(user.username);
        postData(count - 1);
      }
    } else {
      // de-selecting unhelpful
      setIsUnhelpfulActive(false);
      setCount(count + 1);
      removedUnlikedUser(user.username);
      postData(count + 1);
    }
  };
  const imageTable = "artist_images";
  const addLikedUser = async (user) => {
    console.log("....", user);
    const { data, error } = await supabase
      .from(imageTable)
      .update({ likedUsers: [...props.imageData.likedUsers, user] })
      .eq("id", props.imageData.id);
  };

  const removeLikedUser = async (user) => {
    const { data, error } = await supabase
      .from(imageTable)
      .update({
        likedUsers: props.imageData.likedUsers.filter((u) => u != user),
      })
      .eq("id", props.imageData.id);
  };

  const addUnlikedUser = async (user) => {
    const { data, error } = await supabase
      .from(imageTable)
      .update({ dislikedUsers: [...props.imageData.dislikedUsers, user] })
      .eq("id", props.imageData.id);
  };

  const removedUnlikedUser = async (user) => {
    const { data, error } = await supabase
      .from(imageTable)
      .update({
        dislikedUsers: props.imageData.dislikedUsers.filter((u) => u != user),
      })
      .eq("id", props.imageData.id);
  };

  const postData = async (currCount) => {
    const { data, error } = await supabase
      .from(imageTable)
      .update({ likeCount: currCount })
      .eq("id", props.imageData.id);
  };

  console.log(props, "modal");
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
    console.log(props.image);
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
        style={{ position: "relative" }}
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
        <div style={{ position: "absolute", right: 10, height: "2rem" }}>
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
          {/* abcd */}
          <CommentBox
            textColor={textColor}
            imageData={props.imageData}
            isVenue={props.isVenue}
            isFestival={props.isFestival}
          />
        </Grid>
        {isAuthenticated ? (
          <>
            <div className="d-flex justify-content-start">
              <div className="mr-3">
                <HelpfulButton
                  onPress={handleHelpful}
                  isHelpfulActive={isHelpfulActive}
                  isUnhelpfulActive={isUnhelpfulActive}
                />
              </div>
              <span className="count" style={{ margin: "10px" }}>
                {count}
              </span>
              <div>
                <UnhelpfulButton
                  onPress={handleUnHelpful}
                  isUnhelpfulActive={isUnhelpfulActive}
                  isHelpfulActive={isHelpfulActive}
                />
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="d-flex justify-content-start">
              <div className="mr-3">
                <HelpfulButton onPress={handleNotLogin} />
              </div>
              <span className="count" style={{ margin: "10px" }}>
                {count}
              </span>
              <div>
                <UnhelpfulButton onPress={handleNotLogin} />
              </div>
            </div>
          </>
        )}
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
