import React from "react";
import '../index.css';
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';

function ArtistHeader(props)
{
    return (
        <div id="artist-background" class="container-fluid jumbotron bg-cover text-white">
            <div id="text-contain" class="container text-center">
                <h1 class="fw-bold">{props.name}</h1>
                <Rating
                    name="text-feedback"
                    value={props.rating}
                    size = "large"
                    readOnly
                    precision={0.01}
                    emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit"/>}
                />
                {/* <p style={{ marginLeft: 15}}>14 reviews</p> */}
            </div>
        </div> 
    )
}

export default ArtistHeader;
