import React from "react";
import PropTypes from "prop-types";
import '../index.css';
import {useState, useEffect} from 'react';
import Rating from '@mui/material/Rating';
import Reaptcha from 'reaptcha';

import {createClient} from '@supabase/supabase-js';
import {useAuth0} from "@auth0/auth0-react";

import {Typography} from "@mui/material";
import common_styles from "../Styles/common_styles";
import Form from 'react-bootstrap/Form';
import mixpanel from "mixpanel-browser";

const window_breakpoints = common_styles.window_breakpoints;


const WriteVenueReview = (props) => {
    const [name, setName] = useState("");
    const [eventName, setEvent] = useState("");
    const [description, setDescription] = useState("");
    const [rating, setRating] = useState("");
    const [reviews, setPastReviews] = useState([]);
    const [canSubmit, setCanSubmit] = useState(true);
    const [captchaVerified, setCaptcha] = useState(false);
    const [artistName, setArtistName] = useState("");
    const [eventDate, setEventDate] = useState("");
    const supabase = createClient('https://zouczoaamusrlkkuoppu.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpvdWN6b2FhbXVzcmxra3VvcHB1Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY3ODE1ODUyMSwiZXhwIjoxOTkzNzM0NTIxfQ.LTuL_u0tzmsj8Zf9m6JXN4JivwLq1aRXvU2YN-nDLCo');
    const [showDates, setShowDates] = useState([]);
    const [selectedShow, setSelectedShow] = useState("");
    const [dateList, setDateList] = useState([]);
    const [venueList, setVenueList] = useState([]);
    const [maxEventCount, setMaxEventCount] = useState(10);

    const [customEventEnabled, setCustomEventEnabled] = useState(false);

    const {user, isAuthenticated, isLoading} = useAuth0();

    // only set is used
    const [venueId, setVenueId] = useState(0);
    const [reviewsSet, setReviewsSet] = useState(false);

    const onVerify = recaptchaResponse => {
        console.log(recaptchaResponse);
        setCaptcha(true);
    };


    const handleWriteReview = event => {
        event.preventDefault();
        if (!rating) {
            setCanSubmit(false);
            return false;
        } else {
            setRating(rating);
        }
        setVenueId(props.venueId);
        setCanSubmit(true);
        postData();

    }

    const handleFormChange = (event) => {
        const {value} = event.target;
        if (event.target.value == "extend") {
            setMaxEventCount(maxEventCount + 10);
        } else if (value === "others") {
            setCustomEventEnabled(true);
        } else {
            setEvent(event.target.value);
        }
    }

    const handleEventNameChange = (event) => {
        setEvent(event.target.value);
    }

    const handleDateChange = (event) => {
        setEventDate(event.target.value);
    }

    useEffect(() => {
        GetPastReviews();
    }, [maxEventCount, props.venueId]);

    const GetPastReviews = async () => {
        try {
            const festival = await supabase.from('venues').select('*').eq('venue_id', props.venueId);
            const dates = festival["data"][0]["show_date"];
            setDateList(dates);
            const venues = festival["data"][0]["show_artist"];
            setVenueList(venues);
        } catch (err) {
            console.log('API Error');
        }
    }

    const postData = async () => {
        // var fname = parsedName[0];
        // var lname = parsedName[1];

        if (dateList) {
            var date = eventName.split(" • ")[0];
            var event = eventName.split(" • ")[1];
        } else {
            var date = eventDate;
            var event = eventName;
        }
        const {data2, error2} = await supabase
            .from('venues')
            .update({'review_count': props.numReviews + 1})
            .eq('venue_id', props.venueId);

        let postName = name;
        if (isAuthenticated) {
            postName = user.username;
        }
        const {data, error} = await supabase
            .from('venue_reviews')
            .insert(
                [{
                    'venue_id': props.venueId,
                    'rating': rating,
                    'review': description,
                    'name': postName,
                    'artist': artistName,
                    'eventDate': date
                }]
            );
            if(!error){
                console.log(rating,description,name,artistName,eventDate);
                mixpanel.track("review_submitted",{
                    'entity_id' : `${props.venueId}`,
                    'entity_name' : props.name,
                    'entity_type' : 'venue',
                    'rating' : rating,
                    // 'date' : date,
                    'event' : event,
                    'user' : isAuthenticated ? user : 'guest'
                })
             }
             console.log("venue review form")
        window.location.reload();
    }

    const HandleDescription = event => {
        var word = event.target.value;
        word.replace(/\n\r?/g, '<br />');
        setDescription(word);
    }

    const handleNameChange = event => {
        var name = event.target.value;
        setName(name);
    }

    return (
        <div class="container" id="review">
            <hr></hr>
            <div style={{
                marginTop: "15px",
                marginBottom: "15px"
            }}>
                <Typography variant="h5" align="left" className="fw-bold">Review: Rate Your Experience</Typography>
            </div>
            <div class="rating row">
                <div id="stars" class="col-3">
                    <Rating name="rating" sx={{fontSize: "2.5rem"}} required defaultValue={0} precision={1}
                            onChange={(event, newValue) => {
                                setRating(newValue);
                            }}/>
                </div>
            </div>
            <form id="clear" onSubmit={handleWriteReview}>
                <div class="row top">
                    {isAuthenticated ? <></> :
                        <div class="col">
                            <input type="text" class="form-control shadow-none" onChange={handleNameChange} value={name}
                                   placeholder="Name" required/>
                        </div>
                    }
                </div>
                <div class="row bottom">
                    <div class="col">
                        {dateList &&
                            <>
                                <Form.Select aria-label="Default select example" required onChange={handleFormChange}>
                                    <option value="" selected>Select an event</option>
                                    {
                                        dateList.map((date, index) => (
                                            <option value={`${date} • ${venueList[index]} `}>
                                                {date} • {venueList[index]}
                                            </option>
                                        ))
                                    }
                                    {
                                        maxEventCount < 20 ?
                                            <option value="extend">Select an Older Event</option> : <></>
                                    }
                                    {
                                        <option key="others" value="others">Other</option>
                                    }

                                </Form.Select> </>}
                        {!dateList &&
                            <input type="text" class="form-control shadow-none" onChange={handleEventNameChange}
                                   placeholder={"Venue"} required/>}
                    </div>
                    {!dateList &&
                        <div class="col">
                            <input type="date" class="form-control shadow-none" onChange={handleDateChange}
                                   placeholder={"Date"} required/>
                        </div>
                    }

                    {customEventEnabled && (
                        <div className="row bottom">
                            <div className="col">
                                <input type="text" className="form-control shadow-none" onChange={handleEventNameChange}
                                       placeholder={"Venue"} required/>
                            </div>
                            <div className="col">
                                <input type="date" className="form-control shadow-none" onChange={handleDateChange}
                                       placeholder={"Date"} required/>
                            </div>
                        </div>
                    )}


                </div>
                <div class="row bottom">
                    <div class="col">
            <textarea
                class="form-control shadow-none"
                style={{whiteSpace: "pre-wrap"}}
                rows="5" cols="100"
                id="description"
                maxLength={5000}
                onChange={HandleDescription}
                value={description}
                placeholder="How was your experience?" required
            />
                    </div>
                </div>
                <div>
                    <Reaptcha size={window.innerWidth < window_breakpoints.md ? "compact" : "normal"}
                              sitekey="6LefzYUkAAAAAGRZShYPyFleVLHh_aJFZ97xHsyI" onVerify={onVerify}/>
                    <button id="reviewbutton" class="btn btn-dark fw-bold" type="submit"
                            disabled={!captchaVerified}>Submit
                    </button>
                </div>
            </form>
            {!canSubmit &&
                <div className="alert alert-danger fw-bold" role="alert" style={{marginTop: "25px"}}>Please leave a
                    rating.</div>}
        </div>
    )
}

export default WriteVenueReview;

WriteVenueReview.propTypes = {
    name: PropTypes.string.isRequired,
    numReviews: PropTypes.number.isRequired,
    venueId: PropTypes.string.isRequired,
};
