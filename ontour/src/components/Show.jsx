import React from "react";
import '../index.css';

export default function Show(props)
{
    return(
        <a href="/review">
            <div class="row justify-content-center py-3 show">
                <div class="col-4">
                <div class="fw-bold schedule-font">
                    {props.date}
                </div>
                <div class="schedule-subfont">
                    Sun • 1:00pm
                </div>
                </div>
                <div class="col-7 show-location">
                <div class="fw-bold schedule-font">
                    {props.event}
                </div>
                <div class="schedule-subfont">
                    {props.location}
                </div>
                </div>
                <div class="col-1 align-self-center">
                <img src="https://assets.sk-static.com/images/nw/furniture/icons/chevron-black.svg"></img>
                </div>
            </div>
        </a>
    );
}
