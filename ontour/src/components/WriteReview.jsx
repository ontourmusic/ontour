import React from "react";
import '../index.css';
import {useState} from 'react';
import Rating from '@mui/material/Rating';

export default function WriteReview(props)
{
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [eventName, setEvent] = useState("");
  const [description, setDescription] = useState("");
  const [rating, setRating] = useState("");
  const [date, setDate] = useState("");
  const [artistId, setArtistId] = useState(0);

  const handleWriteReview = event => {
    console.log("in clicked write review");
    console.log(fname);
    console.log(lname);
    console.log(eventName);
    console.log(description);
    console.log(rating);
    console.info(date);
    console.log(props.artistId);
    setArtistId(props.artistId);
    console.log(artistId);
    setDescription(description);
    setRating(rating);
    postData();
    window.location.reload();
  }

  const postData = async () => {
    console.log("posting the data");
    const response = await fetch(`http://localhost:8000/reviews/?artist_id=${props.artistId}&event_id=1&rating=${rating}&description=${description}&fname=${fname}&lname=${lname}&eventname=${eventName}`,{
      method: 'POST',
    });
  }

    return (
        <div class="container" id="review">
          <hr></hr>
          <h4 id="write-review" class="fw-bold">Rate Your Experience</h4>
          <div class="rating py-3">
              <Rating name="rating" size="large" defaultValue={0} precision={1} onChange={(event, newValue) => {setRating(newValue);}} />
          </div>
          <form id="clear">
            <div class="row top">
              <div class="col">
                <input type="text" class="form-control shadow-none" onChange={event => setFname(event.target.value)} value ={fname} placeholder="First name"/>
              </div>
              <div class="col">
                <input type="text" class="form-control shadow-none" onChange={event => setLname(event.target.value)} value ={lname} placeholder="Last name"/>
              </div>
            </div>
            <div class="row bottom">
              <div class="col">
                <input type="text" class="form-control shadow-none" onChange={event => setEvent(event.target.value)} value ={eventName} placeholder="Event Name"/>
              </div>
              <div class="col">
                <input type="date" class="form-control shadow-none" id="date" onChange={event => setDate(event.target.value)}  placeholder="Date"/>
              </div>
            </div>
            <div class="row bottom">
              <div class="col">
                <textarea class="form-control shadow-none" id="description" rows="3" onChange={event => setDescription(event.target.value)} value ={description} placeholder="How was your experience?"></textarea>
              </div>
            </div>
            <br></br>
            <div>
              <input id="reviewbutton" class="btn btn-dark fw-bold" type="button" onClick={handleWriteReview} value="Submit"></input>
            </div>
          </form>
        </div>
    )
}