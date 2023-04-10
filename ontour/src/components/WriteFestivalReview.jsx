import React from "react";
import '../index.css';
import { useState, useEffect } from 'react';
import Rating from '@mui/material/Rating';
import Form from 'react-bootstrap/Form';
import Reaptcha from 'reaptcha';
import { createClient } from '@supabase/supabase-js'
import common_styles from "../Styles/common_styles";
const window_breakpoints = common_styles.window_breakpoints;



export default function WriteFestivalReview(props)
{
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

    const [festivalId, setVenueId] = useState(0);
    const [reviewsSet, setReviewsSet] = useState(false);


    const onVerify = recaptchaResponse => {
        console.log(recaptchaResponse);
        setCaptcha(true);
    };
    





    return (
        <div class="container" id="review">
             <hr></hr>
            <h4 id="write-review" class="fw-bold">Rate Your Experience</h4>
            <div class="rating row">
                <div id="stars" class="col-3">
                <Rating name="rating" sx={{fontSize: "2.5rem"}} required defaultValue={0} precision={1} onChange={(event, newValue) => { setRating(newValue); }} />
                </div>
            </div>
        </div>
    );
}