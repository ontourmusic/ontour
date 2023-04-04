import React from "react";
import '../index.css';
import Rating from '@mui/material/Rating';
import { useState, useEffect, useRef } from "react";
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import { Divider, Box } from "@mui/material";
import OnTourButton from "./OnTourButton";
import artist_styles from "../Styles/artist_styles";
const styles = artist_styles.header;

function ArtistHeader(props) {
    const [isMobile, setIsMobile] = useState(false)

    const starBoxRef = useRef(null);
    const totalReviewTextRef = useRef(null);

    const handleResize = () => {
        console.log("Resize event triggered");
        if (starBoxRef.current) {
            const starBoxHeight = starBoxRef.current.offsetHeight;
            const starBoxWidth = starBoxRef.current.offsetWidth;
            // totalReviewTextRef.current.style.fontSize = `${starBoxHeight * 0.65}px`;
            totalReviewTextRef.current.style.fontSize = `${starBoxHeight * 0.72}px`;
            totalReviewTextRef.current.style.marginLeft = `${starBoxWidth * 0.05}px`;
        }
        if (window.innerWidth <= 576) {
            setIsMobile(true)
        } else {
            setIsMobile(false)
        }
    }

    const useBeforeRender = (callback, deps) => {
        const [isRun, setIsRun] = useState(false);

        if (!isRun) {
            callback();
            setIsRun(true);
        }

        useEffect(() => () => setIsRun(false), deps);
    };
    useBeforeRender(() => handleResize(), []);

    useEffect(() => {
        console.log("adding event listener for resize");
        window.addEventListener("resize", handleResize);
    }, [])

    return (
        <div 
        // id="artist-background" class="container-fluid jumbotron bg-cover text-white" 
            style={{ 
                backgroundImage: isMobile ? 
                `linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0)), url("${props.image}")` 
                : `linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.5)), url("${props.image}")`, 
                backgroundPosition: props.isVenue ? `center` : `none`,
                backgroundRepeat: `no-repeat`,
                backgroundPosition: `center`,
                backgroundSize: `cover`,
                height: `50vh`,
                position: `relative`,
                display: `flex`,
                flexDirection: 'column-reverse'
            }}
        >
            <Box style={artist_styles.header.Container}>
            {/* <div id="text-contain" style={isMobile ? styles.Mobile : styles.Desktop}> */}
                {props.isVenue==0 && props.onTour && <OnTourButton></OnTourButton>}
                <h1 style={artist_styles.header.ArtistName} class="fw-bold">{props.name} <br></br><span class="fw-light fs-3">{props.city}</span></h1> 
                {/* <h1 id="artist-name" class="fw-bold">{props.name} <span class="fw-light fs-3">{props.city}</span></h1>  */}
                {/* <h1 id="artist-name" class="fw-bold">{props.name}</h1> */}
                {/* <h3 class="fw-light" style={{textAlign: "left"}}>Los Angeles, CA</h3> */}
                {/* <span class="fw-light fs-4" style={{textAlign: "left"}}>Los Angeles, CA</span> */}
                <Divider style={styles.Divider} />
                <div style={styles.RatingRow}>
                    <Rating
                        ref={starBoxRef}
                        name="text-feedback"
                        value={props.rating}
                        // size="large"
                        sx={{fontSize: "4em"}}
                        readOnly
                        precision={0.1}
                        emptyIcon={<StarBorderOutlinedIcon style={styles.StarsIcon} fontSize="inherit" />}
                    />
                    <h1 ref={totalReviewTextRef} style={styles.TotalReviewsText}>({props.total})</h1>
                </div>
            {/* </div> */}
            </Box>
        </div>
    )
}

export default ArtistHeader;
