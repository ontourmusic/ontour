import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import { createClient } from '@supabase/supabase-js';
import {supabase} from "../components/supabaseClient"

const CommentBox = (props) => {
  const [name, setName] = useState('');
  const [comment, setComment] = useState('');
  const [date, setDate] = useState('');
  const [comments, setComments] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formOpened, setFormOpened] = useState(false);
  const [artistName, setArtistName] = useState('');
  const disabled = !name || !comment;
  // const supabase = createClient('https://zouczoaamusrlkkuoppu.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpvdWN6b2FhbXVzcmxra3VvcHB1Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY3ODE1ODUyMSwiZXhwIjoxOTkzNzM0NTIxfQ.LTuL_u0tzmsj8Zf9m6JXN4JivwLq1aRXvU2YN-nDLCo');

  console.log(props,"comments")
  useEffect(() => {
    // reset states
    setName('');
    setComment('');
    setComments([]);

    const fetchArtistName = async () => {
      if(props.isVenue){
        const { data, error } = await supabase
        .from('venues')
        .select('*')
        .eq('venue_id', props.imageData.venue_id)
        .single();
        if (error) {
            console.error(error);
            return null;
        }
        setArtistName(data.name);
    }
    else if(props.isFestival){
      const { data, error } = await supabase
      .from('festivals')
      .select('*')
      .eq('id', props.imageData.festival_id)
      .single();
      if (error) {
          console.error(error);
          return null;
      }
      setArtistName(data.name);
    }else{
      const { data, error } = await supabase
      .from('artists')
      .select('*')
      .eq('artist_id', props.imageData.artist_id)
      .single();
      if (error) {
          console.error(error);
          return null;
      }
      setArtistName(data.name);
    }
      }
      
    fetchArtistName();

    const currentDate = new Date();
    const day = currentDate.getDate().toString().padStart(2, '0');
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const year = currentDate.getFullYear().toString();
    const formattedDate = `${month}/${day}/${year}`;
    setDate(formattedDate);
    if (props.isVenue) {
      const fetchComments = async () => {
        const { data, error } = await supabase
          .from('venue_comments')
          .select('name, comment, date')
          .eq('image_id', props.imageData.id)
          .order('date');
        if (error) console.log('Error fetching comments:', error.message);
        else setComments(data);
      };
      fetchComments();
    }
    else {
      const fetchComments = async () => {
        const { data, error } = await supabase
          .from('artist_comments')
          .select('name, comment, date')
          .eq('image_id', props.imageData.id)
          .order('date');
          console.log(data);
        if (error) console.log('Error fetching comments:', error.message);
        else setComments(data);
      };
      fetchComments();
    }
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    setComments([...comments, { name, comment, date: date }]);
    setName(comments.name);
    setComment(comments.comment);
    postData();
  };

  const postData = async () => {
    let tableName = 'artist_comments';
    if (props.isVenue) {
      tableName = 'venue_comments';
    }
    const { data, error } = await supabase
      .from(tableName)
      .insert(
        [{ 'name': name, 'comment': comment, 'date': date, 'image_id': props.imageData.id }]
      );
    setName('');
    setComment('');
  }

  const handleCommentButtonClick = () => {
    setShowForm(true);
    setFormOpened(true);
  }

  const cancelComment = () => {
    setShowForm(false);
    setFormOpened(false);
  }

  return (
    <div style={{
        // backgroundColor: modalBackgroundColour,
        color: props.textColor
    }}>
      <h2 style={{ fontWeight: 'bold'}}>Photos of {artistName}</h2>
      {props.imageData.event && (
        <div>
          <h4>{props.imageData.event} • {props.imageData.eventDate}</h4>
        </div>
      )}
      {props.imageData.description && (
        <div>
          <hr style={{ marginTop: '45px', visibility:'hidden' }} />
          <p style={{ fontStyle: 'italic' }}>{props.imageData.description}</p>
        </div>
      )}
      {!formOpened && (
      <div style={{textAlign:'center'}}>
        <Button variant="outlined" onClick={handleCommentButtonClick}>Write a comment</Button>
      </div>
      )}
      {showForm && (
      <form onSubmit={handleSubmit}>
        <div class="mb-3">
          <input
            type="text"
            class="form-control"
            id="name"
            value={name}
            placeholder='Name'
            onChange={(event) => setName(event.target.value)}
          />
        </div>
        <div class="mb-3">
          <textarea
            class="form-control"
            id="comment"
            value={comment}
            onChange={(event) => setComment(event.target.value)}
            maxLength={200}
            placeholder='Comment'>
          </textarea>
        </div>
        <Button
          variant="outlined"
          type='submit'
          style={{
            color: disabled ? props.textColor : "blue",
            borderColor: disabled ? props.textColor : "blue",
            marginRight: '10px'
          }}
          disabled={disabled}>
          Post
        </Button>
        <Button variant="outlined" onClick={cancelComment}>Cancel</Button>
      </form>
      )}
      <hr style={{ marginTop: '10px' }} />
      <div style={{ maxHeight: '300px', overflowY: 'auto', color: "black" }}>
        {comments.length === 0 && <p style={{ fontStyle: 'italic', textAlign: 'center', marginTop: '10px', color: "white" }}>Be the first to comment!</p>}
        {comments.slice().reverse().map((comment, index) => (
          <div key={index}>
            <div class="card" style={{ margin: '10px' }}>
              <div class="card-body">
                <p class="card-text" style={{ display: 'inline-block', fontWeight: 'bold' }}>
                  {comment.name}
                </p>
                <p class="card-text" style={{ display: 'inline-block', fontWeight: 'normal' }}>
                  {` \u00A0`}• {comment.date}
                </p>
                <p class="card-text">{comment.comment}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentBox;

CommentBox.propTypes = {
  imageData: PropTypes.object.isRequired,
  isVenue: PropTypes.bool.isRequired,
  textColor: PropTypes.string.isRequired
};