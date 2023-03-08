import React from "react";
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext, DotGroup } from 'pure-react-carousel';
import "pure-react-carousel/dist/react-carousel.es.css";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import '../Styles/carousel.css';
import HomePageArtist from "./HomePageArtist";
import HomePageVenue from "./HomePageVenue"

export default function ArtistCarousel(props){
    return <CarouselProvider
                orientation="horizontal"
                visibleSlides={props.slideCount}
                totalSlides={10}
                step={1}
                naturalSlideWidth={50}
                naturalSlideHeight={50}
                isIntrinsicHeight={true}         
            >
                <Slider>
                {   props.artistFlag ? 
                    Object.keys(props.itemList).map((artist, index) => {
                    return <Slide index = {index}>
                                <HomePageArtist artistList={props.itemList} artist={artist} rating={props.ratings[artist]} loading={props.loading} reviewCount={props.reviewCount[artist]}></HomePageArtist>
                            </Slide>;
                    })
                    :
                    Object.keys(props.itemList).map((venue, index) => {
                    return <Slide index = {index}>
                                <HomePageVenue artistList={props.itemList} artist={venue} rating={props.ratings[venue]} loading={props.loading} reviewCount={props.reviewCount[venue]}></HomePageVenue>
                            </Slide>;
                    })
                }
                </Slider>
                <div className="controls">
                <ButtonBack className="btn-arrow">
                    <FontAwesomeIcon icon={faAngleLeft} size="lg"/>
                </ButtonBack>
                <DotGroup className="dot-group"></DotGroup>
                <ButtonNext className="btn-arrow">
                    <FontAwesomeIcon icon={faAngleRight} size="lg"/>
                </ButtonNext>
                </div>
            </CarouselProvider>
}