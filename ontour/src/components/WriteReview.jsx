import React from "react";
import '../index.css';
import {useState} from 'react';
export default function WriteReview(props)
{
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [eventName, setEvent] = useState("");
  const [description, setDescription] = useState("");
  const [rating, setRating] = useState("");
  const [date, setDate] = useState("");

  const handleWriteReview = event => {
    console.log("in clicked write review");
    console.log(fname);
    console.log(lname);
    console.log(eventName);
    console.log(description);
    console.log(rating);
    console.info(date);
  }

    return (
        <div class="container pb-5" id="review">
          <h4 class="fw-bold">Write a Review</h4>
          <hr></hr>
          <div class="rating" onChange={event => setRating(event.target.value)}>
            <input type="radio" name="rating" value="5" id="5"/><label for="5">☆</label>
            <input type="radio" name="rating" value="4" id="4"/><label for="4">☆</label>
            <input type="radio" name="rating" value="3" id="3"/><label for="3">☆</label>
            <input type="radio" name="rating" value="2" id="2"/><label for="2">☆</label>
            <input type="radio" name="rating" value="1" id="1"/><label for="1">☆</label>
          </div>
          <form>
            <div class="row">
              <div class="col">
                <input type="text" class="form-control" onChange={event => setFname(event.target.value)} value ={fname} placeholder="First name"/>
              </div>
              <div class="col">
                <input type="text" class="form-control" onChange={event => setLname(event.target.value)} value ={lname} placeholder="Last name"/>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <input type="text" class="form-control" onChange={event => setEvent(event.target.value)} value ={eventName} placeholder="Event"/>
              </div>
              <div class="col">
                <input type="date" class="form-control" id="date" onChange={event => setDate(event.target.value)}  placeholder="Date"/>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <textarea class="form-control" id="description" rows="3" onChange={event => setDescription(event.target.value)} value ={description} placeholder="Description"></textarea>
              </div>
            </div>
            <br></br>
            <div id="reviewbutton">
              <input class="btn btn-dark fw-bold" type="button" onClick={handleWriteReview} value="Submit"></input>
            </div>

          </form>
        </div>
    )
}