import React from "react";
import '../index.css';
import {useState, useEffect} from 'react';
import Rating from '@mui/material/Rating';
import Form from 'react-bootstrap/Form';

export default function WriteReview(props)
{
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [eventName, setEvent] = useState("");
  const [description, setDescription] = useState("");
  const [rating, setRating] = useState("");
  const [date, setDate] = useState("");
  const [artistId, setArtistId] = useState(0);
  const [reviews, setPastReviews] = useState([]);
  const [reviewsSet, setReviewsSet] = useState(false);
  const [canSubmit, setCanSubmit] = useState(true);

  const handleWriteReview = event => {
    event.preventDefault();
    if(!rating)
    {
      setCanSubmit(false);
      return false;
    }
    else
    {
      setRating(rating);
    }
    setArtistId(props.artistId);
    console.log(artistId);
    console.log(rating);
    setDescription(description);
    setCanSubmit(true);
    postData();
    window.location.reload();
  }

  useEffect(() => {
    GetPastReviews();
  }, []);

  const GetPastReviews = async () => {
    const pastReviews = await fetch(`https://rest.bandsintown.com/artists/${props.name}/events?app_id=dce6df6b60d8613b98183dd0b3ac36a3&date=past`);
    const pastData = await pastReviews.json();
    pastData.reverse();
    for(var i = 0; i < 10; i++)
    {
      if(reviews.length < 10)
      {
        reviews.push(pastData[i]);
      }
    }
    console.log(reviews);
    if(reviews.length > 0)
    {
      setReviewsSet(true);
      setEvent(`${reviews[0].datetime.split("T")[0]} • ${reviews[0].venue.name}`);
    }
  }

  const postData = async () => {
    console.log(eventName);
    var event = eventName.split(" • ")[0];
    var eventDate = eventName.split(" • ")[1];
    console.log(event);
    await fetch(`http://ec2-3-17-148-99.us-east-2.compute.amazonaws.com:8000/reviews/?artist_id=${props.artistId}&event_id=1&rating=${rating}&description=${description}&fname=${fname}&lname=${lname}&eventname=${event}&date=${eventDate}`,{
      method: 'POST',
    });
  }

    return (
        <div class="container" id="review">
          <hr></hr>
          <h4 id="write-review" class="fw-bold">Rate Your Experience</h4>
          <div id="stars" class="rating">
            <Rating name="rating" size="large"required defaultValue={0} precision={1} onChange={(event, newValue) => {setRating(newValue);}} />
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
                {/* <input type="text" class="form-control shadow-none" onChange={event => setEvent(event.target.value)} value ={eventName} placeholder="Event Name" required/> */}
                {reviews.length > 0 &&  
                <>
                <Form.Select aria-label="Default select example" required onChange={event => setEvent(event.target.value)}>
                  <option value="" disabled selected hidden>Select an Event</option>
                  <option value={`${reviews[0].datetime.split("T")[0]} • ${reviews[0].venue.name} `}>
                    {reviews[0].datetime.split("T")[0]} • {reviews[0].venue.name}
                    </option>
                  <option value={`${reviews[1].datetime.split("T")[0]} • ${reviews[1].venue.name} `}>
                    {reviews[1].datetime.split("T")[0]} • {reviews[1].venue.name}
                    </option>
                  <option value={`${reviews[2].datetime.split("T")[0]} • ${reviews[2].venue.name}`}>
                    {reviews[2].datetime.split("T")[0]} • {reviews[2].venue.name} 
                    </option>
                  <option value={`${reviews[3].datetime.split("T")[0]} • ${reviews[3].venue.name}`}>
                    {reviews[3].datetime.split("T")[0]} • {reviews[3].venue.name}
                  </option>
                  <option value={`${reviews[4].venue.name} • ${reviews[4].datetime.split("T")[0]}`}>
                    {reviews[4].datetime.split("T")[0]} • {reviews[4].venue.name} 
                  </option>
                  <option value={`${reviews[5].venue.name} • ${reviews[5].datetime.split("T")[0]}`}>
                    {reviews[5].datetime.split("T")[0]} • {reviews[5].venue.name}
                  </option>
                  <option value={` ${reviews[6].datetime.split("T")[0]} • ${reviews[6].venue.name}`}>
                    {reviews[6].datetime.split("T")[0]} • {reviews[6].venue.name}
                  </option>
                  <option value={`${reviews[7].datetime.split("T")[0]} • ${reviews[7].venue.name}`}>
                    {reviews[7].datetime.split("T")[0]} • {reviews[7].venue.name} 
                  </option>
                  <option value={`${reviews[8].datetime.split("T")[0]} • ${reviews[8].venue.name}`}>
                    {reviews[8].datetime.split("T")[0]} • {reviews[8].venue.name}
                  </option>
                  <option value={`${reviews[9].datetime.split("T")[0]} • ${reviews[9].venue.name}`}>
                    {reviews[9].datetime.split("T")[0]} • {reviews[9].venue.name} 
                  </option>
                </Form.Select> </>}
              </div>
            </div>
            <div class="row bottom">
              <div class="col">
                <textarea class="form-control shadow-none" id="description" rows="3" maxLength={300} onChange={event => setDescription(event.target.value)} value ={description} placeholder="How was your experience?" required></textarea>
              </div>
            </div>
            <div>
              <button id="reviewbutton" class="btn btn-dark fw-bold" type="submit" >Submit</button>
            </div>
          </form>
          {!canSubmit && <div className="alert alert-danger" role="alert" style={{marginTop: "20px"}}>Please leave a rating</div>}
        </div>
    )
}