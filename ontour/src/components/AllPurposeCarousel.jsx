import React from "react";
import { useState, useEffect } from "react";
import { Polaroid } from "./Polaroid";
import { AddMediaButton } from "./Buttons";

/*
expected props:
    - images: array of strings
    - onPressFunction: function that will be called when the polaroid is clicked with
        the image index as the parameter
        There are better ways to do this, but this was the quickest way to use the currently working carousel.
*/
export default function AllPurposeCarousel({ images, onPressFunction }) {
    const [images, setImages] = useState([]);
    const [imageLoad, setImageLoad] = useState(false);

    const handleImageClick = (e) => {
        const index = images.indexOf(e.target.src);
        console.log(`handleImageClick: ${e.target.src} - index: ${index}`);
        onPressFunction(index);
    }


    useEffect(() => {
        if (props.images.length > 0) {
            setImageLoad(true);
            setImages(props.images);
        }
    }, [props.images]);

    return (
        <div class="container" >
            <div id="gallery" class="row" style={{ marginTop: "0" }}>
                <div class="col-9 align-self-center">
                    <h4 class="fw-bold ">Captured Moments</h4>
                </div>
                <div class="col-3 m-0 no-text-align">
                    <AddMediaButton />
                </div>
            </div>
            <div id="carouselExampleControls" class="carousel slide d-none d-sm-block" data-bs-ride="carousel">
                <div class="carousel-inner">
                    <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Previous</span>
                    </button>
                    <div class="carousel-item active">
                        <div class="row">
                            {imageLoad ? images.map((image, index) => {
                                while (index < 3) {
                                    if (index <= images.length - 1) {
                                        return <Polaroid key={index} onPress={handleImageClick} imageURL={image} />
                                    }
                                }
                            }) : <div></div>}
                        </div>
                    </div>
                    {imageLoad ? images.map((image, index) => {
                        if (index !== 0 && index % 3 === 0) {
                            if (index <= images.length) {
                                return (
                                    <div class="carousel-item">
                                        <div class="row">
                                            {index <= images.length - 1 ? <Polaroid key={index} onPress={handleImageClick} imageURL={images[index]} /> : null}
                                            {index + 1 <= images.length - 1 ? <Polaroid key={index} onPress={handleImageClick} imageURL={images[index + 1]} /> : null}
                                            {index + 2 <= images.length - 1 ? <Polaroid key={index} onPress={handleImageClick} imageURL={images[index + 2]} /> : null}
                                        </div>
                                    </div>
                                );
                            }
                        }
                    }
                    ) : <div>No images yet. Be the first to post!</div>}
                    {/* It is strange, if you add something like "No images to show. Be the first to upload!" inside
                    that div above, I cant get the images to load anymore. It may point us towards why the images dont
                    always load */}
                    <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Next</span>
                    </button>
                </div>
            </div>
        </div>
    );
}