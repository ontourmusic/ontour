import React from "react";
import '../index.css';
import {RiStarFill} from "react-icons/ri"
import {AiOutlineUser} from "react-icons/ai"
import {useState} from 'react';

export default function Review(props)
{
    const [isActive, setIsActive] = useState(true);

    const handleHelpful = event => {
        event.currentTarget.classList.toggle('fw-bold');
        event.currentTarget.classList.toggle('btn-outline-light');
        setIsActive(current => !current);
      };

    return (
        <div class="list-group-item flex-column align-items-start">
            <div class="d-flex bd-highlight mb-1">
                <div class="p-2 bd-highlight"><AiOutlineUser size={23}/> </div>
                <div class="p-2 bd-highlight"><h6 class="review-user">{props.user}</h6></div>
                <br></br>
            </div>
            <div>
                <div class="d-flex bd-highlight mb-2">
                    <small>Concert Rating:</small> 
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
                </div>
                <div align = "left"  class="d-flex bd-highlight mb-2">
                    <small>Venue: {props.venue} - {props.date}</small> 
                </div>
            </div>
            <div class="d-flex w-100 justify-content-start">
                <p class="mb-2" align = "left">{props.text}</p>
            </div>
            <div class="d-flex w-100 justify-content-start pb-1">
                <button onClick={handleHelpful} style={{backgroundColor: isActive? '' : '#e7e8e8'}} id="helpful-button" type="button" class="btn btn-outline-light align-self-center">
                    <div class="row">
                        <div class="col-3">
                            <img id="helpful-icon" src={isActive? "../../images/helpful.png" : "../../images/helpful_selected.png"} alt=""></img>
                        </div>
                        <div id="helpful" class="col-9">
                            Helpful
                        </div>
                    </div>
                </button>
            </div>
            
        </div>
    )
}