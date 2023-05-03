import React from "react";
import '../index.css';
import { useState, useEffect } from 'react';
import Rating from '@mui/material/Rating';
import Reaptcha from 'reaptcha';

import { createClient } from '@supabase/supabase-js';
import { useAuth0 } from "@auth0/auth0-react";

import { Typography } from "@mui/material";
import common_styles from "../Styles/common_styles";
const window_breakpoints = common_styles.window_breakpoints;


export default function WriteVenueReview(props) {
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

  const { user, isAuthenticated, isLoading } = useAuth0();

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
    }
    else {
      setRating(rating);
    }
    setVenueId(props.venueId);
    setCanSubmit(true);
    postData();

  }

  useEffect(() => {
    //GetPastReviews();
  }, []);

  const GetPastReviews = async () => {
    // NEED API CALL TO GET PAST EVENTS AT A VENUE
    var url = " ";

    const pastReviews = await fetch(url);
    const pastData = await pastReviews.json();
    pastData.reverse();
    for (var i = 0; i < 10; i++) {
      if (reviews.length < 10) {
        var date = pastData[i].datetime.split("T")[0];
        date = date.split("-");
        var year = date[0];
        var month = date[1];
        var day = date[2];
        var mmddyyyy = month + "/" + day + "/" + year;
        pastData[i].datetime = mmddyyyy;
        reviews.push(pastData[i]);
      }
    }
    if (reviews.length > 0) {
      setReviewsSet(true);
      setEvent(`${reviews[0].datetime.split("T")[0]} • ${reviews[0].venue.name}`);
    }
  }

  const postData = async () => {
    const { data2, error2 } = await supabase
      .from('venues')
      .update({ 'review_count': props.numReviews + 1 })
      .eq('venue_id', props.venueId);

    let postName = name;
    if(isAuthenticated){
      postName = user.username;
    }
    const { data, error } = await supabase
      .from('venue_reviews')
      .insert(

        [{'venue_id': props.venueId, 'rating': rating, 'review': description, 'name': postName, 'artist': artistName, 'eventDate': eventDate }]
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
      <div style={{
        marginTop: "15px",
        marginBottom: "15px"
      }}>
        <Typography variant="h5" align="left" className="fw-bold">Review: Rate Your Experience</Typography>
      </div>
      {/* <h4 id="write-review" class="fw-bold">Rate Your Experience</h4> */}
      <div class="rating row">
        <div id="stars" class="col-3">
          {/* <Rating name="rating" size="large" required defaultValue={0} precision={1} onChange={(event, newValue) => { setRating(newValue); }} /> */}
          <Rating name="rating" sx={{ fontSize: "2.5rem" }} required defaultValue={0} precision={1} onChange={(event, newValue) => { setRating(newValue); }} />
        </div>
      </div>
      <form id="clear" onSubmit={handleWriteReview}>
        <div class="row top">
          {isAuthenticated ? <></>:
            <div class="col">
              <input type="text" class="form-control shadow-none" onChange={handleNameChange} value={name} placeholder="Name" required />
            </div>
          }
        </div>
        <div class="row bottom">
          <div class="col">
            <input type="text" class="form-control shadow-none" onChange={artistName => setArtistName(artistName.target.value)} value={artistName} placeholder="Artist Name" required />
          </div>
          <div class='col'>
            <input type="date" class="form-control shadow-none" onChange={eventDate => setEventDate(eventDate.target.value)} value={eventDate} placeholder="Event Date" required />
          </div>
        </div>
        <div class="row bottom">
          <div class="col">
            {/* <textarea class="form-control shadow-none" style={{whiteSpace: "pre-wrap"}}  rows="5" cols="100" id="description" maxLength={5000} onChange={event => setDescription(event.target.value)} value ={description} placeholder="How was your experience?" required></textarea> */}
            <textarea
              class="form-control shadow-none"
              style={{ whiteSpace: "pre-wrap" }}
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
          <Reaptcha size={window.innerWidth < window_breakpoints.md ? "compact" : "normal"} sitekey="6LefzYUkAAAAAGRZShYPyFleVLHh_aJFZ97xHsyI" onVerify={onVerify} />
          <button id="reviewbutton" class="btn btn-dark fw-bold" type="submit" disabled={!captchaVerified} >Submit</button>
        </div>
      </form>
      {!canSubmit && <div className="alert alert-danger fw-bold" role="alert" style={{ marginTop: "25px" }}>Please leave a rating.</div>}
    </div>
  )
}
