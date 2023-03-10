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
                totalSlides={Object.keys(props.itemList).length}
                step={2}
                naturalSlideWidth={50}
                naturalSlideHeight={50}
                isIntrinsicHeight={true}         
            >
                <Slider>
                {
                    Object.keys(props.itemList).map((item, index) => {
                    return (
                        <Slide index = {index}>
                            <HomePageArtist isArtist={props.artistFlag} artistList={props.itemList} artist={item} rating={props.ratings[item]} loading={props.loading} reviewCount={props.reviewCount[item]}></HomePageArtist>
                        </Slide>
                    )})
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