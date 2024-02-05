// import React from "react";
import PropTypes from "prop-types";
import "../Styles/hometile.css";
import Rating from "@mui/material/Rating";
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import home_styles from "../Styles/home_styles";
import React, { useState } from "react";
import CircularProgress from '@mui/material/CircularProgress';

export default function HomeTile(props) {
    const [isImageLoading, setImageLoading] = useState(true);
  const totalReviewTextRef = useRef(null);
  const starBoxRef = useRef(null);
  const overlayRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    if (starBoxRef.current) {
      // const starBoxHeight = starBoxRef.current.offsetHeight;
      const starBoxWidth = starBoxRef.current.offsetWidth;
      totalReviewTextRef.current.style.marginLeft = `${starBoxWidth * 0.05}px`;
    }
  }, []);
  const searchName = props.loading
    ? ""
    : props.name.replace(/\s+/g, "_").toLowerCase();
  const link = props.isArtist
    ? "/artist?artist=" + searchName + "&id=" + props.id
    : "/venue?venue=" + searchName + "&id=" + props.id;

  const navigate = useNavigate();
  const handleTileClick = () => {
    document.body.style.cursor = "initial";
    console.log("clicked");
    navigate(link);
  };

    const handleImageLoaded = () => {
        setImageLoading(false);
    }
  const handleMouseEnter = (e) => {
    overlayRef.current.style.opacity = 1;
    imageRef.current.style.opacity = 0.4;
    document.body.style.cursor = "pointer";
  };
  const handleMouseLeave = (e) => {
    overlayRef.current.style.opacity = 0;
    imageRef.current.style.opacity = 1;
    document.body.style.cursor = "initial";
  };

    return (
        <div 
            onClick={() => {handleTileClick()}}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={home_styles.homeTile.container}
        >
            {isImageLoading && (
                <div style={home_styles.homeTile.spinner}>
                    <CircularProgress />
                </div>
            )}
            <img 
                onLoad={handleImageLoaded}
                style={{ 
                    display: isImageLoading ? 'none' : 'block', 
                    ...home_styles.homeTile.image 
                }}
                ref={imageRef}
                src={props.imageURL} alt="" 
            />
            <div ref={overlayRef} style={home_styles.homeTile.middle}>
                <h1 className="text">{props.name}</h1>
                <div style={styles.RatingRow}>
                    <Rating
                        ref={starBoxRef}
                        name="text-feedback"
                        value={props.loading ? 0 : (props.rating || 0)}
                        size="medium"
                        readOnly
                        precision={0.1}
                        emptyIcon={<StarBorderOutlinedIcon style={{ opacity: 1, color: "white" }} fontSize="inherit" />}
                    />
                    <div ref={totalReviewTextRef} style={styles.TotalReviewsText}>
                        ({props.reviewCount ? props.reviewCount : 0})
                    </div>
                </div>
            </div>
        </div>
    )
}

const styles = {
  RatingRow: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    spacing: 1,
  },
  TotalReviewsText: {
    marginLeft: "0.5rem",
    color: "white",
    position: "center",
  },
};

HomeTile.propTypes = {
  name: PropTypes.string,
  imageURL: PropTypes.string,
  rating: PropTypes.number,
  reviewCount: PropTypes.number,
  isArtist: PropTypes.bool,
  id: PropTypes.string,
  loading: PropTypes.bool,
};