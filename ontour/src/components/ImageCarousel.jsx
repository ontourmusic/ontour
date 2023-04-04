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
import artist_styles from "../Styles/artist_styles";
const carousel_styles = artist_styles.carousel;

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

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 1000,
        height: 600,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
        borderRadius: '10px',
      };

    const handleImageClick = async (e) => {
        console.log("handleImageClick: ", e.target.src);
        
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
    useEffect(() => {
        if (props.images.length > 0) {
            setImageLoad(true);
            setImages(props.images);
        }
    }, [props.images]);

    return (
        <><div id="gallery" class="row" style={{ marginTop: "0" }}>
            <div class="col-9 align-self-center">
                <h4 class="fw-bold ">Captured Moments</h4>
            </div>
            <div class="col-3 m-0 no-text-align">
                <AddMediaButton artistID={props.artistID}/>
            </div>
        </div><CarouselProvider
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
                    <Box sx={style}>
                        <div style={{ width: '100%', height: '100%' }}>
                            <div className='row' style={{ width: '100%', height: '100%' }}>
                                <div className='col-8 align-self-center'>
                                    <img src={tempImg} style={{ width: '100%', height: '100%', borderRadius: '10px' }} />
                                </div>
                                <div className='col-4'>
                                    {/* <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                        <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                                        <TextField id="input-with-sx" label="Add a comment" variant="standard" />
                                    </Box> */}
                                    <CommentBox imageId={image_id}/>
                                </div>
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