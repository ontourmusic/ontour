import React from "react";
import '../index.css';
import Rating from '@mui/material/Rating';
import { useState, useEffect, useRef } from "react";
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import { Divider, Box } from "@mui/material";

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

    // useEffect(() => {
    //     window.addEventListener("resize", handleResize)
    // })

    useEffect(() => {
        console.log("adding event listener for resize");
        window.addEventListener("resize", handleResize);
        // const starBoxHeight = starBoxRef.current.offsetHeight;
        // console.log("starBoxHeight: ", starBoxHeight);
        // totalReviewTextRef.current.style.fontSize = `${starBoxHeight * 0.5}px`;
    }, [])

    return (
        <div id="artist-background" class="container-fluid jumbotron bg-cover text-white" style={{ backgroundImage: isMobile ? `linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0)), url("${props.image}")` : `linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.5)), url("${props.image}")` }}>
            <div id="text-contain" style={isMobile ? styles.Mobile : styles.Desktop}>
                <h1 id="artist-name" class="fw-bold">{props.name}</h1>
                <Divider style={styles.Divider} />
                <div style={styles.RatingRow}>
                    <Rating
                        ref={starBoxRef}
                        name="text-feedback"
                        value={props.rating}
                        size="large"
                        readOnly
                        precision={0.1}
                        emptyIcon={<StarBorderOutlinedIcon style={styles.StarsIcon} fontSize="inherit" />}
                    />
                    <h1 ref={totalReviewTextRef} style={styles.TotalReviewsText}>({props.total})</h1>
                </div>
            </div>
        </div>
    )
}

const styles = {
    Mobile: {
        background: "linearGradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.5))",
    },
    Desktop: {
        background: "",
    },
    StarsIcon: {
        opacity: 1,
        color: "white",
    },
    RatingRow: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        // justifyContent: "center",
    },
    Divider: {
        backgroundColor: "white",
        // width: "80%",
        height: "2px",
        margin: "auto",
        marginTop: "0.4rem",
        marginBottom: "0.4rem",
    },
    TotalReviewsText: {
        height: "100%",
        color: "white",
        position: "center",
        // margin: "auto",
    },

}

export default ArtistHeader;
