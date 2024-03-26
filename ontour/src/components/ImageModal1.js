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
import  parse from 'html-react-parser';
import { html } from "../html";
import Alerts from "./Alert";
// import parse from "html-react-parser"
const ImageModal1 = (props) => {
  const [showForm, setShowForm] = useState(false);
  const [formOpened, setFormOpened] = useState(false);
  const [comments, setComments] = useState([]);
  const [name, setName] = useState('');
  const [comment, setComment] = useState('');
  const [mediaData,setMediaData] = useState([]);
  const [mediaId,setMediaId] = useState(null);
  const disabled = !name || !comment;
 
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
    console.log(formDataObject)
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

  const postData = async () => {
    let tableName = 'artist_comments';
    // if (props.isVenue) {
    //   tableName = 'venue_comments';
    // }
    const { data, error } = await supabase
      .from(tableName)
      .insert([{ 'name': name, 'comment': comment, 'date': new Date().toISOString(), 'image_id': props.imageData.id }]);
    if (!error) {
      // Track event if needed
    }
  };

  const handleCommentButtonClick = () => {
    setShowForm(true);
    setFormOpened(true);
  };

  const cancelComment = () => {
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
    
  },[])
  async function x(){
    const res = await axios.get("https://mixpanel.com/p/HNrJzwXEDnxmUipwP1Gmfw")
    console.log(await res.text())
  }
  useEffect(()=>{
    // x();
  },[])
  // console.log(props.mediaIndex,"data")
  const settings = {
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    dots: true,
    initialSlide: 1,

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
      <Alerts message="Comments"/>
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
            <div style={{maxHeight:"600px"}} key={index}>
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
                        <Button variant="outline-primary" onClick={handleCommentButtonClick}>Write a comment</Button>
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
                        <Button variant="outline-secondary" onClick={cancelComment}>Cancel</Button>
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


// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import React from 'react'

// import artist_styles from '../Styles/artist_styles'

// import Slider from "react-slick";
// import PropTypes from "prop-types";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
// import CommentBox from "./CommentBox";
// import { Grid, Modal } from "@mui/material";
// import { useState, useEffect } from "react";
// import { GetAverageColor, getTextColor, rgbToHex } from "./ColorFunctions";
// import mixpanel from "mixpanel-browser";
// import { mixPanelId } from "../constants/constants";
// import { useAuth0 } from "@auth0/auth0-react";
// // import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext, DotGroup, Image } from 'pure-react-carousel';
// import { Polaroid } from './Polaroid';
// import { supabase } from './supabaseClient';
// import Button from '@mui/material/Button';
// import { error } from 'jquery';
// import CommentBox1 from './CommentBox1';
// import { isImageUrl, isVideoUrl } from "../common_functions/common_functions";
// const modal_styles = artist_styles.modal;
// const ImageModal1 = (props) => {
//   const [modalBackgroundColour, setModalBackgroundColour] = useState(
//     "rgba(76, 78, 120, 0.9)"
//   );
//   const [imageBackgroundColour, setImageBackgroundColour] = useState(
//     "rgba(5, 2, 14, 1.0)"
//   );
//   var settings = {
//     infinite: false,
//     speed: 500,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     arrows: true,
//     dots: true,

//   };
//   const [textColor, setTextColor] = useState("white");
//   const [showForm, setShowForm] = useState(false);
//   const [formOpened, setFormOpened] = useState(false);
//   const [comments, setComments] = useState([]);
//   const [name, setName] = useState('');
//   const [comment, setComment] = useState('');
//   const [date, setDate] = useState('');
//   const disabled = !name || !comment;
//   const fetchComments = async () => {
//     console.log("fetching comments")
//     try {
//       const { data, error } = await supabase
//         .from('artist_comments')
//         .select(`*,artist_images(*)`)
//         .eq('artist_images.artist_id', props.artistID)

//       if (!error) {
//         let x = []
//         for (let i = 0; i < data.length; i++) {
//           if (data[i].artist_images) {
//             x.push(data[i])
//             console.log(data[i])
//           }
//         }
//         setComments(x)
//       }
//     } catch (error) {
//       console.log(error)

//     }

//   }
//   const handleSubmit = (event) => {
//     event.preventDefault();
//     setComments([...comments, { name, comment, date: date }]);
//     setName(comments.name);
//     setComment(comments.comment);
//     postData();
//   };

//   const postData = async () => {
//     let tableName = 'artist_comments';
//     if (props.isVenue) {
//       tableName = 'venue_comments';
//     }
//     const { data, error } = await supabase
//       .from(tableName)
//       .insert(
//         [{ 'name': name, 'comment': comment, 'date': date, 'image_id': props.imageData.id }]
//       );
//     if(!error){
//       // sendDataToMixPanel('post_comment_button_clicked')
//     }
//     setName('');
//     setComment('');
//   }
//   function sendDataToMixPanel(eventName){
//     mixpanel.track(eventName, {
//       "media_id" : props.imageData.id,
//       "media_url" : props.imageData.video_url || props.imageData.image_url,
//       "media_type" : (props.imageData.video_url && "video") || (props.imageData.image_url && "image") || "image",
//       "entity_id" : props.imageData.artist_id || props.imageData.venue_id || props.imageData.festival_id,
//       "entity_name" : props.name ,
//       "entity_type" : `${(props.imageData.artist_id && "artist") || (props.imageData.venue_id && "venue") || (props.imageData.festival_id && "festival")}`,
//       "user" : props.user?props.user:'guest',
//     });
//   }
//   const handleCommentButtonClick = () => {
//     console.log('handleCommentButtonClick',props.imageData,props.isVenue,props.isFestival);
//   //  sendDataToMixPanel('write_comment_button_clicked')
//     setShowForm(true);
//     setFormOpened(true);
//   }

//   const cancelComment = () => {
//     // sendDataToMixPanel('cancel_comment_button_clicked')
//     setShowForm(false);
//     setFormOpened(false);
//   }

//   useEffect(() => {
//     fetchComments()
//   }, [props.artistID])



//   // console.log(props)
//   return (
//     <Modal

//       open={true}
//       onClose={props.handleClose1}
//       aria-labelledby="modal-modal-title"
//       aria-describedby="modal-modal-description"
//       // style={artist_styles.modal.container}
//       style={{ height: "100%", width: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}
//     >
//       <div className='content' style={{
//         background: "rgb(9,0,36)",
//         background: `linear-gradient(160deg, rgba(9,0,36,1) 63%, rgba(9,9,121,1) 91%, rgba(0,212,255,1) 100%)`, height: "90%", width: "90%", position: "relative",
//         padding: "30px 10px 30px 10px",

//       }}>
//         <div style={{ position: "absolute", top: 10, right: 10, height: '2rem', zIndex: "1000" }}>
//           <button
//             id="modalCloseBtn"
//             onClick={props.handleClose1}
//             style={{ float: "right" }}
//             className="btn btn-light"
//           >
//             X
//           </button>
//         </div>

//         <Slider className=""  {...settings}>

//           {
//             props.media.map((image, index) => {
                    
//               if(image != null){  
//               return (
//                 <>
               
//                 <div key={index} className="d-flex flex-row ">
//                   {!isVideoUrl(image)?
//                   <img  width="1000" height="600" style={{ objectFit: "fill" }} src={image} alt='xyz' />
//                   :< video  playsInline
//                   preload="metadata"
//                   controls
//                   src={image + "#t=0.2"} 
//                   id = "video"
//                   width="1000" height="600" />
//               }
//                   <div>
//                     <h2 style={{ fontWeight: 'bold', color: "white" }}>Photos of {props.artistname}</h2>
//                     {!formOpened && (
//                       <div style={{ textAlign: 'center' }}>
//                         <Button variant="outlined" onClick={handleCommentButtonClick}>Write a comment</Button>
//                       </div>
//                     )}
//                     {showForm && (
//                       <form onSubmit={handleSubmit}>
//                         <div class="mb-3">
//                           <input
//                             type="text"
//                             class="form-control"
//                             id="name"
//                             value={name}
//                             placeholder='Name'
//                             onChange={(event) => setName(event.target.value)}
//                           />
//                         </div>
//                         <div class="mb-3">
//                           <textarea
//                             class="form-control"
//                             id="comment"
//                             value={comment}
//                             onChange={(event) => setComment(event.target.value)}
//                             maxLength={200}
//                             placeholder='Comment'>
//                           </textarea>
//                         </div>
//                         <Button
//                           variant="outlined"
//                           type='submit'
//                           style={{
//                             color: disabled ? props.textColor : "blue",
//                             borderColor: disabled ? props.textColor : "blue",
//                             marginRight: '10px'
//                           }}
//                           disabled={disabled}
//                           >
//                           Post
//                         </Button>
//                         <Button variant="outlined" onClick={cancelComment}>Cancel</Button>
//                       </form>
//                     )}
//                     <div style={{ maxHeight: '300px', overflowY: 'auto', color: "black" }}>
//                       {
//                         !!comments.length && comments.map((comment, index) => {
//                           return (
//                             <>

//                               {comment.artist_images.image_url === image &&
//                                 <div key={index}>
//                                   <div class="card" style={{ margin: '10px' }}>
//                                     <div class="card-body">
//                                       <p class="card-text" style={{ display: 'inline-block', fontWeight: 'bold' }}>
//                                         {comment.name}
//                                       </p>
//                                       <p class="card-text" style={{ display: 'inline-block', fontWeight: 'normal' }}>
//                                         {` \u00A0`}• {comment.date}
//                                       </p>
//                                       <p class="card-text">{comment.comment}</p>
//                                     </div>
//                                   </div>
//                                 </div>


//                               }
//                             </>
//                           )
//                         })
//                       }
//                     </div>
//                   </div>
//                 </div>
           
//             </> )}
//             })
//           }
         


//         </Slider>
//       </div>

//       {/* <Grid item xs={12} md={8} style={modal_styles.imageContainer}>
          

//         </Grid> */}
//       {/* <Grid
//           item
//           xs={12}
//           md={4}
//           sx={{
//             paddingLeft: { xs: "0px", md: "10px" },
//           }}
//         >
//           {
//             <CommentBox1 comments={comments} />
//           }

//           {/* abcd */}
//       {/* <CommentBox
//             textColor={textColor}
//             // imageData={props.imageData}
//             // isVenue={props.isVenue}
//             // isFestival={props.isFestival}
//             // user={user}
//             // name={ props.name ||props.artistFname || props.venueName|| props.festivalName}
//           /> */}
//       {/* </Grid> */}
//       {/* // </Grid> */}
//     </Modal>
//   )
// }

// export default ImageModal1