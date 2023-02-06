import React from "react";
import '../index.css';
import Item from "./Item";
import { useState, useEffect } from "react";
import { CarouselPolaroid } from "./Polaroid";

export default function Carousel(props) {
    const [images, setImages] = useState([]);
    const [imageLoad, setImageLoad] = useState(false);
    const [model, setModel] = useState(false);
    const [tempImg, setTemp] = useState('');
    const getImg = (img) => {
        setTemp(img);
        setModel(true);
    }
    useEffect(() => {
        console.log("props.images: ", props.images, " - length: ", props.images.length);
        if (props.images.length > 0) {
            console.log("number of images ")
            setImageLoad(true);
            setImages(props.images);
        }
    }, [props.images]);

    return (
        <div class="container">
            <div class={model ? "model" : "hide"} onClick={() => setModel(false)}>
                <img src={tempImg} alt="" />
            </div>
            <div id="gallery" class="row">
                <div class="col-9 align-self-center">
                    <h4 class="fw-bold ">Captured Moments</h4>
                </div>
                <div class="col-3 m-0 no-text-align">
                    <button id="photobutton" type="button" class="btn btn-outline-light fw-bold align-self-center" onClick={() => { alert('Feature coming soon!') }}>
                        <div class="row">
                            <div class="col-lg-3">
                                <img id="camera-icon" src="../../images/camera.png" alt=""></img>
                            </div>
                            <div id="add-photo" class="d-none d-lg-block col-lg-9">
                                Add Media
                            </div>
                        </div>
                    </button>
                </div>
            </div>
            {/* Mobile Carousel */}
            {/* <div id="mobileCarousel" class="carousel slide d-block d-sm-none" data-bs-ride="carousel">
                <div id="icon-sm" class="carousel-inner">
                    <button class="carousel-control-prev" type="button" data-bs-target="#mobileCarousel" data-bs-slide="prev">
                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Previous</span>
                    </button>
                    {imageLoad ? images.map((image, index) => {
                        if(index == 0) {
                            return (
                                <div class="carousel-item active">
                                    {<div onClick={() => getImg(images[index])}><Item image={images[index]} /></div>}
                                </div>
                            );
                        }
                        else if(index <= images.length) {
                            return (
                                <div class="carousel-item">
                                    {<div onClick={() => getImg(images[index])}><Item image={images[index]} /></div>}
                                </div>
                            )
                        }
                    }): <div></div>}
                    <button class="carousel-control-next" type="button" data-bs-target="#mobileCarousel" data-bs-slide="next">
                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Next</span>
                    </button>
                </div>
            </div> */}
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
                                        return <CarouselPolaroid onClick={() => getImg(image)} image={image} />
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
                                            {index <= images.length - 1 ? <CarouselPolaroid onClick={() => getImg(images[index])} image={images[index]} /> : null}
                                            {index + 1 <= images.length - 1 ? <CarouselPolaroid onClick={() => getImg(images[index])} image={images[index + 1]} /> : null}
                                            {index + 2 <= images.length - 1 ? <CarouselPolaroid onClick={() => getImg(images[index])} image={images[index + 2]} /> : null}
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