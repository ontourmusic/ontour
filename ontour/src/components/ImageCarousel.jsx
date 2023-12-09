import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext, DotGroup } from 'pure-react-carousel';
import "pure-react-carousel/dist/react-carousel.es.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import '../Styles/carousel.css';
import { Polaroid } from "./Polaroid";
import { AddMediaButton } from "./Buttons";
import { createClient } from '@supabase/supabase-js'
import { Typography } from "@mui/material";
import ImageModal from "./ImageModal";

import artist_styles from "../Styles/artist_styles";
const carousel_styles = artist_styles.carousel;



/*
images: array of image urls
*/
const ImageCarousel = (props) => {
    const [images, setImages] = useState([]);
    const [videos,setVideos] = useState([])
    const [imageLoad, setImageLoad] = useState(false);
    const [model, setModel] = useState(false);
    const [tempImg, setTemp] = useState('');
    const [open, setOpen] = React.useState(false);
    const handleClose = () => setOpen(false); 
    const [imageData, setImageData] = useState([]);
    const supabase = createClient('https://zouczoaamusrlkkuoppu.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpvdWN6b2FhbXVzcmxra3VvcHB1Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY3ODE1ODUyMSwiZXhwIjoxOTkzNzM0NTIxfQ.LTuL_u0tzmsj8Zf9m6JXN4JivwLq1aRXvU2YN-nDLCo');

    const handleImageClick = async (e) => {
        console.log("video dataset attribute",e.target.dataset.src1)
        console.log("handleImageClick: ", e.target.src);
        console.log(e.target)
        const source = e.target.dataset.src1?e.target.dataset.src1:e.target.src
        var urlTag = e.target.tagName == 'IMG'?"image_url":"video_url"
        if (props.isVenue) {
            const { data, error } = await supabase
                .from('venue_carousel_images')
                .select('id')
                .eq(urlTag, source)
                .single()

            if (error) {
                console.error(error)
                return null
            }
            setImageData(data);
            console.log("image_id: ", data.id)
            setOpen(true);
            setTemp(source);
            setModel(true);

        }
        else {
            const { data, error } = await supabase
                .from('artist_images')
                .select('*')
                .eq(urlTag, source)
                .single()

            if (error) {
                console.error(error)
                return null
            }
            setImageData(data);
            setOpen(true);
            setTemp(source);
            setModel(true);
        }
    }
    useEffect(() => {
        if (props.images.length > 0) {
            setImageLoad(true);
            setImages(props.images);
        }
        if (props.videos.length > 0) {
           
            setVideos(props.videos);
        }
    }, [props.images,props.videos]);

    return (
        <>
            <div style={carousel_styles.titleBar}>
                <Typography variant="h5" align="left" className="fw-bold" style={{
                    marginRight: "15px",
                }}>Captured Moments</Typography>
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
                {/* <Slider>
                    {images.map((image, index) => {
                        console.log(image,"image")
                        return (
                            <Slide index={index}
                                style={carousel_styles.slide}
                            >
                                <Polaroid
                                    key={index}
                                    onPress={handleImageClick}
                                    url={image}
                                />
                            </Slide>
                        );
                    })}                    
                </Slider> */}
                <Slider>                                         
                            {images.length && images.map((image, index) => {
                                console.log(image,"image")
                                if(image){
                                    return (
                                        <Slide style={carousel_styles.slide}> 
                                            <Polaroid
                                                key={index}
                                                onPress={handleImageClick}
                                                imageUrl={image}
                                                 
                                            />
                                        </Slide>
                                    );
                                }
                               
                            })}
                             {videos.length && videos.map((video, index) => {
                                console.log(video,"video")
                                if(video){
                                    return (
                                        <Slide style={carousel_styles.slide}> 
                                            <Polaroid
                                                key={index}
                                                onPress={handleImageClick}
                                                videoUrl={video}
    
                                            />
                                            </Slide>
                                    );
                                }
                               
                            })}
                      
                </Slider>
                {open && 
                    <ImageModal 
                        handleClose={handleClose} 
                        image={tempImg} 
                        imageData={imageData}
                        isVenue={props.isVenue}
                    />
                    }
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

ImageCarousel.propTypes = {
    images: PropTypes.arrayOf(PropTypes.string),
    slideCount: PropTypes.number,
    isVenue: PropTypes.bool,

    // you only need one of these two
    artistID: PropTypes.string,
    venueID: PropTypes.string,
};