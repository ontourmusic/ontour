import React from "react";
import '../index.css';
import Item from "./Item";
export default function Carousel(props)
{
    return (
        <div class="container">
            <h4 id="gallery" class="fw-bold">Captured Moments</h4>
            <div id="carouselExampleControls" class="carousel slide" data-bs-ride="carousel">
                <div class="carousel-inner">
                    <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Previous</span>
                    </button>
                    <div class="carousel-item active">
                        <div class="row">
                            <div class="col-4">
                                <Item image="https://www.leoweekly.com/wp-content/uploads/2019/12/Harlow3.jpg" text="Card title 1"/>
                            </div>
                            <div class="col-4">
                                <Item image="https://www.rollingstone.com/wp-content/uploads/2022/05/jack-harlow-tour.jpg" text="Card title 2"/>
                            </div>
                            <div class="col-4">
                                <Item image="https://www.gannett-cdn.com/presto/2021/10/10/NA36/01000ac6-e203-4ed3-96ba-c5382420d8ac-DCQ_ACL21_SAT_010_1.JPG" text="Card title 3"/>
                            </div>
                        </div>
                    </div>
                    <div class="carousel-item">
                        <div class="row">
                            <div class="col-4">
                                <Item image="https://s.hdnux.com/photos/01/22/47/15/21656444/4/rawImage.jpg" text="Card title 4"/>
                            </div>
                            <div class="col-4">
                                <Item image="https://media-cldnry.s-nbcnews.com/image/upload/t_fit-760w,f_auto,q_auto:best/rockcms/2022-08/jack-harlow-superbowl-citi-concert--inline2-jp-081222-08aa15.jpg" text="Card title 5"/>
                            </div>
                            <div class="col-4">
                                <Item image="https://www.okayplayer.com/wp-content/uploads/2022/06/GettyImages-1405312954.jpg" text="Card title 6"/>
                            </div>
                        </div>
                    </div>
                    <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Next</span>
                    </button>
                </div>
            </div>
        </div> 
    );
}