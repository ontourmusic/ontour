import React from "react";
import '../index.css';
import Rating from '@mui/material/Rating';
import { useState, useEffect, useRef } from "react";
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import { Divider, Box } from "@mui/material";
import OnTourButton from "./OnTourButton";
import artist_styles from "../Styles/artist_styles";
import common_styles from "../Styles/common_styles";
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { Grid } from "@mui/material";
import home_styles from "../Styles/home_styles";
import header_styles from "../Styles/header_styles";

const modal_styles = artist_styles.modal;
const window_breakpoints = common_styles.window_breakpoints;
const styles = artist_styles.header;
const verified = artist_styles.verifiedButton;

function ArtistHeader(props) {
    const [images, setImages] = useState([]);
    const [imageLoad, setImageLoad] = useState(false);
    const [isMobile, setIsMobile] = useState(false)
    const [model, setModel] = useState(false);
    const [open, setOpen] = useState(false);
    const handleClose = () => setOpen(false);

    const starBoxRef = useRef(null);
    const totalReviewTextRef = useRef(null);

    const handleResize = () => {
        console.log("Resize event triggered");
        if (starBoxRef.current) {
            const starBoxHeight = starBoxRef.current.offsetHeight;
            const starBoxWidth = starBoxRef.current.offsetWidth;
            // totalReviewTextRef.current.style.fontSize = `${starBoxHeight * 0.65}px`;
            totalReviewTextRef.current.style.fontSize = `${starBoxHeight * 0.72}px`;
            totalReviewTextRef.current.style.marginLeft = `${starBoxWidth * 0.05}px`;
        }
        setIsMobile(window_breakpoints.md >= window.innerWidth)
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

    const handleAllPhotosClick = () => {
        setOpen(true);
        setModel(true);
    }

    useEffect(() => {
        if (props.images.length > 0) {
            setImageLoad(true);
            setImages(props.images);
            console.log("setting images");
            console.log(props.images);
        }
        console.log("adding event listener for resize");
        window.addEventListener("resize", handleResize);
    }, [props.images])

    return (
        <div
            style={{
                backgroundImage: isMobile ?
                    `linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0)), url("${props.image}")`
                    : `linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.5)), url("${props.image}")`,
                backgroundPosition: isMobile ? `center` : `none`,
                backgroundRepeat: `no-repeat`,
                backgroundSize: `cover`,
                height: `50vh`,
                position: `relative`,
                display: `flex`,
                flexDirection: 'column-reverse'
            }}
        >
            <Box style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
            }}>
                <div style={artist_styles.header.Container}>
                    {props.isVenue == 0 && props.onTour && <OnTourButton></OnTourButton>}

                    <h1 style={artist_styles.header.ArtistName} class="fw-bold">{props.name} {props.isVenue == 1 && props.verified && <img src="images/verifiedBadge.png" style={verified}></img>}
                        <br></br><span class="fw-light fs-3">{props.city}</span>
                    </h1>
                    <Divider style={styles.Divider} />
                    <div style={styles.RatingRow}>
                        <Rating
                            ref={starBoxRef}
                            name="text-feedback"
                            value={props.rating}
                            // size="large"
                            sx={{ fontSize: "3em" }}
                            readOnly
                            precision={0.1}
                            emptyIcon={<StarBorderOutlinedIcon style={styles.StarsIcon} fontSize="inherit" />}
                        />
                        <h1 ref={totalReviewTextRef} style={styles.TotalReviewsText}>({props.total})</h1>
                    </div>
                </div>
                <div style={header_styles.button_position}>
                    <Button
                        style={header_styles.button}
                        variant="outlined"
                        type='submit' 
                        onClick={handleAllPhotosClick}>
                        See All Photos
                    </Button>
                </div>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={modal_styles.container}>
                        <Grid item xs={12} container spacing={2}>
                            <Grid item xs={12}>
                                <h1 style={{ color: "black" }} class="homebanner">Photos for {props.name}</h1>
                            </Grid>
                            {images.map((image, index) => {
                                return (
                                    <Grid item xs={6} md={4} lg={3}>
                                        <div 
                                            // onClick={() => {handleTileClick()}}
                                            // onMouseEnter={handleMouseEnter}
                                            // onMouseLeave={handleMouseLeave}
                                            style={header_styles.imageTile.container}
                                        >
                                            <img 
                                                src={image} alt="" style={header_styles.imageTile.image} 
                                            />
                                        </div>
                                    </Grid>
                                );
                            })}
                        </Grid>
                    </Box>
                </Modal>
            </Box>

        </div>

    )
}

export default ArtistHeader;
