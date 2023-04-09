import React from "react";
import '../index.css';
import Show from "./Show";
import {useState, useEffect} from "react";


export default function FestivalUpcomingSchedule(props) {
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
                    console.log(data);
                    var eventArray = [];
                    // for (var i = 0; i < data["_embedded"]["items"].length; i++) {
                    //     if (data["_embedded"]["items"][i]["_embedded"]["categories"][0]["name"].toLowerCase() == name.toLowerCase()) {
                    //         if (!data["_embedded"]["items"][i]["name"].includes("PARKING")) {
                    //             if (eventArray.length < 5) {
                    //                 console.log(data["_embedded"]["items"][i]);
                    //                 var event = createEvent(data["_embedded"]["items"][i]);
                    //                 eventArray.push(event);
                    //             }
                    //         }

                    //     }
                    // }
                    // // order the event array by start date
                    // eventArray.sort(function (a, b) {
                    //     var dateA = new Date(a["date"]), dateB = new Date(b["date"]);
                    //     return dateA - dateB;
                    // });
                    // setEventArray(eventArray);
                })
                .catch(error => console.error(error));
        }

    }
    useEffect(() => {
        performSearch();
    }, [props.name]);
    
}