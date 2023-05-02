import React from "react";
import PropTypes from "prop-types";
import '../index.css';
import Show from "./Show";
import { useState, useEffect } from "react";
import { format } from 'date-fns';
import { AiOutlineConsoleSql } from "react-icons/ai";
import Schedule from "./Schedule";

class UpcomingEvent {
    constructor(name, date, eventId, eventURL, timezone, eventTime, venue, city, state, price, isVenue) {
        this.name = name;
        this.date = date;
        this.eventId = eventId;
        this.eventURL = eventURL;
        this.timezone = timezone;
        this.eventTime = eventTime;
        this.venue = venue;
        this.city = city;
        this.state = state;
        this.price = price;
        this.isVenue = isVenue;
    }
}

// function parseDate(date) {
//     const [year, month, day] = date.split("-");
//     const newData = new Date(+year, month - 1, +day);
//     var weekday = newData.toString().split(" ")[0];
//     var monthStr = newData.toString().split(" ")[1];
//     var dayStr = newData.toString().split(" ")[2];

//     if (dayStr.charAt(0) == '0') {
//         dayStr = dayStr.slice(1);
//     }

//     var fullDate = weekday + ", " + monthStr + " " + dayStr;
//     return fullDate;
// }

// function parseName(name) {
//     var nameParse = name.split(" ");
//     for (let j = 0; j < nameParse.length; j++) {
//         nameParse[j] = nameParse[j].charAt(0) + nameParse[j].slice(1).toLowerCase();
//     }
//     var eventName = nameParse.join(" ");
//     return eventName;
// }

function parseTime(eventTime) {
    var hours;
    var minutes
    var time;
    if (eventTime) {
        eventTime = eventTime.split(':');
        hours = eventTime[0];
        minutes = eventTime[1];
        time = (hours > 12) ? hours - 12 : hours;
        time += ':' + minutes;
        time += (hours >= 12) ? " pm" : " am";
    }
    else {
        time = " ";
    }
    return time;
}

// function parseTimezone(timezone) {
//     if (!timezone) {
//         timezone = " ";
//     }
//     else {
//         timezone = timezone.split('/')[1];
//         timezone = timezone.replace('_', ' ');
//     }
//     return timezone;
// }

function createEvent(eventInfo) {
    var name = eventInfo.name;
    var date = eventInfo.start_date;
    date = date.replace("T", " ");
    var calendarDate = date.split(" ")[0];
    var time = date.split(" ")[1];
    time = time.replace("-", " ");
    time = time.split(" ")[0]
    var newTime = parseTime(time);
    var newDate = format(new Date(calendarDate), 'EEE, MMM d');
    var fullDate = newDate
    var url = (eventInfo._links["event:webpage"].href);
    var venue = eventInfo._embedded.venue.name;
    var city = eventInfo._embedded.venue.city;
    var state = eventInfo._embedded.venue.state_province;
    var price = -1;
    if(eventInfo.min_ticket_price)
    {
        price = eventInfo.min_ticket_price.display;
    }
    var event = new UpcomingEvent(name, fullDate, 0, url, "Los Angeles", newTime, venue, city, state, price, false);
    return event;
}

export default function UpcomingSchedule(props) {
    const [eventArray, setEventArray] = useState([]);
    const performSearch = async () => {
        if (props.name) {
            var name = props.name;
            const stubhuburl = "https://kju1lx3bbf.execute-api.us-east-2.amazonaws.com/Prod/stubhubapi?artist=\"" + name + "\"";
            fetch(stubhuburl, {
                method: "GET",

            })
                .then(response => response.json())
                .then(data => {
                    //create an array to hold the events
                    var eventArray = [];
                    for (var i = 0; i < data["_embedded"]["items"].length; i++) {
                        if (data["_embedded"]["items"][i]["_embedded"]["categories"][0]["name"].toLowerCase() == name.toLowerCase()) {
                            if (!data["_embedded"]["items"][i]["name"].includes("PARKING")) {
                                if (eventArray.length < 5) {
                                    var event = createEvent(data["_embedded"]["items"][i]);
                                    eventArray.push(event);
                                }
                            }

                        }
                    }
                    // order the event array by start date
                    eventArray.sort(function (a, b) {
                        var dateA = new Date(a["date"]), dateB = new Date(b["date"]);
                        return dateA - dateB;
                    });
                    setEventArray(eventArray);
                })
                .catch(error => console.error(error));
        }

    }
    useEffect(() => {
        performSearch();
    }, [props.name, props.id]);


    return (
        <Schedule eventArray={eventArray} />
    );
}

UpcomingSchedule.propTypes = {
    name: PropTypes.string,
    id: PropTypes.string
};