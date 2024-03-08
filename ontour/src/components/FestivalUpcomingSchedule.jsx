import React from "react";
import PropTypes from "prop-types";
import '../index.css';
import {useState, useEffect} from "react";
import { format } from 'date-fns';
import Schedule from "./Schedule";

class UpcomingEvent {
    constructor(name, date, eventId, eventURL, timezone, eventTime, venue, city, state, price) {
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
    }
}

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
    var price = eventInfo.min_ticket_price.display;
    var event = new UpcomingEvent(name, fullDate, 0, url, "Los Angeles", newTime, venue, city, state, price);
    return event;
}

export default function FestivalUpcomingSchedule(props) {
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
                        if(!data["_embedded"]["items"][i]["name"].includes("ONLY"))
                        {
                            var event = createEvent(data["_embedded"]["items"][i]);
                            eventArray.push(event);
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
    }, [props.name]);

    return (
        <Schedule venueId={props.venueId} festivalId={props.festivalId} artistID={props.artistID} name={props.name} venue={props.venue}  festival={props.festival} artist={props.artist} eventArray={eventArray}/>
    );
}

FestivalUpcomingSchedule.propTypes = {
    name: PropTypes.string.isRequired,
};