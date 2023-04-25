import React from "react";
import '../index.css';
import Show from "./Show";

const Schedule = ({ eventArray, darkMode, hideTitle }) => {
    return (
        <div class="container shows"
            style={{
                color: darkMode ? "white" : "black",
            }}
        >
            {!hideTitle ?
                <div class="row justify-content-center show">
                    <h4 id="upcoming" class="fw-bold d-none d-sm-block">Upcoming Shows</h4>
                    <h4 id="upcoming-shows" class="fw-bold d-block d-sm-none">Shows</h4>
                </div>
                : <div class="row justify-content-center show" />
            }

            {eventArray.length > 0
                ?
                <div id="upcoming-list">
                    {eventArray.map((item, index) => {
                        return (
                            <a href={eventArray[index].eventURL} target="_blank" rel="noopener noreferrer">
                                <Show 
                                    time={eventArray[index].eventTime} 
                                    isVenue={eventArray[index].isVenue} 
                                    date={eventArray[index].date} 
                                    event={eventArray[index].name} 
                                    location={eventArray[index].timezone} 
                                    price={eventArray[index].price} 
                                    venue={eventArray[index].venue}
                                    city={eventArray[index].city}
                                    state={eventArray[index].state}
                                />
                            </a>
                        )
                    })
                    }

                </div>
                : <p style={{ marginTop: "30px" }}>No Upcoming Shows</p>}

            {/* <div class="row justify-content-center pt-3">
                <button id="upcoming-btn">See more</button>
            </div> */}
        </div>
    )
}

export default Schedule;