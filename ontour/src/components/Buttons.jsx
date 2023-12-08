import React from "react";
import PropTypes from "prop-types";
import "../index.css";
import Button from "@mui/material/Button";
import { useState, useEffect } from "react";
import Modal from "@mui/material/Modal";
import { CameraAlt } from "@mui/icons-material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { Box } from "@mui/material";
import button_style from "../Styles/button_styles";
import { createClient } from "@supabase/supabase-js";
import artist_styles from "../Styles/artist_styles";
import Form from "react-bootstrap/Form";
import Spinner from "react-bootstrap/Spinner";

const two_column_button_style = button_style.two_column_button;
const supabase = createClient(
  "https://zouczoaamusrlkkuoppu.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpvdWN6b2FhbXVzcmxra3VvcHB1Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY3ODE1ODUyMSwiZXhwIjoxOTkzNzM0NTIxfQ.LTuL_u0tzmsj8Zf9m6JXN4JivwLq1aRXvU2YN-nDLCo"
);
const modal_styles = artist_styles.mediaUploadModal;

const TwoColumnButton = (props) => {
  return (
    <button style={two_column_button_style.container} onClick={props.onPress}>
      <div style={two_column_button_style.icon}> {props.left} </div>
      <div style={two_column_button_style.text}> {props.right} </div>
    </button>
  );
};
const AddMediaButton = (props) => {
  const [eventName, setEvent] = useState("");
  const [reviews, setPastReviews] = useState([]);
  const [reviewsSet, setReviewsSet] = useState(false);
  const [maxEventCount, setMaxEventCount] = useState(10);
  const [open, setOpen] = useState(false);
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [mediaFile, setFile] = useState(null);
  const [video, setVideo] = useState(null);
  const [videoFile, setVideoFile] = useState(null);
  const [uploaded, setUploaded] = useState(false);
  const artistID = props.artistID;
  const venueID = props.venueID;
  const [sizeError, setSizeError] = useState("");
  const [submitClick,setSubmitClicked] = useState(false)
  const handleClose = () => {
    setOpen(false);
    setImage(null);
    setVideo(null);
    setFile(null);
    setVideoFile(null);
  };

  const handleImageUpload = async (event) => {
    // console.log(event.target.files.length)
    if (!event.target.files.length) {
      return;
    }
    const file = event.target.files[0];
    setFile(file);
    const fileName = file.name;
    setImage(fileName);
    const image = document.getElementById("image");
    const imageurl = URL.createObjectURL(file);
    image.setAttribute("src", imageurl.toString());
  };

  const handleVideoUpload = async (event) => {
    console.log(event.target.files[0]);
    if (event.target.files[0]) {
      const videoSize = event.target.files[0].size;
      const maxSize = 10485760;
      if (videoSize > maxSize) {
        setSizeError(
          "This file size exceed 10MB. Please choose any other video."
        );
        const file = event.target.files[0];
        setVideoFile(file);
        const fileName = file.name;
        setVideo(fileName);
        const video = document.getElementById("video");
        const videourl = URL.createObjectURL(file);
        video.setAttribute("src", videourl+"#t=0.001");
        // video.addEventListener('onmouseover',()=>{video.play()})
        video.addEventListener("mouseenter", () => {
          video.play();
        });
        video.addEventListener("mouseleave", () => {
          video.pause();
        });
      } else {
        setSizeError("");
        const file = event.target.files[0];
        setVideoFile(file);
        const fileName = file.name;
        setVideo(fileName);
        const video = document.getElementById("video");
        const videourl = URL.createObjectURL(file);
        video.setAttribute("src", videourl+"#t=0.001");
        // video.addEventListener('onmouseover',()=>{video.play()})
        video.addEventListener("mouseenter", () => {
          video.play();
        });
        video.addEventListener("mouseleave", () => {
          video.pause();
        });
        // video.play();
      }
    }
  };
  const postBoth = async (mediaFile, videoFile) => {
    try {
      setSubmitClicked(true);
  
      const processFile = async (file, folder) => {
        const blob = new Blob([file], { type: file.type });
        const timestamp = Date.now();
        const fileName = `${artistID}-${timestamp}.${file.type.split("/")[1]}`;
        const { error } = await supabase.storage.from(folder).upload(fileName, blob);
        return { error, fileName };
      };
  
      const [mediaResult, videoResult] = await Promise.all([
        processFile(mediaFile, "user-images"),
        processFile(videoFile, "user-videos"),
      ]);
  
      if (mediaResult.error || videoResult.error) {
        console.error("Error occurred while uploading.");
        return;
      }
  
      const publicURLMedia = `https://zouczoaamusrlkkuoppu.supabase.co/storage/v1/object/public/user-images/${mediaResult.fileName}`;
      const publicURLVideo = `https://zouczoaamusrlkkuoppu.supabase.co/storage/v1/object/public/user-videos/${videoResult.fileName}`;
  
      if (props.isVenue) {
        await supabase.from("venue_carousel_images").insert([{ image_url: publicURLMedia, venue_id: venueID }]);
      } else {
        const [eventDate, event] = eventName.split(" • ");
        await supabase.from("artist_images").insert([
          {
            image_url: publicURLMedia,
            artist_id: artistID,
            event,
            eventDate,
            description,
            video_url: publicURLVideo,
          },
        ]);
      }
  
      console.log("Files uploaded successfully!");
      setSubmitClicked(false);
      alert("Files uploaded successfully!");
      window.location.reload();
    } catch (error) {
      console.error("An error occurred:", error.message);
    }
  };
  
//   const postBoth = async (mediaFile, videoFile) => {
//     // console.log(mediaFile,mediaFile.length);
//     // console.log(mediaFile.type,"media")
//     setSubmitClicked(true)
//     const blobMedia = new Blob([mediaFile], { type: mediaFile.type });
//     const timestampMedia = Date.now();
//     const fileNameMedia = `${artistID}-${timestampMedia}.${
//       mediaFile.type.split("/")[1]
//     }`;
//     const { errorMedia } = await supabase.storage
//       .from("user-images")
//       .upload(fileNameMedia, blobMedia);
//     // if (errorMedia) {
//     //     console.error(errorMedia);
//     //     return;
//     // }
//     // else{
//     //     console.log('Image uploaded successfully!');
//     //     alert('Image uploaded successfully!');
//     //     // uploaded = true
//     // }
//     const publicURLMedia =
//       "https://zouczoaamusrlkkuoppu.supabase.co/storage/v1/object/public/user-images/" +
//       fileNameMedia;

//     const blobVideo = new Blob([videoFile], { type: videoFile.type });
//     const timestampVideo = Date.now();
//     const fileNameVideo = `${artistID}-${timestampVideo}.${
//       videoFile.type.split("/")[1]
//     }`;
//     const { errorVedio } = await supabase.storage
//       .from("user-videos")
//       .upload(fileNameVideo, blobVideo);
//     if (errorVedio || errorMedia) {
//       console.error("Error occured while uploading");
//       return;
//     } else {
//       const publicURLVedio =
//         "https://zouczoaamusrlkkuoppu.supabase.co/storage/v1/object/public/user-videos/" +
//         fileNameVideo;
//       if (props.isVenue) {
//         const { data, insertError } = await supabase
//           .from("venue_carousel_images")
//           .insert([{ image_url: publicURLMedia, venue_id: venueID }]);
//       } else {
//         var eventDate = eventName.split(" • ")[0];
//         var event = eventName.split(" • ")[1];
//         const { data, insertError } = await supabase
//           .from("artist_images")
//           .insert([
//             {
//               image_url: publicURLMedia,
//               artist_id: artistID,
//               event: event,
//               eventDate: eventDate,
//               description: description,
//               video_url: publicURLVedio,
//             },
//           ]);
//       }
//       console.log("Files uploaded successfully!");
//       setSubmitClicked(false)
//       alert("Files uploaded successfully!");
//       // uploaded = true
//     }

//     window.location.reload();
//   };
  const post = async (mediaFile) => {
    // console.log(mediaFile,mediaFile.length);
    console.log(mediaFile.type, "media");
    setSubmitClicked(true)
    const blob = new Blob([mediaFile], { type: mediaFile.type });
    const timestamp = Date.now();
    const fileName = `${artistID}-${timestamp}.${mediaFile.type.split("/")[1]}`;
    var mediaFolder = mediaFile.type.includes("image") ? "user-images" : "user-videos";
    const { error } = await supabase.storage
      .from(mediaFolder)
      .upload(fileName, blob);
    var mediaUrl = mediaFile.type.includes("image") ? "image_url" : "video_url";
    if (error) {
      console.error(error);
      return;
    } else {
      console.log("File uploaded successfully!");
      setSubmitClicked(false)
      alert("File uploaded successfully!");
      // uploaded = true
    }
   
    const publicURL =
      `https://zouczoaamusrlkkuoppu.supabase.co/storage/v1/object/public/${mediaFolder}/${fileName}`;

    if (props.isVenue) {
      const { data, insertError } = await supabase
        .from("venue_carousel_images")
        .insert([{ [mediaUrl]: publicURL, venue_id: venueID }]);
    } else {
      var eventDate = eventName.split(" • ")[0];
      var event = eventName.split(" • ")[1];
      const { data, insertError } = await supabase
        .from("artist_images")
        .insert([
          {
            [mediaUrl]: publicURL,
            artist_id: artistID,
            event: event,
            eventDate: eventDate,
            description: description,
          },
        ]);
    }
    window.location.reload();
  };

  const postData = (event) => {
    if (mediaFile && videoFile) {
      postBoth(mediaFile, videoFile);
    } else if (mediaFile) {
      post(mediaFile);
    } else if (videoFile) {
      post(videoFile);
    }
  };

  const GetPastReviews = async () => {
    let artistName;
    const { data, error } = await supabase
      .from("artists")
      .select("name")
      .eq("artist_id", artistID)
      .single();

    if (error) {
      console.error(error);
      return null;
    }
    artistName = data.name;
    var adele = " ";
    var url = " ";
    try {
      if (artistName.includes("Adele")) {
        adele = "Adele";
        // url = `https://rest.bandsintown.com/artists/Adele/events?app_id=958313646c7db923871b501a616498a9&date=past`;
        url = `https://rest.bandsintown.com/artists/Adele/events?app_id=31273060cd25147d49a2f4ab5d6a2f34&date=past`;
      } else {
        var name = artistName.replace(" ", "%20");
        // url = `https://rest.bandsintown.com/artists/${name}/events?app_id=958313646c7db923871b501a616498a9&date=past`;
        url = `https://rest.bandsintown.com/artists/${name}/events?app_id=31273060cd25147d49a2f4ab5d6a2f34&date=past`;
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
        setEvent(
          `${eventList[0].datetime.split("T")[0]} • ${eventList[0].venue.name}`
        );
      }
    } catch (err) {
      console.log("API Error");
      console.log(err);
    }
  };

  const handleMediaButtonPress = () => {
    setSizeError("");
    setOpen(true);
  };

  const handleFormChange = (event) => {
    if (event.target.value == "extend") {
      setMaxEventCount(maxEventCount + 10);
    } else {
      setEvent(event.target.value);
    }
  };

  const handleDescription = (event) => {
    var word = event.target.value;
    word.replace(/\n\r?/g, "<br />");
    setDescription(word);
  };

  const handleClear = () => {
    setImage(null);
    setEvent("");
    setDescription("");
    // setVideo(null);
    const dropdown = document.getElementById("event-dropdown");
    dropdown.value = "";
  };

  useEffect(() => {
    GetPastReviews();
  }, [maxEventCount]);

  return (
    <>
      <Button
        onClick={handleMediaButtonPress}
        variant="contained"
        component="span"
        style={modal_styles.addMediaButton}
      >
        <div style={{ paddingRight: 5, color: "white" }}>
          <CameraAlt />
        </div>
        <div style={{ color: "white" }}>Add Media</div>
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modal_styles.container} >
          <div className="row  ">
            <div className="col-12 ">
              <h1 >Upload Media</h1>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
            }}
            className="row ">
            <div
              style={{
                // border: "1px solid grey",
                borderRadius: "5px",
                padding: "5px 0px",
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
              
                position: "relative",
              }}
              className=" col-6 "
            >
              <input
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                id="contained-button-file"
                onChange={handleImageUpload}
              />
              <label htmlFor="contained-button-file" style={{width:"97%"}}>
                <Button
                  variant="contained"
                  component="span"
                  style={{ ...modal_styles.addMediaButton, width: "100%" }}
                >
                  <div style={{ paddingRight: 5, color: "white" }}>
                    <CameraAlt />
                  </div>
                  <div style={{ color: "white" }}>Add Image</div>
                </Button>
                {/* <div></div>
                                <CameraAlt/> */}
              </label>

              <img
                id="image"
                style={{
                  width: "97%",
                  height: "20vh",
                  marginTop: "5px",
                  borderRadius: "5px",
                  objectFit: "cover",
                }}
              />

              {!mediaFile && (
                <div
                  style={{
                    position: "absolute",
                    width: "97%",
                    height: "20vh",
                    backgroundColor: "rgba(33,37,43,.3)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    top: "20%",
                    fontWeight: "bold",
                    borderRadius: "5px",
                    flexDirection: "column",
                  }}
                    id = "previewImg"
                >
                  <CameraAlt style={{ fontSize: "4rem", color: "grey" }} />
                  <div className="text-center" style={{ fontSize: "1.1rem" }} >No image selected</div>
                </div>
              )}

              {/* {image && <>{image}</>} */}
            </div>
            <div
              style={{
                // border: "1px solid grey",
                borderRadius: "5px",
                padding: "5px 0px",
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
                
                position: "relative",
              }}
              className="col-6 "
            >
              <input
                type="file"
                accept="video/mp4,video/mkv,video/x-m4v,video/quicktime,video/ogg"
                style={{ display: "none" }}
                id="contained-button-file1"
                onChange={handleVideoUpload}
              />
              <label htmlFor="contained-button-file1" style={{width:"97%"}}>
                <Button
                  variant="contained"
                  component="span"
                  style={{ ...modal_styles.addMediaButton, width: "100%"  }}
                >
                  <div style={{ paddingRight: 5, color: "white" }}>
                    <PlayArrowIcon />
                  </div>
                  <div style={{ color: "white" }}>Add Video</div>
                </Button>
              </label>
              {
                <video
                  style={{
                    width: "97%",
                    height: "20vh",
                    marginTop: "5px",
                    borderRadius: "5px",
                    objectFit: "cover",
                  }}
                  id="video"
                ></video>
              }
              {!videoFile && (
                <div
                  style={{
                    position: "absolute",
                    width: "97%",
                    height: "20vh",
                    backgroundColor: "rgba(33,37,43,.3)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    top: "20%",
                    fontWeight: "bold",
                    borderRadius: "5px",
                    flexDirection: "column",
                  }}
                  id = "previewImg"
                >
                 
                  <PlayArrowIcon style={{ fontSize: "4rem", color: "grey" }} />
                  <div className="text-center" style={{ fontSize: "1.1rem" }} >No video selected</div>
                 
                  
                 
                </div>
              )}

              {/* {video && <span>{video}</span>} */}
            </div>
          </div>
          <div style={{ color: "red", textAlign: "center" }}>{sizeError}</div>

          <div style={modal_styles.formItem}>
            {reviews.length > 0 && (
              <>
                <Form.Select
                  id="event-dropdown"
                  aria-label="Default select example"
                  required
                  onChange={handleFormChange}
                >
                  <option value="" selected>
                    Select an event
                  </option>
                  {reviews.map((review) => (
                    <option
                      value={`${review.datetime.split("T")[0]} • ${
                        review.venue.name
                      } `}
                    >
                      {review.datetime} • {review.venue.name}
                    </option>
                  ))}
                  {maxEventCount < 20 ? (
                    <option value="extend">Select an Older Event</option>
                  ) : (
                    <></>
                  )}
                </Form.Select>{" "}
              </>
            )}
          </div>
          {/* {uploaded && <span>Successfully uploaded</span>} */}
          <div style={modal_styles.formItem}>
            {
            submitClick && <div
                style={{
                  position: "absolute",
                  zIndex: "1",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                }}
              >
                <Spinner animation="border" variant="secondary" />{" "}
              </div>
            }

            <textarea
              class="form-control shadow-none"
              style={{ whiteSpace: "pre-wrap" }}
              rows="5"
              cols="100"
              id="description"
              maxLength={5000}
              onChange={handleDescription}
              value={description}
              placeholder="Enter a description..."
              required
            />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: 10,
              margin: 10,
            }}
          >
            {!sizeError && (
              <Button
                style={{ marginRight: "10" }}
                variant="contained"
                onClick={!sizeError && postData}
              >
                Submit
              </Button>
            )}
            {/* <Button variant="contained" onClick={handleClear}>
                            Clear
                        </Button> */}
          </div>
        </Box>
      </Modal>
    </>
  );
};

