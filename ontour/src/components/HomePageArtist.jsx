import React from "react";
import '../index.css';
import Rating from '@mui/material/Rating';
import { artistList } from "../ArtistInfo";
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import { Polaroid } from "./Polaroid";


export default function HomePageArtist(props) {
    return (
        <Polaroid imageURL={artistList[props.artist].imageURL} link={"/artist?artist=" + props.artist} bottomComponent={
            <>
                <h5 class="card-title fw-bold" style={{ color: 'black' }}>{artistList[props.artist].name}</h5>
                <Rating
                    name="text-feedback"
                    value={props.loading ? 0 : (props.rating || 0)}
                    size="small"
                    readOnly
                    precision={0.1}
                    emptyIcon={<StarBorderOutlinedIcon style={{ opacity: 1 }} fontSize="inherit" />}
                />
            </>
        } />
    )
}