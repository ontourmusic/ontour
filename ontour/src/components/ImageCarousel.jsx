import React, { useState, useEffect } from "react";
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext, DotGroup } from 'pure-react-carousel';
import "pure-react-carousel/dist/react-carousel.es.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import '../Styles/carousel.css';
import { Polaroid } from "./Polaroid";
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { AddMediaButton } from "./Buttons";
import CommentBox from "./CommentBox";
import { createClient } from '@supabase/supabase-js'
import { Grid, Typography } from "@mui/material";

import artist_styles from "../Styles/artist_styles";
const carousel_styles = artist_styles.carousel;
const modal_styles = artist_styles.modal;


/*
images: array of image urls
*/
const ImageCarousel = (props) => {

    const [images, setImages] = useState([]);
    const [imageLoad, setImageLoad] = useState(false);
    const [model, setModel] = useState(false);
    const [tempImg, setTemp] = useState('');
    const [open, setOpen] = React.useState(false);
    const handleClose = () => setOpen(false);
    const [image_id, setImageId] = useState(0);
    const supabase = createClient('https://zouczoaamusrlkkuoppu.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpvdWN6b2FhbXVzcmxra3VvcHB1Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY3ODE1ODUyMSwiZXhwIjoxOTkzNzM0NTIxfQ.LTuL_u0tzmsj8Zf9m6JXN4JivwLq1aRXvU2YN-nDLCo');

    const handleImageClick = async (e) => {
        console.log("handleImageClick: ", e.target.src);

        if (props.isVenue) {
            const { data, error } = await supabase
                .from('venue_carousel_images')
                .select('id')
                .eq('image_url', e.target.src)
                .single()

            if (error) {
                console.error(error)
                return null
            }
            setImageId(data.id);
            console.log("image_id: ", data.id)
            setOpen(true);
            setTemp(e.target.src);
            setModel(true);

        }
        else {
            const { data, error } = await supabase
                .from('artist_images')
                .select('id')
                .eq('image_url', e.target.src)
                .single()

            if (error) {
                console.error(error)
                return null
            }
            setImageId(data.id);
            console.log("image_id: ", data.id)
            setOpen(true);
            setTemp(e.target.src);
            setModel(true);
        }
    }
    useEffect(() => {
        if (props.images.length > 0) {
            setImageLoad(true);
            setImages(props.images);
        }
    }, [props.images]);

    return (
        <>
            <div style={carousel_styles.titleBar}>
                <Typography variant="h5" align="left" className="fw-bold">Captured Moments</Typography>
                <AddMediaButton artistID={props.artistID} isVenue={props.isVenue} venueID={props.venueID} />
            </div>
            <CarouselProvider
                orientation="horizontal"
                visibleSlides={props.slideCount}
                totalSlides={props.images.length}
                step={props.slideCount}
                naturalSlideWidth={50}
                naturalSlideHeight={50}
                isIntrinsicHeight={true}
                style={carousel_styles.container}
            >
                <Slider>
                    {images.map((image, index) => {
                        return (
                            <Slide index={index}
                                style={carousel_styles.slide}
                            >
                                <Polaroid
                                    key={index}
                                    onPress={handleImageClick}
                                    imageURL={image}
                                />
                            </Slide>
                        );

                    })}
                </Slider>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={modal_styles.container}>
                        <div className='row' style={modal_styles.innerGrid}>
                            <div className='col-8 align-self-center'>
                                <img src={tempImg} style={modal_styles.image} />
                            </div>
                            <div className='col-4'>
                                {/* <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                        <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                                        <TextField id="input-with-sx" label="Add a comment" variant="standard" />
                                    </Box> */}
                                <CommentBox imageId={image_id} isVenue={props.isVenue} />
                            </div>
                        </div>
                    </Box>
                </Modal>
                <div className="controls">
                    <ButtonBack className="btn-arrow" style={{ color: "black" }}>
                        <FontAwesomeIcon icon={faAngleLeft} size="lg" />
                    </ButtonBack>
                    <DotGroup className="dot-group" />
                    <ButtonNext className="btn-arrow" style={{ color: "black" }}>
                        <FontAwesomeIcon icon={faAngleRight} size="lg" />
                    </ButtonNext>
                </div>
            </CarouselProvider></>
    )
};


export default ImageCarousel;