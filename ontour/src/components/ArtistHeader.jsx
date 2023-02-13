import React from "react";
import '../index.css';
import Rating from '@mui/material/Rating';
import { useState, useEffect } from "react";
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import { Divider, Box } from "@mui/material";

function ArtistHeader(props) {
    const [isMobile, setIsMobile] = useState(false)

    const handleResize = () => {
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
        window.addEventListener("resize", handleResize)
    })

    return (
        <div id="artist-background" class="container-fluid jumbotron bg-cover text-white" style={{ backgroundImage: isMobile ? `linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0)), url("${props.image}")` : `linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.5)), url("${props.image}")` }}>
            <div id="text-contain" style={isMobile ? styles.Mobile : styles.Desktop}>
                <h1 id="artist-name" class="fw-bold">{props.name}</h1>
                <Divider style={styles.Divider} />
                <div style={styles.RatingRow}>
                    <Rating
                        name="text-feedback"
                        value={props.rating}
                        // size="large"
                        readOnly
                        precision={0.1}
                        emptyIcon={<StarBorderOutlinedIcon style={styles.StarsIcon} fontSize="inherit" />}
                    />
                    {/* <Box sx={{ ml: 2 }}>{props.total}</Box> */}
                    {/* <div style={styles.ReviewCountBox}>
                        <h1 class="fw-bold">({props.total})</h1>
                    </div> */}
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
        fontSize: "1.5rem",
    },
    ReviewCountBox: {
        paddingLeft: "0.5rem",
    },
    Divider: {
        backgroundColor: "white",
        // width: "80%",
        height: "2px",
        margin: "auto",
        marginTop: "0.4rem",
        marginBottom: "0.4rem",
    },

}

export default ArtistHeader;
