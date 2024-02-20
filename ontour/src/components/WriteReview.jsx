import React from "react";
import PropTypes from "prop-types";
import '../index.css';
import { useState, useEffect } from 'react';
import Rating from '@mui/material/Rating';
import Form from 'react-bootstrap/Form';
import Reaptcha from 'reaptcha';
import { createClient } from '@supabase/supabase-js'
import common_styles from "../Styles/common_styles";

import { useAuth0 } from "@auth0/auth0-react";

import { Typography } from "@mui/material";

const window_breakpoints = common_styles.window_breakpoints;

const WriteReview = (props) => {
  const [unparsedName, setUnparsedName] = useState("");
  const [parsedName, setParsedName] = useState(["", " "]);
  const [eventName, setEvent] = useState("");
  const [eventDate, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [rating, setRating] = useState("");
  const [reviews, setPastReviews] = useState([]);
  const [canSubmit, setCanSubmit] = useState(true);
  const [captchaVerified, setCaptcha] = useState(false);
  const [maxEventCount, setMaxEventCount] = useState(10);
  const [dateList, setDateList] = useState([]);
  const [venueList, setVenueList] = useState([]);
  const supabase = createClient('https://zouczoaamusrlkkuoppu.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpvdWN6b2FhbXVzcmxra3VvcHB1Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY3ODE1ODUyMSwiZXhwIjoxOTkzNzM0NTIxfQ.LTuL_u0tzmsj8Zf9m6JXN4JivwLq1aRXvU2YN-nDLCo');

  const { user, isAuthenticated, isLoading } = useAuth0();
  // console.log(props.artistId)
  // only set is used
  const [artistId, setArtistId] = useState(0);
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
    setArtistId(props.artistId);
    setCanSubmit(true);
    postData();
  }

  useEffect(() => {
    GetPastReviews();
  }, [maxEventCount, props.artistId]);

  const GetPastReviews = async () => {
    try {
      const artist = await supabase.from('artists').select('*').eq('artist_id', props.artistId);
      const dates = artist["data"][0]["show_date"];
      setDateList(dates);
      const venues = artist["data"][0]["show_venue"];
      setVenueList(venues);
    }
    catch (err) {
      console.log('API Error');
    }
  }

  const postData = async () => {
    var fname = parsedName[0];
    var lname = parsedName[1];

    if(dateList)
    {
      var date = eventName.split(" • ")[0];
      var event = eventName.split(" • ")[1];
    }
    else
    {
      var date = eventDate;
      var event = eventName;
    }


    const { data2, error2 } = await supabase
      .from('artists')
      .update({ 'review_count': props.numReviews + 1 })
      .eq('artist_id', props.artistId);

    let name = unparsedName;
    if (isAuthenticated) {
      name = user.username;
    }



    const { data, error } = await supabase
      .from('artist_reviews')
      .insert(
        [{ 'artist_id': props.artistId, 'rating': rating, 'review': description, 'name': name, 'event': event, 'eventDate': date }]
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
    if (event.target.value == "extend") {
      setMaxEventCount(maxEventCount + 10);
    }
    else {
      setEvent(event.target.value);
    }
  }

  const handleEventNameChange = (event) => {
    setEvent(event.target.value);
  }

  const handleDateChange = (event) => {
    setDate(event.target.value);
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
      <div class="rating row">
        <div id="stars" class="col-3">
          <Rating name="rating" sx={{ fontSize: "2.5rem" }} required defaultValue={0} precision={1} onChange={(event, newValue) => { setRating(newValue); }} />
        </div>
      </div>
      <form id="clear" onSubmit={handleWriteReview}>
        <div class="row top">

          {isAuthenticated ? <></> :
            <div class="col">
              <input type="text" class="form-control shadow-none" onChange={handleNameChange} value={unparsedName} placeholder={"Name"} required />
            </div>
          }

        </div>
        <div class="row bottom">
          <div class="col">
            {dateList &&
              <>
                <Form.Select aria-label="Default select example" required onChange={handleFormChange}>
                  <option value="" selected>Select an event</option>
                  {
                    dateList.map((date, index) => (
                      <option value={`${date} • ${venueList[index]} `}>
                        {date} • {venueList[index]}
                      </option>
                    ))
                  }
                  {
                    maxEventCount < 20 ? <option value="extend">Select an Older Event</option> : <></>
                  }

                </Form.Select> </> }
            {!dateList && <input type="text" class="form-control shadow-none" onChange={handleEventNameChange} placeholder={"Venue"} required />}
          </div>
          {!dateList &&
            <div class="col">
                  <input type="date" class="form-control shadow-none" onChange={handleDateChange} placeholder={"Date"} required />
            </div>
          }
        </div>
        <div class="row bottom">
          <div class="col">
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

export default WriteReview;

WriteReview.propTypes = {
  artistId: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  numReviews: PropTypes.number.isRequired,
};