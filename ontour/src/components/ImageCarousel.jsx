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
import { useAuth0 } from "@auth0/auth0-react";
import {supabase} from "../components/supabaseClient"
import { createClient } from "@supabase/supabase-js";
import mixpanel from "mixpanel-browser";
import artist_styles from "../Styles/artist_styles";
import { mixPanelId } from "../constants/constants";
import ImageModal1 from "./ImageModal1";
// import { useAuth0 } from "@auth0/auth0-react";
const carousel_styles = artist_styles.carousel;



/*
images: array of image urls
*/
const ImageCarousel = (props) => {
    const {user, isAuthenticated } = useAuth0();
    // const { user, isAuthenticated } = useAuth0();

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
    const [tempImg, setTemp] = useState('')
    const [open, setOpen] = React.useState(false);
    const handleClose = () => setOpen(false); 
    const [imageData, setImageData] = useState([]);
    const [newModalOpen, setNewModalOpen] = useState(false);
    const supabase = createClient('https://zouczoaamusrlkkuoppu.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpvdWN6b2FhbXVzcmxra3VvcHB1Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY3ODE1ODUyMSwiZXhwIjoxOTkzNzM0NTIxfQ.LTuL_u0tzmsj8Zf9m6JXN4JivwLq1aRXvU2YN-nDLCo');
    // mixpanel.init(mixPanelId, {debug: true, track_pageview: true, persistence: 'localStorage'});

    // console.warn(props,"deepanshu")
    const handleImageClick = async (e) => {
        // console.log("video dataset attribute",e.target.dataset.src1)
        // console.log("handleImageClick: ", e.target.src);
        // console.log(e.target)
        setNewModalOpen(true);
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
            // mixpanel.track("media_clicked",{
            //     'media_type' : urlTag=='image_url'?"image":"video",
            //     'media_id' : `${data.id}`,
            //     'media_url': `${source}`,
            //     'entity_type' : 'venue',
            //     'entity_id' : `${props.venueID}`,
            //     'entity_name' : `${props.venueName}`,
            //     'mode' : 'carousel',
            //     'user' : isAuthenticated?user:'guest',
            //     "mode" : "carousel"
            // });
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
        // mixpanel.track("media_clicked",{
        //     'media_type' : urlTag=='image_url'?"image":"video",
        //     'media_id' : `${data.id}`,
        //     'media_url': `${source}`,
        //     'entity_type' : 'festival',
        //     'entity_id' : `${props.festivalId}`,
        //     'entity_name' : `${props.festivalName}`,
        //     'user' : isAuthenticated?user:'guest',
        //     "mode" : "carousel"
        // });
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
            // mixpanel.track("media_clicked",{
            //     'media_type' : urlTag=='image_url'?"image":"video",
            //     'media_id' : `${data.id}`,
            //     'media_url': `${source}`,
            //     'entity_type' : 'artist',
            //     'entity_id' : `${props.artistID}`,
            //     'entity_name' : `${props.artistname}`,
            //     'user' : isAuthenticated?user:'guest',
            //     "mode" : "carousel"
            // });
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
    function handleClose1() {
        setNewModalOpen(false);
    }
    return (
        <>
            <div style={carousel_styles.titleBar}>
                <Typography variant="h5" align="left" className="fw-bold" style={{
                    marginRight: "15px",
                }}>Captured Moments</Typography>
               {
                props.isPromo ? 
                (isAuthenticated && user && user['https://tourscout.com/user_metadata'] && user['https://tourscout.com/user_metadata'].artist_id == props.artistID) ? 
                    <AddMediaButton artistID={props.artistID} isVenue={props.isVenue} venueID={props.venueID} festivalID={props.festivalId} isFestival={props.isFestival} isPromo = {props.isPromo}  artistFname={props.artistname}
                    venueName = {props.venueName}
                    festivalName = {props.festivalName}/> : <></>
                :
                <AddMediaButton artistID={props.artistID} isVenue={props.isVenue} venueID={props.venueID} festivalID={props.festivalId} isFestival={props.isFestival}  artistFname={props.artistname}
                venueName = {props.venueName}
                festivalName = {props.festivalName} />
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
                {/* {open && 
                
                    <ImageModal 
                        handleClose={handleClose} 
                        image={tempImg} 
                        imageData={imageData}
                        isVenue={props.isVenue}
                        isFestival={props.isFestival}
                        user={user}
                        artistFname={props.artistname}
                        venueName = {props.venueName}
                        festivalName = {props.festivalName}
                        mode = "carousel"
                    />
                }     */}
                {newModalOpen && <ImageModal1 
                artistname={props.artistname}
                artistID={props.artistID}  images={props.images} videos={props.videos} handleClose1={handleClose1} media={props.images.concat(props.videos)}  />}
                <div className="controls">
                    <ButtonBack  className="btn-arrow" style={{ color: "black" }}>
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