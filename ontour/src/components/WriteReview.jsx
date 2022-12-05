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
  const [rawMedia, setRawMedia] = useState([]);
  const [media, setMedia] = useState("");
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
    console.log(rawMedia.files[0].name);
    var fReader = new FileReader();
    fReader.readAsDataURL(rawMedia.files[0]);
    fReader.onloadend = function(event){
      var img = event.target.result;
      console.log(img);
      setMedia(img);
    }
    setDescription(description);
    setCanSubmit(true);
    postData();
    window.location.reload();
  }

  useEffect(() => {
    GetPastReviews();
  }, []);

  const GetPastReviews = async () => {
    const pastReviews = await fetch(`https://rest.bandsintown.com/artists/${props.name}/events?app_id=dce6df6b60d8613b98183dd0b3ac36a3&date=past`, {mode: 'cors'});
    const pastData = await pastReviews.json();
    pastData.reverse();
    for(var i = 0; i < 10; i++)
    {
      if(reviews.length < 10)
      {
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
    if(reviews.length > 0)
    {
      setReviewsSet(true);
      setEvent(`${reviews[0].datetime.split("T")[0]} • ${reviews[0].venue.name}`);
    }
  }

  const postData = async () => {
    var eventDate = eventName.split(" • ")[0];
    var event = eventName.split(" • ")[1];
    var first = fname.charAt(0).toUpperCase() + fname.slice(1).toLowerCase();
    var last = lname.charAt(0).toUpperCase() + lname.slice(1).toLowerCase();
    await fetch(`http://127.0.0.1:8000/reviews/?artist_id=${props.artistId}&event_id=1&rating=${rating}&description=${description}&fname=${first}&lname=${last}&eventname=${event}&date=${eventDate}`, {method: 'POST', mode: 'cors'});
  }

    return (
      
        <div class="container" id="review">
          {/* {media && <img src={media} class="d-block w-100" alt="..."/>} */}
          {/* // <img src="https://www.adobe.com/content/dam/cc/us/en/creativecloud/photography/discover/concert-photography/thumbnail.jpeg" class="d-block w-100" alt="..."/> */}
          <hr></hr>
          <h4 id="write-review" class="fw-bold">Rate Your Experience</h4>
          <div id="stars" class="rating">
            <Rating name="rating" size="large"required defaultValue={0} precision={1} onChange={(event, newValue) => {setRating(newValue);}} />
          </div>
          <form id="clear" onSubmit={handleWriteReview}>
            <div class="row top">
              <div class="col">
                <input type="text" class="form-control shadow-none" onChange={event => setFname(event.target.value)} value ={fname} placeholder="First name" required/>
              </div>
              <div class="col">
                <input type="text" class="form-control shadow-none" onChange={event => setLname(event.target.value)} value ={lname} placeholder="Last name" required/>
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
              <input type="file" id="myFile" name="filename" onChange={event => setRawMedia(event.target)}/>
              </div>
            </div>
            <div class="row bottom">
              <div class="col">
                <textarea class="form-control shadow-none"  rows="5" cols="100" id="description" maxLength={5000} onChange={event => setDescription(event.target.value)} value ={description} placeholder="How was your experience?" required></textarea>
              </div>
            </div>
            <div>
              <button id="reviewbutton" class="btn btn-dark fw-bold" type="submit" >Submit</button>
            </div>
          </form>
          {!canSubmit && <div className="alert alert-danger fw-bold" role="alert" style={{marginTop: "25px"}}>Please leave a rating.</div>}
        </div>
    )
}
