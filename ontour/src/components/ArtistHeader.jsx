import React from "react";
import '../index.css';

function ArtistHeader(props)
{
    return (
        <div id="artist-background" class="container-fluid jumbotron bg-cover text-white">
            <div id="text-contain" class="container text-center py-5">
                <h1 class="display-4 fw-bold">{props.name}</h1>
                <div class="rating">
                    <input type="radio" name="rating" value="5" id="5"/><label for="5">☆</label>
                    <input type="radio" name="rating" value="4" id="4"/><label for="4">☆</label>
                    <input type="radio" name="rating" value="3" id="3"/><label for="3">☆</label>
                    <input type="radio" name="rating" value="2" id="2"/><label for="2">☆</label>
                    <input type="radio" name="rating" value="1" id="1"/><label for="1">☆</label>
                </div>
            </div>
        </div> 
    )
}

export default ArtistHeader;
