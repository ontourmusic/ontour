import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext, DotGroup } from 'pure-react-carousel';
import "pure-react-carousel/dist/react-carousel.es.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import '../Styles/carousel.css';
import { Polaroid } from "./Polaroid";
import { AddMerchButton } from "./Buttons";
import { createClient } from '@supabase/supabase-js'
import { Typography } from "@mui/material";
import MerchModal from "./MerchModal";

import artist_styles from "../Styles/artist_styles";
import polaroid_styles from "../Styles/polaroid_styles";

const carousel_styles = artist_styles.carousel;

/*
images: array of image urls
*/
const MerchCarousel = (props) => {
    const [images, setImages] = useState([]);
    const [prices, setPrices] = useState([]);
    //const [titles, setTitles] = useState([]);
    const [fullMerchArray, setFullMerchArray] = useState([]);
    const [storeLinks, setStoreLinks] = useState([]);
    const [imageLoad, setImageLoad] = useState(false);
    const [model, setModel] = useState(false);
    const [tempImg, setTemp] = useState('');
    const [open, setOpen] = React.useState(false);
    const handleClose = () => setOpen(false); 
    const [imageData, setImageData] = useState([]);
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
            setImageData(data);
            console.log("image_id: ", data.id)
            setOpen(true);
            setTemp(e.target.src);
            setModel(true);

        }
        else {
            const { data, error } = await supabase
                .from('merch_images')
                .select('*')
                .eq('image_url', e.target.src)
                .single()

            if (error) {
                console.error(error)
                return null
            }
            setImageData(data);
           // setOpen(true);
            //setTemp(e.target.src);
            // setModel(true);

            //get price data
            const { data2, error2 } = await supabase
                .from('merch_images')
                .select('*')
                .eq('price', e.target.src)
                .single()

            if (error) {
                console.error(error2)
                return null
            }
            
            setPrices(data2);
            //get store link data
            const { data3, error3 } = await supabase
                .from('merch_images')
                .select('*')
                .eq('store_link', e.target.src)
                .single()

            if (error) {
                console.error(error3)
                return null
            }
            setStoreLinks(data3);
        }
    }

    useEffect(() => {
        if (props.images.length > 0) {
            setImageLoad(true);
            setImages(props.images);
            setPrices(props.prices);
            setStoreLinks(props.links);
            var merchArray = [];
            for (var i = 0; i < images.length; i++) {
                merchArray.push([images[i], prices[i], storeLinks[i]]);
            }
            console.log(merchArray);
            setFullMerchArray(merchArray);
        }
    }, [props.images, props.links, props.prices]);

    /**
     *  <MerchModal 
                        handleClose={handleClose} 
                        image={tempImg} 
                        imageData={imageData}
                        isVenue={props.isVenue}
                    />
     */

    return (
        <>
            <div style={carousel_styles.titleBar}>
                <Typography variant="h5" align="left" className="fw-bold" style={{
                    marginRight: "15px",
                }}>Merch</Typography>
                <AddMerchButton artistID={props.artistID} isVenue={props.isVenue} venueID={props.venueID} />
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
                    {fullMerchArray.map((merchObj, index) => {
                        return (
                            <Slide index={index}
                                style={carousel_styles.slide}
                            >
                                <div>
                               <a href={merchObj[2]} >
                                    <img src={merchObj[0]}  class="d-block w-100" style={polaroid_styles.polaroid_image} />
                                </a>
                                    <p id="price"> {merchObj[1]}</p>
                                    </div>
                            </Slide>
                        );

                    })}
                </Slider>
                {open && 
                    <a href={"https://dominicfike.shop/products/sunburn-standard-vinyl"}> </a>
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
            </CarouselProvider>
            
            </>
    )
};

export default MerchCarousel;

MerchCarousel.propTypes = {
    images: PropTypes.arrayOf(PropTypes.string),
    links: PropTypes.arrayOf(PropTypes.string),
    prices: PropTypes.arrayOf(PropTypes.string),
    slideCount: PropTypes.number,
    isVenue: PropTypes.bool,

    // you only need one of these two
    artistID: PropTypes.string,
    venueID: PropTypes.string,
};