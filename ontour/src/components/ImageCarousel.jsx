import React, { useState, useEffect,useRef } from "react";
import PropTypes from "prop-types";
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext, DotGroup } from 'pure-react-carousel';
import "pure-react-carousel/dist/react-carousel.es.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import '../Styles/carousel.css';
import { Polaroid } from "./Polaroid";
import { AddMediaButton } from "./Buttons";
import { Typography } from "@mui/material";
import ImageModal from "./ImageModal";
import {supabase} from "../components/supabaseClient"

import artist_styles from "../Styles/artist_styles";
const carousel_styles = artist_styles.carousel;



/*
images: array of image urls
*/
const ImageCarousel = (props) => {
    //Handle image loading
    const cleanedImageArray = props.images.filter(Boolean);
    const imageUrlsLength = cleanedImageArray.length;

    const cleandVideoArray = props.videos.filter(Boolean);
    const videoUrlsLength = cleandVideoArray.length;

    const [PolaroidLoading, setPolaroidLoading] = useState(true);
    const loadedCountRef = useRef(0);
    
    // Start loading when imageUrls and videoUrls change
    useEffect(() => {
        setPolaroidLoading(true); 
        loadedCountRef.current = 0; 
    }, [JSON.stringify(props.images.concat(props.videos))]);

    const handleImageLoad = () => {
        loadedCountRef.current += 1;
        if (loadedCountRef.current === (imageUrlsLength+videoUrlsLength)) {
            setPolaroidLoading(false);
        }
    };

    // const [images, setImages] = useState([]);
    // const [videos,setVideos] = useState([])
    // const [imageLoad, setImageLoad] = useState(false);
    const [model, setModel] = useState(false);
    const [tempImg, setTemp] = useState('');
    const [open, setOpen] = React.useState(false);
    const handleClose = () => setOpen(false); 
    const [imageData, setImageData] = useState([]);
    const handleImageClick = async (e) => {
        // console.log("video dataset attribute",e.target.dataset.src1)
        // console.log("handleImageClick: ", e.target.src);
        // console.log(e.target)
        const source = e.target.dataset.src1?e.target.dataset.src1:e.target.src
        var urlTag = e.target.tagName == 'IMG'?"image_url":"video_url"
        if (props.isVenue) {
            const { data, error } = await supabase
                .from('venue_carousel_images')
                .select('*')
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
        else if(props.isFestival){
            const { data, error } = await supabase
            .from('festival_carousel_images')
            .select('*')
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
    // useEffect(() => {
    //     if (props.images.length > 0) {
    //         // setImageLoad(true);
    //         // setImages(props.images);
    //     }
    //     if (props.videos.length > 0) {
           
    //         setVideos(props.videos);
    //     }
    // }, [props.images,props.videos]);

    return (
        <>
            <div style={carousel_styles.titleBar}>
                <Typography variant="h5" align="left" className="fw-bold" style={{
                    marginRight: "15px",
                }}>Captured Moments</Typography>
               {
                !props.isPromo && <AddMediaButton artistID={props.artistID} isVenue={props.isVenue} venueID={props.venueID} festivalID={props.festivalId} isFestival={props.isFestival} />
               } 
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
                            {!!props.images.length && props.images.map((image, index) => {
                                if(image){
                                    return (
                                        <Slide style={carousel_styles.slide}
                                         index={index}
                                         > 
                                            <Polaroid
                                                key={index}
                                                onPress={handleImageClick}
                                                imageUrl={image}
                                                loadFinished={handleImageLoad}
                                                loading={PolaroidLoading}
                                            />
                                        </Slide>
                                    );
                                }
                               
                            })}
                             {!!props.videos.length && props.videos.map((video, index) => {
                                if(video){
                                    return (
                                        <Slide style={carousel_styles.slide}> 
                                            <Polaroid
                                                key={index}
                                                onPress={handleImageClick}
                                                videoUrl={video}
                                                loadFinished={handleImageLoad}
                                                loading={PolaroidLoading}
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
                        isFestival={props.isFestival}
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

export default React.memo(ImageCarousel);

ImageCarousel.propTypes = {
    images: PropTypes.arrayOf(PropTypes.string),
    slideCount: PropTypes.number,
    isVenue: PropTypes.bool,

    // you only need one of these two
    artistID: PropTypes.string,
    venueID: PropTypes.string,
};