import React from "react";
import '../index.css';
import Rating from '@mui/material/Rating';
import { artistList } from "../ArtistInfo";
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import { Polaroid } from "./Polaroid";
import { useState, useEffect, useRef } from "react";


export default function HomePageArtist(props) {
    const totalReviewTextRef = useRef(null);
    const starBoxRef = useRef(null);

    useEffect(() => {
        if (starBoxRef.current) {
            const starBoxHeight = starBoxRef.current.offsetHeight;
            const starBoxWidth = starBoxRef.current.offsetWidth;
            // totalReviewTextRef.current.style.fontSize = `${starBoxHeight * 0.65}px`;
            totalReviewTextRef.current.style.fontSize = `${starBoxHeight * 0.22}px`;
            totalReviewTextRef.current.style.marginLeft = `${starBoxWidth * 0.05}px`;
        }
    }, [])

    return (
        <Polaroid imageURL={artistList[props.artist].imageURL} link={"/artist?artist=" + props.artist} bottomComponent={
            <>
                <h5 class="card-title fw-bold" style={{ color: 'black' }}>{artistList[props.artist].name}</h5>
                {
                    props.loading ? <div></div>:
                    <div style={styles.RatingRow}>
                        <Rating
                            ref={starBoxRef}
                            name="text-feedback"
                            value={props.loading ? 0 : (props.rating || 0)}
                            size="medium"
                            readOnly
                            precision={0.1}
                            emptyIcon={<StarBorderOutlinedIcon style={{ opacity: 1 }} fontSize="inherit" />}
                        />
                        {/* <div style={{
                            color: 'black', 
                            display: 'inline-block', 
                            position: 'absolute', 
                            bottom: '15px'
                        }}>
                            ({props.reviewCount})
                        </div> */}
                        <div ref={totalReviewTextRef} style={styles.TotalReviewsText}>({props.reviewCount})</div>
                    </div>
                }
            </>
        } />
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
        color: "black",
        position: "center",
    },

}