const HelpfulButton = (props) => {
  return (
    <div class="d-flex w-100 justify-content-start pb-1">
      <button
        onClick={props.onPress}
        style={{ backgroundColor: props.isHelpfulActive ? "" : "#e7e8e8" }}
        id="helpful-button"
        type="button"
        class="btn btn-outline-light align-self-center"
        disabled={!props.isUnhelpfulActive}
      >
        <div class="row">
          <div class="col-1">
            <img
              id="helpful-icon"
              src={
                props.isHelpfulActive
                  ? "../../images/helpful.png"
                  : "../../images/helpful_selected.png"
              }
              alt=""
            ></img>
          </div>
        </div>
      </button>
    </div>
  );
};

const UnhelpfulButton = (props) => {
  return (
    <div class="d-flex w-100 justify-content-start pb-1">
      <button
        onClick={props.onPress}
        style={{ backgroundColor: props.isUnhelpfulActive ? "" : "#e7e8e8" }}
        id="helpful-button"
        type="button"
        class="btn btn-outline-light align-self-center"
        disabled={!props.isHelpfulActive}
      >
        <div class="row">
          <div class="col-1">
            <img
              id="helpful-icon"
              src={
                props.isUnhelpfulActive
                  ? "../../images/unhelpful.png"
                  : "../../images/unhelpful_selected.png"
              }
              alt=""
            ></img>
          </div>
        </div>
      </button>
    </div>
  );
};
const ResponsiveButtonStyle = {
  button: {},
  div: {
    flexWrap: "nowrap",
    width: "fit-content",
    alignItems: "center",
    justifyContent: "center",
  },
  img: {
    width: "3rem",
    height: "auto",

    objectFit: "contain",
    flexGrow: 1,
  },
  text: {
    height: "100%",
    flexGrow: 2,
    fontSize: "0.9rem",
    width: "fit-content",
  },
};

export { TwoColumnButton, AddMediaButton, HelpfulButton, UnhelpfulButton };

TwoColumnButton.propTypes = {
  text: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  isActive: PropTypes.bool.isRequired,
};

AddMediaButton.propTypes = {
  onPress: PropTypes.func.isRequired,
};

HelpfulButton.propTypes = {
  onPress: PropTypes.func.isRequired,
  isActive: PropTypes.bool.isRequired,
};
