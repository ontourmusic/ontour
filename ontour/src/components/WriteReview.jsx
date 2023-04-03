import React from "react";
import '../index.css';
import { useState, useEffect } from 'react';
import Rating from '@mui/material/Rating';
import Form from 'react-bootstrap/Form';
import Reaptcha from 'reaptcha';
import { createClient } from '@supabase/supabase-js'
import { PropaneSharp } from "@mui/icons-material";

export default function WriteReview(props) {
  const [unparsedName, setUnparsedName] = useState("");
  const [parsedName, setParsedName] = useState(["", " "]);
  const [eventName, setEvent] = useState("");
  const [description, setDescription] = useState("");
  const [rating, setRating] = useState("");
  const [reviews, setPastReviews] = useState([]);
  const [canSubmit, setCanSubmit] = useState(true);
  const [captchaVerified, setCaptcha] = useState(false);
  const [maxEventCount, setMaxEventCount] = useState(10);
  const supabase = createClient('https://zouczoaamusrlkkuoppu.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpvdWN6b2FhbXVzcmxra3VvcHB1Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY3ODE1ODUyMSwiZXhwIjoxOTkzNzM0NTIxfQ.LTuL_u0tzmsj8Zf9m6JXN4JivwLq1aRXvU2YN-nDLCo');



  // only set is used
  const [artistId, setArtistId] = useState(0);
  const [reviewsSet, setReviewsSet] = useState(false);

  // currently unused
  // const [rawMedia, setRawMedia] = useState([]);
  // const [media, setMedia] = useState("");
  // const [date, setDate] = useState("");

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
    setArtistId(props.artistId);

    // f.log(rawMedia.files[0].name);
    // var fReader = new FileReader();
    // fReader.readAsDataURL(rawMedia.files[0]);
    // fReader.onloadend = function(event){
    //   var img = event.target.result;
    //   console.log(img);
    //   setMedia(img);
    // }
    // setDescription(description);
    setCanSubmit(true);
    postData();

  }

  useEffect(() => {
    GetPastReviews();
  }, [maxEventCount]);

  const GetPastReviews = async () => {
    var adele = " ";
    var url = " ";
    try {
      if (props.name.includes("Adele")) {
        adele = "Adele";
        url = `https://rest.bandsintown.com/artists/Adele/events?app_id=958313646c7db923871b501a616498a9&date=past`;
      }
      else {
        var name = props.name.replace(" ", "%20");
        url = `https://rest.bandsintown.com/artists/${name}/events?app_id=958313646c7db923871b501a616498a9&date=past`;
      }
      const pastReviews = await fetch(url);
      const pastData = await pastReviews.json();
      pastData.reverse();
      const eventList = [];
      for (var i = 0; i < maxEventCount; i++) {
          var date = pastData[i].datetime.split("T")[0];
          date = date.split("-");
          var year = date[0];
          var month = date[1];
          var day = date[2];
          var mmddyyyy = month + "/" + day + "/" + year;
          pastData[i].datetime = mmddyyyy;
          eventList.push(pastData[i]);
      }
      if (eventList.length > 0) {
        setReviewsSet(true);
        setPastReviews(eventList);
        setEvent(`${reviews[0].datetime.split("T")[0]} • ${reviews[0].venue.name}`);
      }
    }
    catch (err) {
      console.log('API Error');
    }
  }

  const postData = async () => {
    var fname = parsedName[0];
    var lname = parsedName[1];

    var eventDate = eventName.split(" • ")[0];
    var event = eventName.split(" • ")[1];


    const { data2, error2 } = await supabase
      .from('artists')
      .update({ 'review_count': props.numReviews+1 })
      .eq('artist_id', props.artistId);

  
  const { data, error } = await supabase
  .from('artist_reviews')
  .insert(
    [{'artist_id': props.artistId, 'rating': rating, 'review': description, 'name': unparsedName, 'event': event, 'eventDate': eventDate }]
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
    setUnparsedName(name);
    var first = "";
    var last = " ";
    if (name) {
      if (name.includes(" ")) {
        var nameArray = name.split(" ");
        for (var i = 0; i < nameArray.length - 1; i++) {
          if (first === "") first = nameArray[i];
          else first += " " + nameArray[i];
        }
        last = nameArray[nameArray.length - 1];
      }
      else {
        first = name;
      }
    }
    setParsedName([first, last])
  }

  const handleFormChange = (event) => {
    if(event.target.value == "extend"){
      setMaxEventCount(maxEventCount+10);
    }
    else{
      setEvent(event.target.value);
    }
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
            <input type="text" class="form-control shadow-none" onChange={handleNameChange} value={unparsedName} placeholder="Name" required />
          </div>
        </div>
        <div class="row bottom">
          <div class="col">
            {/* <input type="text" class="form-control shadow-none" onChange={event => setEvent(event.target.value)} value ={eventName} placeholder="Event Name" required/> */}
            {reviews.length > 0 &&
              <>
                <Form.Select aria-label="Default select example" required onChange={handleFormChange}>
                  <option value="" selected>Select an event</option>
                  {
                    reviews.map((review) => (
                        <option value={`${review.datetime.split("T")[0]} • ${review.venue.name} `}>
                          {review.datetime} • {review.venue.name}
                        </option>
                    ))
                  }
                  {
                   maxEventCount < 20 ? <option value="extend">Select an Older Event</option> : <></>
                  }
                  
                </Form.Select> </>}
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
          <Reaptcha sitekey="6LefzYUkAAAAAGRZShYPyFleVLHh_aJFZ97xHsyI" onVerify={onVerify}/>
          <button id="reviewbutton" class="btn btn-dark fw-bold" type="submit" disabled={!captchaVerified} >Submit</button>
        </div>
      </form>
      {!canSubmit && <div className="alert alert-danger fw-bold" role="alert" style={{ marginTop: "25px" }}>Please leave a rating.</div>}
    </div>
  )
}
