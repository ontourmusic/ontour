import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import React, { useState, useEffect, useRef } from 'react';
import Slider from "react-slick";
import PropTypes from "prop-types";
import { Modal, Button, Row, Col, Alert } from "react-bootstrap";
import { supabase } from './supabaseClient';
import { isVideoUrl } from "../common_functions/common_functions";
import { RiArrowLeftCircleLine, RiArrowRightCircleFill, RiArrowRightCircleLine } from "react-icons/ri";
import axios from "axios";


import Alerts from "./Alert";
import mixpanel from "mixpanel-browser";
import { useAuth0 } from "@auth0/auth0-react";
// import parse from "html-react-parser"
const ImageModal1 = (props) => {
  const [showForm, setShowForm] = useState(false);
  const [formOpened, setFormOpened] = useState(false);
  const [comments, setComments] = useState([]);
  const [name, setName] = useState('');
  const [comment, setComment] = useState('');
  const [mediaData,setMediaData] = useState([]);
  const {user,isAuthenticated} = useAuth0();
  const disabled = !name || !comment;
  var c = 0
  const fetchComments = async () => {
    try {
      const { data, error } = await supabase
        .from('artist_comments')
        .select(`*,artist_images(*)`)
        .eq('artist_images.artist_id', props.artistID)

      if (!error) {
        let x = [];
        for (let i = 0; i < data.length; i++) {
          if (data[i].artist_images) {
            x.push(data[i]);
          }
        }
        setComments(x);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(event)
    let formData = new FormData(e.target);
    let formDataObject = Object.fromEntries(formData.entries());
    // console.log(formDataObject)
    try {
      const {data,error} = await supabase
      .from("artist_comments")
      .insert([{ 'name': formDataObject.name, 'comment': formDataObject.comment, 'date': new Date().toISOString(), 'image_id': formDataObject.mediaid }]);
      if(!error){
        alert("Comment Saved Successfully")
        fetchComments()
        setFormOpened(false);
        setShowForm(false);
      }
    } catch (error) {
      
    }
  };

  function sendDataToMixPanel(eventName,id,url,type){
    mixpanel.track(eventName, {
      "media_id" : id,
      "media_url" : url,
      "media_type" : type,
      "entity_id" : props.imageData.artist_id || props.imageData.venue_id || props.imageData.festival_id,
      "entity_name" : props.name ||props.artistFname || props.venueName|| props.festivalName,
      "entity_type" : `${(props.imageData.artist_id && "artist") || (props.imageData.venue_id && "venue") || (props.imageData.festival_id && "festival")}`,
      "user" : props.user?props.user:'guest',
    });
  }

  function handleCommentButtonClick (mediaItem){
    // console.log(mediaItem,"mediaitem")
    let url = !isVideoUrl(mediaItem.image_url || mediaItem.video_url)?mediaItem.image_url:mediaItem.video_url
    let type = !isVideoUrl(mediaItem.image_url || mediaItem.video_url)?"image":"video"
    sendDataToMixPanel('write_comment_button_clicked',mediaItem.id,url,type)
    setShowForm(true);
    setFormOpened(true);
  };

  function cancelComment (mediaItem){
    let url = !isVideoUrl(mediaItem.image_url || mediaItem.video_url)?mediaItem.image_url:mediaItem.video_url
    let type = !isVideoUrl(mediaItem.image_url || mediaItem.video_url)?"image":"video"
    sendDataToMixPanel('cancel_comment_button_clicked',mediaItem.id,url,type)
    setShowForm(false);
    setFormOpened(false);
  };
  const fetchMediaData = async () => {
    try {
      const { data, error } = await supabase.from('artist_images').select('*').eq('artist_id', props.artistID);
      if(!error){
        // console.log(data,"mediaData")
        setMediaData(data)
      }
    } catch (error) {
      console.log(error)
    }
  }
  const sliderRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.keyCode === 37) {
        // Left arrow key
        sliderRef.current.slickPrev();
      } else if (event.keyCode === 39) {
        // Right arrow key
        sliderRef.current.slickNext();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);
  // console.log(mediaId,"media id")
  useEffect(() => {
    fetchMediaData()
    fetchComments();
  }, [props.artistID]);
  useEffect(() => {
    let defaultSlideIndex = props.mediaData.findIndex(mediaItem => mediaItem.image_url === props.mediaUrl || mediaItem.video_url === props.mediaUrl);
    if (defaultSlideIndex !== -1 && sliderRef.current) {
      sliderRef.current.slickGoTo(defaultSlideIndex);
    }
  }, [props.mediaData, props.mediaUrl]);
  useEffect(() => {
    
    if(c == 0){
      mixpanel.track("media_clicked", {
        "media_id" : props.imageData.id,
        "media_url" : props.imageData.video_url || props.imageData.image_url,
        "media_type" : (props.imageData.video_url && "video") || (props.imageData.image_url && "image") || "image",
        "entity_id" : props.imageData.artist_id || props.imageData.venue_id || props.imageData.festival_id,
        "entity_name" : props.name ||props.artistFname || props.venueName|| props.festivalName,
        "entity_type" : `${(props.imageData.artist_id && "artist") || (props.imageData.venue_id && "venue") || (props.imageData.festival_id && "festival")}`,
        "user" : user?user:'guest',
        "mode" : props.mode
  })
      c = c + 1
    }
  }, []);
  
 
  const settings = {
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    dots: true,
   

  };
// console.log(props.mediaData,"data")
  return (
    <Modal
      show={true}
      onHide={props.handleClose1}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      
    >
      <Modal.Header closeButton>
        <Modal.Title>Photos of {props.artistname}</Modal.Title>
       {/* {parse(html)} */}
      </Modal.Header>
      {/* <Alerts message="Comments"/> */}
      <Modal.Body >
        <div className="d-flex justify-content-between  w-100 p-2 bg-light">
        <RiArrowLeftCircleLine  style={{cursor:"pointer",}}  onClick={() =>{sliderRef.current.slickPrev() }} size={40}/>
        <RiArrowRightCircleLine  style={{cursor:"pointer",}}  onClick={() => sliderRef.current.slickNext()} size={40}/>
        </div>
        <Slider ref={sliderRef} {...settings}>
          {props.mediaData.map((mediaItem, index) => {
           if(mediaItem != null){
            
           return (
            <>
            <div  style={{maxHeight:"600px"}} key={index}>
              <Row>
                <Col xs={12} lg={8}>
                  <div className="media-container">
                    {!isVideoUrl(mediaItem.image_url || mediaItem.video_url) ?
                      <img width="100%" height="50%" style={{ maxWidth: "1000px",maxHeight:"300px", objectFit: "fill" }} src={mediaItem.image_url} alt='xyz' />
                      : <video playsInline preload="metadata" controls src={mediaItem.video_url + "#t=0.2"} width="100%" style={{maxHeight:"300px"}} />
                    }
                  </div>
                </Col>
                <Col xs={12} lg={4}>
                  <div className="comments-container">
                    {!formOpened &&
                      <div className="text-center">
                        <Button variant="outline-primary" onClick={()=>{handleCommentButtonClick(mediaItem)}}>Write a comment</Button>
                      </div>
                    }
                    {showForm &&
                      <form onSubmit={handleSubmit} className="mt-3">
                        <div className="mb-3">
                          <input
                            type="text"
                            className="form-control"
                            value={name}
                            placeholder='Name'
                            name = "name"
                            onChange={(event) => setName(event.target.value)}
                          />
                          <input type="hidden" name="mediaid"  value={mediaItem.id}/>
                        </div>
                        <div className="mb-3">
                          <textarea
                            className="form-control"
                            value={comment}
                            name="comment"
                            onChange={(event) => setComment(event.target.value)}
                            maxLength={200}
                            placeholder='Comment'>
                          </textarea>
                        </div>
                        <Button variant="outline-primary" type='submit' disabled={disabled}>Post</Button>{' '}
                        <Button variant="outline-secondary" onClick={() => {cancelComment(mediaItem)}}>Cancel</Button>
                      </form>
                    }
                    <div className="mt-3 comments-list" style={{ maxHeight: '300px', overflowY: 'auto', color: "black" }}>
                     {
                        !!comments.length ? comments.map((comment, index) => {
                          return (
                            <>

                             {comment.artist_images.image_url === mediaItem.image_url &&
                               <div key={index} className="card mb-3">
                          <div className="card-body">
                            <span className="card-text" style={{ fontWeight: 'bold' }}>{comment.name}</span>
                            <span className="card-text" style={{ fontWeight: 'normal' }}>• {comment.date}</span>
                            <p className="card-text">{comment.comment}</p>
                          </div>
                        </div>
                        }
                          </>
                          )
                        }):<>Loading Comments...</>
                      } 
                      {/* {comments.map((comment, index) => (
                        return <>
                        {comment.artist_images.image_url === image &&
                        <div key={index} className="card mb-3">
                          <div className="card-body">
                            <p className="card-text" style={{ fontWeight: 'bold' }}>{comment.name}</p>
                            <p className="card-text" style={{ fontWeight: 'normal' }}>{` \u00A0`}• {comment.date}</p>
                            <p className="card-text">{comment.comment}</p>
                          </div>
                        </div>

                        }
                        </>
                      ))} */}
                    </div>
                  </div>
                </Col>
              </Row>
            </div>
            </>

          )}})}
       
        </Slider>
       
      </Modal.Body>
     
    </Modal>
  );
};

export default ImageModal1;

