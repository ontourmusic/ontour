import React from "react";
import PropTypes from "prop-types";
import '../index.css';
import Show from "./Show";
import { useState, useEffect } from "react";

const Schedule = ({ eventArray, darkMode, hideTitle, onHoveredIndexChange }) => {

    const [hoveredItemIndex, setHoveredItemIndex] = useState(null);
    const handleItemHover = (venue) => {
        setHoveredItemIndex(venue);
        onHoveredIndexChange(venue);
        
    }

    const handleItemHoverOff = () => {
        setHoveredItemIndex(null);
        onHoveredIndexChange(null);
    }
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
                            <a href={eventArray[index].eventURL} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            onMouseEnter={() => handleItemHover(eventArray[index].venue)}
                            onMouseLeave={() => handleItemHoverOff()}>
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
        </div>
    )
}

export default Schedule;

Schedule.propTypes = {
    eventArray: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string,
        date: PropTypes.string,
        eventId: PropTypes.number,
        eventURL: PropTypes.string,
        eventTime: PropTypes.string,
        price: PropTypes.string,
        isVenue: PropTypes.bool
    })),
    darkMode: PropTypes.bool,
    hideTitle: PropTypes.bool
};