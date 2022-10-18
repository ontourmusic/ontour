import React from "react";
import '../index.css';
import {RiStarFill} from "react-icons/ri"
import {AiOutlineUser} from "react-icons/ai"
export default function Review(props)
{
    return (
        <div class="list-group-item flex-column align-items-start">
            <div class="d-flex bd-highlight mb-1">
                <div class="p-2 bd-highlight"><AiOutlineUser size={20}/> </div>
                <div class="p-2 bd-highlight"><h5 class="mb-1">{props.user}</h5></div>
                <br></br>
            </div>
            <div>
                <div class="d-flex bd-highlight mb-2">
                    <small class="text-muted">Concert Rating:</small> 
                    {' '}
                    {[...Array(props.rating)].map(star => {
                        return(
                            <RiStarFill
                                className="star"
                                color = {"#faaf00"}
                                size = {20}
                            />   
                        );
                    })}
                    {[...Array(5-props.rating)].map(star => {
                        return(
                            <RiStarFill
                                className="star"
                                color = {"#bdbdbd"}
                                size = {20}
                            />   
                        );
                    })}
                    <small class="text-muted">{props.date}</small> 
                </div>
                <div align = "left"  class="d-flex bd-highlight mb-2">
                    <small class="text-muted">Event: {props.venue}</small> 
                </div>
            </div>
            <div class="d-flex w-100 justify-content-start">
                <p class="mb-2" align = "left">{props.text}</p>
            </div>
        </div>
    )
}