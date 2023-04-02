import React from "react";
import '../index.css';
import { useState, useEffect } from 'react';
import Rating from '@mui/material/Rating';
import Form from 'react-bootstrap/Form';
import Reaptcha from 'reaptcha';
import { createClient } from '@supabase/supabase-js'

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
    //var encodedDescription = encodeURIComponent(description);
    //await fetch(`http://127.0.0.1:8000/venue_reviews/?venue_id=${props.venueId}&rating=${rating}&description=${encodedDescription}&name=${name}&artistname=${artistName}&date=${eventDate}`, { method: 'POST', mode: 'cors' });
    //await fetch(`http://localhost:8000/venue_reviews/?venue_id=${props.venueId}&rating=${rating}&description=${encodedDescription}&name=${name}&artistname=${artistName}&date=${eventDate}`, { method: 'POST', mode: 'cors' });
    const { data, error } = await supabase
      .from('venue_reviews')
      .insert(
        [{'venue_id': props.venueId, 'rating': rating, 'review': description, 'name': name, 'artist': artistName, 'eventDate': eventDate }]
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
      {/* {media && <img src={media} class="d-block w-100" alt="..."/>} */}
      {/* // <img src="https://www.adobe.com/content/dam/cc/us/en/creativecloud/photography/discover/concert-photography/thumbnail.jpeg" class="d-block w-100" alt="..."/> */}
      <hr></hr>
      <h4 id="write-review" class="fw-bold">Rate Your Experience</h4>
      <div class="rating row">
        <div id="stars" class="col-3">
          <Rating name="rating" size="large" required defaultValue={0} precision={1} onChange={(event, newValue) => { setRating(newValue); }} />
        </div>
      </div>
      <form id="clear" onSubmit={handleWriteReview}>
        <div class="row top">
          <div class="col">
            <input type="text" class="form-control shadow-none" onChange={handleNameChange} value={name} placeholder="Name" required />
          </div>
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
            <textarea class="form-control shadow-none" style={{ whiteSpace: "pre-wrap" }} rows="5" cols="100" id="description" maxLength={5000} onChange={HandleDescription} value={description} placeholder="How was your experience?" required></textarea>
          </div>
        </div>
        <div>
          <Reaptcha sitekey="6LefzYUkAAAAAGRZShYPyFleVLHh_aJFZ97xHsyI" onVerify={onVerify}/>
          <button id="reviewbutton" class="btn btn-dark fw-bold" type="submit" disabled={!captchaVerified} >Submit</button>
        </div>
      </form>
      {!canSubmit && <div className="alert alert-danger fw-bold" role="alert" style={{ marginTop: "25px" }}>Please leave a rating.</div>}
    </div>
  )
}
