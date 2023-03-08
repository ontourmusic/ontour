import React from "react";
import '../index.css';
import Rating from '@mui/material/Rating';
import { artistList } from "../ArtistInfo";
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import polaroid_styles from "../Styles/polaroid_styles";
import { Polaroid } from "./Polaroid";


export default function HomePageArtist(props) {
    return (
        <div class="col-12 p-2" onClick={props.onPress} >
            <a href={"/artist?artist=" + props.artist} >
                <div class="card" style={polaroid_styles.polaroid_background}>
                    <img src={artistList[props.artist].imageURL} class="d-block w-100" style={polaroid_styles.polaroid_image} alt="..." />
                    <div class="card-body">
                    <>
                        <h5 class="card-title fw-bold" style={{ color: 'black' }}>{artistList[props.artist].name}</h5>
                        
                        {
                            props.loading ? <div></div>:
                            <div>
                                <Rating
                                    name="text-feedback"
                                    value={props.loading ? 0 : (props.rating || 0)}
                                    size="medium"
                                    readOnly
                                    precision={0.1}
                                    emptyIcon={<StarBorderOutlinedIcon style={{ opacity: 1 }} fontSize="inherit" />}
                                />
                                <div style={{color: 'black', display: 'inline-block', position: 'absolute', bottom: '15px'}}>({props.reviewCount})</div>
                            </div>
                            
                        }
                    </>
                    </div>
                </div>
            </a>
        </div>
    )
}