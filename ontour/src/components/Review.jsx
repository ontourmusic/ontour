import React from "react";
import '../index.css';
export default function Review(props)
{
    return (
        <a href="#" class="list-group-item list-group-item-action flex-column align-items-start">
            <div class="d-flex w-100 justify-content-between">
                <h5 class="mb-1">{props.user}</h5>
                <small class="text-muted">{props.date}</small>
            </div>
            <div class="d-flex w-100 justify-content-start">
                <p class="text-muted">{props.rating}</p>
            </div> 
            <div class="d-flex w-100 justify-content-start">
                <p class="mb-1">{props.text}</p>
            </div>
        </a>
    )
}