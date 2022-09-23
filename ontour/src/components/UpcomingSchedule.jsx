import React from "react";
import '../index.css';
import Show from "./Show";
export default function UpcomingSchedule(props)
{
    return (
        <div class="container py-5 shows">
            <div class="row justify-content-center py-3 show">
                <h2 class="h3 font-weight-bold">Upcoming Shows</h2>
            </div>

            <Show date="Sep 23" event="Primavera Sound LA 2022" location="Los Angeles, California"/>
            <Show date="Sep 27" event="Super Legends Cruise 2022" location="Long Beach, California"/>
            <Show date="Oct 23" event="Super Legends Cruise 2023" location="Long Beach, California"/>

            <div class="row justify-content-center py-3">
                <button id="upcoming-btn">See more</button>
            </div>
        </div>
    );

}