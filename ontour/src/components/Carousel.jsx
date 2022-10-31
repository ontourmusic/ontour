import React from "react";
import '../index.css';
import Item from "./Item";
import CarouselImage from "./CarouselImage";
import {useState, useEffect} from "react";

export default function Carousel(props)
{
    const [images, setImages] = useState([]);
    const [incrementor , setIncrementor] = useState(-3);
    const [imageLoad, setImageLoad] = useState(false);
    useEffect(() => {
        console.log(props.images);
        console.log(images.length);
        if(images.length)
        {
            setImageLoad(true);
        }
        setImages(props.images);
    }, [props.images]);

    return (
        <div class="container">
            <div id="gallery" class="row">
                <div class="col-12 col-sm-9 align-self-center">
                    <h4 class="fw-bold ">Captured Moments</h4>
                </div>
                <div class="col-12 col-sm-3 no-text-align">
                    <button id="photobutton" type="button" class="btn btn-outline-light fw-bold align-self-center">
                        <div class="row">
                            <div class="col-lg-3">
                                <img id="camera-icon" src="../../images/camera.png" alt=""></img>
                            </div>
                            <div id="add-photo" class="d-none d-lg-block col-lg-9">
                                Add Photo
                            </div>
                        </div>
                    </button>
                </div>
            </div>
            <div id="carouselExampleControls" class="carousel slide" data-bs-ride="carousel">
                <div class="carousel-inner">
                    <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Previous</span>
                    </button>
                    <div class="carousel-item active">
                        <div class="row">
                            {imageLoad ? images.map((image, index) => {
                                while(index < 3) {
                                    if(index <= images.length-1){
                                        return <CarouselImage image={image} text="Card title 1"/>
                                    }
                                }
                            }): console.log("howdy")}
                        </div>
                    </div>
                    { imageLoad ? images.map((image, index) => {
                            if(index != 0 && index % 3 == 0){
                                if(index <= images.length) {
                                    console.log(index);
                                    return (
                                        <div class="carousel-item">
                                            <div class="row">
                                                {index <= images.length-1 ? <CarouselImage image={images[index + incrementor]} text="Card title 5"/> : null}
                                                {index + 1 <= images.length-1 ? <CarouselImage image={images[index+ 1]} text="Card title 5"/> : null}
                                                {index + 2 <= images.length-1 ? <CarouselImage image={images[index+ 2]} text="Card title 5"/> : null}
                                            </div>
                                        </div>
                                    );
                                }
                            }
                        }
                    ): console.log("ciao")}
                    <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Next</span>
                    </button>
                </div>
            </div>
        </div> 
    );
}