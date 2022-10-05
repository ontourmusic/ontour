import React from "react";
import '../index.css';
import Show from "./Show";

export default function UpcomingSchedule(props)
{
    return (
        <div class="container shows">
            <div class="row justify-content-center py-3 show">
                <h4 class="fw-bold">Past Shows</h4>
            </div>
    
            <Show time = "Fri • 1:00pm" date="Oct 7" event="Primavera Sound LA" location="Los Angeles, California"/>
            <Show time = "Sat • 4:00pm" date="Oct 15" event="Super Legends Cruise" location="Long Beach, California"/>
            <Show time = "Sun • 7:00pm" date="Oct 16" event="Super Legends Cruise" location="Long Beach, California"/>
    
            <div class="row justify-content-center py-3">
                <button id="past-btn">See more</button>
            </div>
        </div>
    );

}