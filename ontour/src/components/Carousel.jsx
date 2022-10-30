import React from "react";
import '../index.css';
import Item from "./Item";
import CarouselImage from "./CarouselImage";
import {useState, useEffect} from "react";

export default function Carousel(props)
{
    const [images, setImages] = useState([]);
    const [incrementor , setIncrementor] = useState(-3);
    useEffect(() => {
        console.log(props.images);
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
                            <CarouselImage image="https://www.leoweekly.com/wp-content/uploads/2019/12/Harlow3.jpg" text="Card title 1"/>
                            <CarouselImage image="https://www.rollingstone.com/wp-content/uploads/2022/05/jack-harlow-tour.jpg" text="Card title 2"/>
                            <CarouselImage image="https://www.gannett-cdn.com/presto/2021/10/10/NA36/01000ac6-e203-4ed3-96ba-c5382420d8ac-DCQ_ACL21_SAT_010_1.JPG" text="Card title 3"/>
                            {/* {images.map((image, index) => {
                                while(index < 3) {
                                    return <CarouselImage image={image} text="Card title 1"/>
                                }
                            })} */}
                        </div>
                    </div>
                    <div class="carousel-item">
                        <div class="row">
                            <CarouselImage image="https://s.hdnux.com/photos/01/22/47/15/21656444/4/rawImage.jpg" text="Card title 5"/>
                            <CarouselImage image="https://media-cldnry.s-nbcnews.com/image/upload/t_fit-760w,f_auto,q_auto:best/rockcms/2022-08/jack-harlow-superbowl-citi-concert--inline2-jp-081222-08aa15.jpg" text="Card title 5"/>
                            <CarouselImage image="https://www.okayplayer.com/wp-content/uploads/2022/06/GettyImages-1405312954.jpg" text="Card title 6"/>
                        </div>
                    </div>
                    {/* {images.map((image, index) => {
                            index+=3;
                            setIncrementor(incrementor + 3);
                            if(index + 3 <= images.length) {
                                console.log(index + 3);
                                return (
                                    <div class="carousel-item">
                                        <div class="row">
                                            {incrementor <= images.length-1 ? <CarouselImage image={images[index + incrementor]} text="Card title 5"/> : null}
                                            {incrementor+1 <= images.length-1 ? <CarouselImage image={images[index+ incrementor + 1]} text="Card title 5"/> : null}
                                            {incrementor+2 <= images.length-1 ? <CarouselImage image={images[index+ incrementor + 2]} text="Card title 5"/> : null}
                                        </div>
                                    </div>
                                );
                            }
                        }
                    )} */}
                    <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Next</span>
                    </button>
                </div>
            </div>
        </div> 
    );
}