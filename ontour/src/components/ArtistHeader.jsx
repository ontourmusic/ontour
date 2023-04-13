import React from "react";
import '../index.css';
import Rating from '@mui/material/Rating';
import { useState, useEffect, useRef } from "react";
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import { Divider, Box } from "@mui/material";
import OnTourButton from "./OnTourButton";
import artist_styles from "../Styles/artist_styles";
import common_styles from "../Styles/common_styles";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faSquare, faSquareCheck } from '@fortawesome/free-solid-svg-icons';

const window_breakpoints = common_styles.window_breakpoints;
const styles = artist_styles.header;
const verified = artist_styles.verifiedButton;


/*
optional prop made for the festival pages.
    background_position: sets the background position of the image
*/
function ArtistHeader(props) {
    const [isMobile, setIsMobile] = useState(window_breakpoints.md >= window.innerWidth)

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
        setIsMobile(window_breakpoints.md >= window.innerWidth)
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
    useEffect(() => {
        console.log("isMobile useEffect triggered");
    }, [isMobile])

    return (
        <div 
            style={{ 
                backgroundImage: isMobile ? 
                `linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0)), url("${props.image}")` 
                : `linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.5)), url("${props.image}")`, 
                backgroundPosition: props.background_position ? 
                                        props.background_position : 
                                        (isMobile ? `center` : `none`),
                backgroundRepeat: `no-repeat`,
                backgroundSize: `cover`,
                height: `50vh`,
                position: `relative`,
                display: `flex`,
                flexDirection: 'column-reverse'
            }}
        >
            <Box style={artist_styles.header.Container}>
                {props.isVenue==0 && props.onTour && <OnTourButton />}
                
                <h1 style={artist_styles.header.ArtistName} class="fw-bold">{props.name} {props.isVenue==1 && props.verified && <img src="images/verifiedBadge.png" style={verified}></img>}
                <br></br><span class="fw-light fs-3">{props.city}</span> 
                </h1> 
                <Divider style={styles.Divider} />
                <div style={styles.RatingRow}>
                    <Rating
                        ref={starBoxRef}
                        name="text-feedback"
                        value={props.rating}
                        // size="large"
                        sx={{fontSize: "3em"}}
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
