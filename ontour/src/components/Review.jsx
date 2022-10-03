import React from "react";
import '../index.css';
import {FaStar} from "react-icons/fa"
import {AiOutlineUser} from "react-icons/ai"
export default function Review(props)
{
    return (
        <a href="#" class="list-group-item list-group-item-action flex-column align-items-start">
            <div class="d-flex bd-highlight mb-1">
                <div class="p-2 bd-highlight"><AiOutlineUser size={15}/> </div>
                <div class="p-2 bd-highlight"><h5 class="mb-1">{props.user}</h5></div>
                <br></br>
            </div>
            <div>
                <div class="d-flex bd-highlight mb-2">
                    <small class="text-muted">Concert Rating:</small> 
                    {' '}
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
                <div align = "left"  class="d-flex bd-highlight mb-2">
                    <small class="text-muted">Venue: {props.venue}</small> 
                </div>
            </div>
            <div class="d-flex w-100 justify-content-start">
                <p class="mb-2" align = "left">{props.text}</p>
            </div>
        </a>
    )
}