import React from "react";
import '../index.css';
import Show from "./Show";

export default function PreviousSchedule(props)
{
    return (
        <div class="container py-5 shows">
            <div class="row justify-content-center py-3 show">
                <h2 class="h3 font-weight-bold">Past Shows</h2>
            </div>

            <Show date="Sep 7" event="Primavera Sound LA 2020" location="Los Angeles, California"/>
            <Show date="Sep 15" event="Super Legends Cruise 2020" location="Long Beach, California"/>
            <Show date="Sep 15" event="Super Legends Cruise 2021" location="Long Beach, California"/>

            <div class="row justify-content-center py-3">
                <button id="past-btn">See more</button>
            </div>
        </div>
    )
}