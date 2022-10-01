import React from "react";
import '../index.css';
import {FaStar} from "react-icons/fa"

export default function Review(props)
{
    return (
        <a href="#" class="list-group-item list-group-item-action flex-column align-items-start">
            <div class="d-flex w-100 justify-content-between">
                <h5 class="mb-1">{props.user}</h5>
                <small class="text-muted">{props.date}</small>
            </div>
            <div>
            <div class="d-flex w-100 justify-content-start">
                {[...Array(props.rating)].map(star => {
                    return(
                        <FaStar
                            className="star"
                            color = {"#ffc107"}
                            size = {20}
                        />   
                    );
                })}
                {[...Array(5-props.rating)].map(star => {
                    return(
                        <FaStar
                            className="star"
                            color = {"#e4e5e9"}
                            size = {20}
                        />   
                    );
                })}
            </div>
            </div>
            <div class="d-flex w-100 justify-content-start">
                <p class="mb-1">{props.text}</p>
            </div>
        </a>
    )
}