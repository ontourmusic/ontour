import React from "react";
import '../index.css';
import { useState, useEffect } from 'react';
import Rating from '@mui/material/Rating';
import Form from 'react-bootstrap/Form';

export default function WriteVenueReview(props) {
  const [name, setName] = useState("");
  const [eventName, setEvent] = useState("");
  const [description, setDescription] = useState("");
  const [rating, setRating] = useState("");
  const [reviews, setPastReviews] = useState([]);
  const [canSubmit, setCanSubmit] = useState(true);


  // only set is used
  const [venueId, setVenueId] = useState(0);
  const [reviewsSet, setReviewsSet] = useState(false);


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
    var artistName = "default";
    var date = "12-10-2021";
    var encodedDescription = encodeURIComponent(description);
    await fetch(`http://127.0.0.1:8000/venue_reviews/?venue_id=${props.venueId}&rating=${rating}&description=${encodedDescription}&name=${name}&artistname=${artistName}&date=${date}`, { method: 'POST', mode: 'cors' });
    //await fetch(`http://ec2-3-129-52-41.us-east-2.compute.amazonaws.com:8000/reviews/?venue_id=${props.venueId}&event_id=1&rating=${rating}&description=${encodedDescription}&fname=${first}&lname=${last}&eventname=${event}&date=${eventDate}`, { method: 'POST', mode: 'cors' });
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
            {/* <input type="text" class="form-control shadow-none" onChange={event => setEvent(event.target.value)} value ={eventName} placeholder="Event Name" required/> */}
            {reviews.length > 0 &&
              <>
                <Form.Select aria-label="Default select example" required onChange={event => setEvent(event.target.value)}>
                  <option value="" disabled selected hidden>Select an event</option>
                  <option value={`${reviews[0].datetime.split("T")[0]} • ${reviews[0].venue.name} `}>
                    {reviews[0].datetime} • {reviews[0].venue.name}
                  </option>
                  <option value={`${reviews[1].datetime.split("T")[0]} • ${reviews[1].venue.name} `}>
                    {reviews[1].datetime} • {reviews[1].venue.name}
                  </option>
                  <option value={`${reviews[2].datetime.split("T")[0]} • ${reviews[2].venue.name}`}>
                    {reviews[2].datetime} • {reviews[2].venue.name}
                  </option>
                  <option value={`${reviews[3].datetime.split("T")[0]} • ${reviews[3].venue.name}`}>
                    {reviews[3].datetime} • {reviews[3].venue.name}
                  </option>
                  <option value={`${reviews[4].datetime.split("T")[0]} • ${reviews[4].venue.name}`}>
                    {reviews[4].datetime} • {reviews[4].venue.name}
                  </option>
                  <option value={`${reviews[5].datetime.split("T")[0]} • ${reviews[5].venue.name}`}>
                    {reviews[5].datetime} • {reviews[5].venue.name}
                  </option>
                  <option value={` ${reviews[6].datetime.split("T")[0]} • ${reviews[6].venue.name}`}>
                    {reviews[6].datetime} • {reviews[6].venue.name}
                  </option>
                  <option value={`${reviews[7].datetime.split("T")[0]} • ${reviews[7].venue.name}`}>
                    {reviews[7].datetime} • {reviews[7].venue.name}
                  </option>
                  <option value={`${reviews[8].datetime.split("T")[0]} • ${reviews[8].venue.name}`}>
                    {reviews[8].datetime} • {reviews[8].venue.name}
                  </option>
                  <option value={`${reviews[9].datetime.split("T")[0]} • ${reviews[9].venue.name}`}>
                    {reviews[9].datetime} • {reviews[9].venue.name}
                  </option>
                </Form.Select> </>}
          </div>
        </div>
        <div class="row bottom">
          <div class="col">
            {/* <textarea class="form-control shadow-none" style={{whiteSpace: "pre-wrap"}}  rows="5" cols="100" id="description" maxLength={5000} onChange={event => setDescription(event.target.value)} value ={description} placeholder="How was your experience?" required></textarea> */}
            <textarea class="form-control shadow-none" style={{ whiteSpace: "pre-wrap" }} rows="5" cols="100" id="description" maxLength={5000} onChange={HandleDescription} value={description} placeholder="How was your experience?" required></textarea>
          </div>
        </div>
        <div>
          <button id="reviewbutton" class="btn btn-dark fw-bold" type="submit" >Submit</button>
        </div>
      </form>
      {!canSubmit && <div className="alert alert-danger fw-bold" role="alert" style={{ marginTop: "25px" }}>Please leave a rating.</div>}
    </div>
  )
}
