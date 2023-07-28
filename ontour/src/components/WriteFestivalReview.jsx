import React from "react";
import PropTypes from "prop-types";
import '../index.css';
import { useState, useEffect } from 'react';
import Rating from '@mui/material/Rating';
import Reaptcha from 'reaptcha';
import { createClient } from '@supabase/supabase-js'
import common_styles from "../Styles/common_styles";
import { useAuth0 } from "@auth0/auth0-react";
const window_breakpoints = common_styles.window_breakpoints;

const WriteFestivalReview = (props) => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [rating, setRating] = useState("");
    const [canSubmit, setCanSubmit] = useState(true);
    const [captchaVerified, setCaptcha] = useState(false);
    const [eventDate, setEventDate] = useState("");
    const supabase = createClient('https://zouczoaamusrlkkuoppu.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpvdWN6b2FhbXVzcmxra3VvcHB1Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY3ODE1ODUyMSwiZXhwIjoxOTkzNzM0NTIxfQ.LTuL_u0tzmsj8Zf9m6JXN4JivwLq1aRXvU2YN-nDLCo');
    const [festivalId, setVenueId] = useState(0);

    const { user, isAuthenticated, isLoading } = useAuth0();


    const onVerify = recaptchaResponse => {
        console.log(recaptchaResponse);
        setCaptcha(true);
    };

    const handleWriteReview = event => {
        event.preventDefault();
        if (!rating) {
            setCanSubmit(false);
            return false;
        }
        else {
            setRating(rating);
        }
        setVenueId(props.venueId);
        setCanSubmit(true);
        postData();

    }

    const postData = async () => {
        const { data2, error2 } = await supabase
            .from('festivals')
            .update({ 'review_count': props.numReviews + 1 })
            .eq('id', props.festivalId);

        var postName = name;
        if (isAuthenticated) {
            postName = user.username;
        }

        const { data, error } = await supabase
            .from('festival_reviews')
            .insert(
                [{ 'festival_id': props.festivalId, 'rating': rating, 'review': description, 'name': postName, 'eventDate': eventDate }]
            );
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
            <h4 id="write-review" class="fw-bold">Rate Your Experience</h4>
            <div class="rating row">
                <div id="stars" class="col-3">
                    <Rating name="rating" sx={{ fontSize: "2.5rem" }} required defaultValue={0} precision={1} onChange={(event, newValue) => { setRating(newValue); }} />
                </div>
            </div>
            <form id="clear" onSubmit={handleWriteReview}>
                <div class="row top">
                    {isAuthenticated ? <></> :
                        <div class="col">
                            <input type="text" class="form-control shadow-none" onChange={handleNameChange} value={name} placeholder="Name" required />
                        </div>
                    }
                </div>
                <div class="row bottom">
                    <div class='col'>
                        <input type="date" class="form-control shadow-none" onChange={eventDate => setEventDate(eventDate.target.value)} value={eventDate} placeholder="Event Date" required />
                    </div>
                </div>
                <div class="row bottom">
                    <div class="col">
                        <textarea class="form-control shadow-none" style={{ whiteSpace: "pre-wrap" }} rows="5" cols="100" id="description" maxLength={5000} onChange={HandleDescription} value={description} placeholder="How was your experience?" required></textarea>
                    </div>
                </div>
                <div>
                    <Reaptcha sitekey="6LefzYUkAAAAAGRZShYPyFleVLHh_aJFZ97xHsyI" onVerify={onVerify} />
                    <button id="reviewbutton" class="btn btn-dark fw-bold" type="submit" disabled={!captchaVerified} >Submit</button>
                </div>
            </form>
            {!canSubmit && <div className="alert alert-danger fw-bold" role="alert" style={{ marginTop: "25px" }}>Please leave a rating.</div>}
        </div>
    );
}

export default WriteFestivalReview;

WriteFestivalReview.propTypes = {
    name: PropTypes.string.isRequired,
    numReviews: PropTypes.number.isRequired,
    festivalId: PropTypes.string.isRequired,
};