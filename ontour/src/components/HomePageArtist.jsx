import React from "react";
import '../index.css';
import Rating from '@mui/material/Rating';
import { artistList } from "../ArtistInfo";
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';

import styles from '../Styles/styles';

export default function HomePageArtist(props) {
    return (
        <div class="col-4">
            <a href={"/artist?artist=" + props.artist}>
                <div class="card bg-light">
                    <img src={artistList[props.artist].imageURL} class="d-block w-100" style={styles.polaroid_image} alt="..." />
                    <div class="card-body">
                        <h5 class="card-title fw-bold" style={{ color: 'black' }}>{artistList[props.artist].name}</h5>
                        <Rating
                            name="text-feedback"
                            value={props.loading ? 0 : (props.rating || 0)}
                            size="small"
                            readOnly
                            precision={0.1}
                            emptyIcon={<StarBorderOutlinedIcon style={{ opacity: 1 }} fontSize="inherit" />}
                        />
                    </div>
                </div>
            </a>
        </div>
    )
}