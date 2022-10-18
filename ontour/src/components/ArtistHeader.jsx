import React from "react";
import '../index.css';
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';

function ArtistHeader(props)
{
    return (
        <div id="artist-background" class="container-fluid jumbotron bg-cover text-white" style={{backgroundImage: `linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.7)), url("${props.image}")`}}>
            <div id="text-contain">
                <h1 id="artist-name" class="fw-bold">{props.name}</h1>
                <Rating
                    name="text-feedback"
                    value={props.rating}
                    size = "large"
                    readOnly
                    precision={0.01}
                    emptyIcon={<StarIcon style={{ opacity: 1 }} fontSize="inherit"/>}
                />
                {/* <p style={{ marginLeft: 15}}>14 reviews</p> */}
            </div>
        </div> 
    )
}

export default ArtistHeader;
