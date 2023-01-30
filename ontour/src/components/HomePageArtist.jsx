import React from "react";
import '../index.css';
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';
import { artistList } from "../ArtistInfo";

export default function HomePageArtist(props)
{
    return (
        <div class="col-4">
            <a href={"/artist?artist="+props.artist}>
            <div class="card bg-light">
                <img src={artistList[props.artist].imageURL} class="d-block w-100" alt="..."/>
                <div class="card-body">
                    <h5 class="card-title fw-bold" style={{color: 'black'}}>{artistList[props.artist].name}</h5>
                    <Rating
                        name="text-feedback"
                        value={props.rating || 0}
                        size = "small"
                        readOnly
                        precision={0.1}
                        emptyIcon={<StarIcon style={{ opacity: 1 }} fontSize="inherit"/>}
                    />
                </div>
            </div>
            </a>
        </div>
    )
}