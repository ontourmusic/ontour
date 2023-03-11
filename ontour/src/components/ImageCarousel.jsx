import React, { useState, useEffect } from "react";
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext, DotGroup } from 'pure-react-carousel';
import "pure-react-carousel/dist/react-carousel.es.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import '../Styles/carousel.css';
import { Polaroid } from "./Polaroid";

/*
images: array of image urls
*/
const ImageCarousel = (props) => {

    const [images, setImages] = useState([]);
    const [imageLoad, setImageLoad] = useState(false);
    const [model, setModel] = useState(false);
    const [tempImg, setTemp] = useState('');

    const handleImageClick = (e) => {
        console.log("handleImageClick: ", e.target.src);
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
        <CarouselProvider
            orientation="horizontal"
            visibleSlides={props.slideCount}
            totalSlides={props.images.length}
            step={2}
            naturalSlideWidth={50}
            naturalSlideHeight={50}
            isIntrinsicHeight={true}
        >
            <Slider>
                {
                    images.map((image, index) => {
                        return (
                            <Slide index={index}>
                                <Polaroid 
                                    key={index} 
                                    onPress={handleImageClick} 
                                    imageURL={image} 
                                />
                            </Slide>
                        );

                    })
                }
            </Slider>
            <div className="controls">
                <ButtonBack className="btn-arrow" style={{color: "black"}}>
                    <FontAwesomeIcon icon={faAngleLeft} size="lg" />
                </ButtonBack>
                <DotGroup className="dot-group"/>
                <ButtonNext className="btn-arrow" style={{color: "black"}}>
                    <FontAwesomeIcon icon={faAngleRight} size="lg" />
                </ButtonNext>
            </div>
        </CarouselProvider>
    )
};


export default ImageCarousel;