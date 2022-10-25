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
    event.preventDefault();
    console.log(rating);
    if(!rating)
    {
      console.log("rating is null");
      var rate = 0;
      setRating(rate);
    }
    else
    {
      setRating(rating);
    }
    setArtistId(props.artistId);
    console.log(artistId);
    console.log(rating);
    setDescription(description);
    postData();
    // window.location.reload();
  }

  const postData = async () => {
    console.log("posting the data");
    const response = await fetch(`http://localhost:8000/reviews/?artist_id=${props.artistId}&event_id=1&rating=${rating}&description=${description}&fname=${fname}&lname=${lname}&eventname=${eventName}&date=${date}`,{
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
          <form id="clear" onSubmit={handleWriteReview}>
            <div class="row top">
              <div class="col">
                <input type="text" class="form-control shadow-none" onChange={event => setFname(event.target.value)} value ={fname} placeholder="First Name" required/>
              </div>
              <div class="col">
                <input type="text" class="form-control shadow-none" onChange={event => setLname(event.target.value)} value ={lname} placeholder="Last Name" required/>
              </div>
            </div>
            <div class="row bottom">
              <div class="col">
                <input type="text" class="form-control shadow-none" onChange={event => setEvent(event.target.value)} value ={eventName} placeholder="Event Name" required/>
              </div>
              <div class="col">
                <input type="date" class="form-control shadow-none" id="date" onChange={event => setDate(event.target.value)}  placeholder="Date" required/>
              </div>
            </div>
            <div class="row bottom">
              <div class="col">
                <textarea class="form-control shadow-none" id="description" rows="3" onChange={event => setDescription(event.target.value)} value ={description} placeholder="How was your experience?" required></textarea>
              </div>
            </div>
            <br></br>
            <div>
              <button id="reviewbutton" class="btn btn-dark fw-bold" type="submit" >Submit</button>
            </div>
          </form>
        </div>
    )
}