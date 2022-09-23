import React from "react";
import '../index.css';
import CarouselItem from "./CarouselItem";
export default function Carousel(props)
{
    return (
        <div class="container py-5">
            <h2 class="h3 font-weight-bold">Photo Gallery</h2>
            <div id="carouselExampleControls" class="carousel slide" data-bs-ride="carousel">
                <div class="carousel-inner">
                    <CarouselItem active="active" image="https://www.rollingstone.com/wp-content/uploads/2022/05/jack-harlow-tour.jpg" text="Card title 1"/>
                    <CarouselItem active="" image="https://www.leoweekly.com/wp-content/uploads/2019/12/Harlow3.jpg" text="Card title 2"/>
                    <CarouselItem active="" image="https://www.gannett-cdn.com/presto/2021/10/10/NA36/01000ac6-e203-4ed3-96ba-c5382420d8ac-DCQ_ACL21_SAT_010_1.JPG" text="Card title 3"/>
                </div>
            </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Next</span>
            </button>
        </div> 
    );
}