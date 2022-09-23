import React from "react";
import '../index.css';

function ArtistHeader(props)
{
    return (
        <div id="artist-background" class="container-fluid jumbotron bg-cover text-white">
            <div id="text-contain" class="container text-center py-5">
                <h1 class="display-4 fw-bold">{props.name}</h1>
                <p class="font-weight-light mb-0">{props.rating}</p>
            </div>
        </div> 
    )
}

export default ArtistHeader;
