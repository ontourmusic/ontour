import React from "react";
import '../index.css';
import Show from "./Show";

export default function PreviousSchedule(props)
{
    return (
        <div class="container shows">
            <div class="row justify-content-center py-3 show">
                <h3 class="fw-bold">Past Shows</h3>
            </div>
    
            <Show date="Sep 7" event="Primavera Sound LA" location="Los Angeles, California"/>
            <Show date="Sep 15" event="Super Legends Cruise" location="Long Beach, California"/>
            <Show date="Sep 15" event="Super Legends Cruise" location="Long Beach, California"/>
    
            <div class="row justify-content-center py-3">
                <button id="past-btn">See more</button>
            </div>
        </div>
    )
}