import React from "react";
import PropTypes from "prop-types";
import '../index.css';
import Button from '@mui/material/Button';
import { useState, useEffect } from "react";
import Modal from '@mui/material/Modal';
import { CameraAlt } from "@mui/icons-material";
import { Box } from "@mui/material";
import button_style from "../Styles/button_styles";
import { createClient } from '@supabase/supabase-js'
import artist_styles from "../Styles/artist_styles";
import Form from 'react-bootstrap/Form';

const two_column_button_style = button_style.two_column_button;
const supabase = createClient('https://zouczoaamusrlkkuoppu.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpvdWN6b2FhbXVzcmxra3VvcHB1Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY3ODE1ODUyMSwiZXhwIjoxOTkzNzM0NTIxfQ.LTuL_u0tzmsj8Zf9m6JXN4JivwLq1aRXvU2YN-nDLCo');
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
    const artistID = props.artistID;
    const venueID = props.venueID;

    const handleClose = () => {
        setOpen(false); 
        setImage(null);
    }

    const handleImageUpload = async (event) => {
        const file = event.target.files[0];
        setFile(file);
        const fileName = file.name;
        setImage(fileName);
    };

    const postData = async (event) => {
        const blob = new Blob([mediaFile], { type: mediaFile.type });
        const timestamp = Date.now();
        const fileName = `${artistID}-${timestamp}.${mediaFile.type.split('/')[1]}`;
        const { error } = await supabase.storage.from('user-images').upload(fileName, blob);
        if (error) {
            console.error(error);
            return;
        } else {
            console.log('File uploaded successfully!');
            alert('File uploaded successfully!');
        }
        const publicURL = "https://zouczoaamusrlkkuoppu.supabase.co/storage/v1/object/public/user-images/" + fileName;
        if(props.isVenue){
            const { data, insertError } = await supabase
            .from('venue_carousel_images')
            .insert(
            [{'image_url':publicURL, 'venue_id': venueID}]
            );
        }
        else if(props.isPromo) {
            const { data, insertError } = await supabase
            .from('promo_images')
            .insert(
            [{'image_url':publicURL, 'artist_id': artistID}]
            );
        }
        else{
            var eventDate = eventName.split(" • ")[0];
            var event = eventName.split(" • ")[1];
            const { data, insertError } = await supabase
            .from('artist_images')
            .insert(
            [{'image_url':publicURL, 'artist_id': artistID, 'event': event, 'eventDate': eventDate, 'description': description}]
            );
        }
        window.location.reload();
    }

    const GetPastReviews = async () => {
        let artistName;
        const { data, error } = await supabase
            .from('artists')
            .select('name')
            .eq('artist_id', artistID)
            .single()

            if (error) {
                console.error(error)
                return null
            }
            artistName = data.name;
        var adele = " ";
        var url = " ";
        try {
          if (artistName.includes("Adele")) {
            adele = "Adele";
            // url = `https://rest.bandsintown.com/artists/Adele/events?app_id=958313646c7db923871b501a616498a9&date=past`;
            url = `https://rest.bandsintown.com/artists/Adele/events?app_id=31273060cd25147d49a2f4ab5d6a2f34&date=past`;
          }
          else {
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
            setEvent(`${eventList[0].datetime.split("T")[0]} • ${eventList[0].venue.name}`);
          }
        }
        catch (err) {
          console.log('API Error');
          console.log(err);
        }
    }

    const handleMediaButtonPress = () => {
        setOpen(true);
    }

    const handleFormChange = (event) => {
        if(event.target.value == "extend"){
          setMaxEventCount(maxEventCount+10);
        }
        else{
          setEvent(event.target.value);
        }
    }

    const handleDescription = event => {
        var word = event.target.value;
        word.replace(/\n\r?/g, '<br />');
        setDescription(word);
    }

    const handleClear = () => {
        setImage(null);
        setEvent("");
        setDescription("");
        const dropdown = document.getElementById("event-dropdown");
        dropdown.value = "";
    }

    useEffect(() => {
        GetPastReviews();
      }, [maxEventCount]);

    return (
        <>
            <Button onClick={handleMediaButtonPress} variant="contained" component="span" style={modal_styles.addMediaButton}>
                <div style={{paddingRight: 5, color:'white'}}><CameraAlt /></div>
                <div style={{color:'white'}}>Add Media</div>
            </Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description">
                <Box sx={modal_styles.container}>
                    <h1 style={{textAlign: "center"}}>Upload Media</h1>
                    <div style={modal_styles.formItem}>
                        <input
                            type="file"
                            accept="image/*"
                            style={{ display: 'none' }}
                            id="contained-button-file"
                            onChange={handleImageUpload} />
                        <label htmlFor="contained-button-file">
                            <Button variant="contained" component="span" style={modal_styles.addMediaButton}>
                                <div style={{paddingRight: 5, color:'white'}}><CameraAlt /></div>
                                <div style={{color:'white'}}>Add Image</div>
                            </Button>
                        </label>
                    </div>
                    <div style={modal_styles.formItem}>
                        {image && <div>{image}</div>}
                    </div>
                    <div style={modal_styles.formItem}>
                        {reviews.length > 0 &&
                        <>
                            <Form.Select id="event-dropdown" aria-label="Default select example" required onChange={handleFormChange}>
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
                    <div style={modal_styles.formItem}>
                        <textarea
                        class="form-control shadow-none"
                        style={{ whiteSpace: "pre-wrap" }}
                        rows="5" cols="100"
                        id="description"
                        maxLength={5000}
                        onChange={handleDescription}
                        value={description}
                        placeholder="Enter a description..." required
                        />
                    </div>
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            gap: 10,
                            margin: 10
                        }}
                        >
                        <Button style={{marginRight: "10"}} variant="contained" onClick={postData}>
                            Submit
                        </Button>
                        <Button variant="contained" onClick={handleClear}>
                            Clear
                        </Button>
                    </div>
                </Box>
            </Modal>
        </>
    )
};


const AddMerchButton = (props) => {
    const [open, setOpen] = useState(false);
    const [image, setImage] = useState(null);
    const [storeLink, setStoreLink] = useState("");
    const [price, setPrice] = useState(null);
    const [mediaFile, setFile] = useState(null);
    const artistID = props.artistID;
    const venueID = props.venueID;

    const handleClose = () => {
        setOpen(false); 
        setImage(null);
    }

    const handleImageUpload = async (event) => {
        const file = event.target.files[0];
        setFile(file);
        const fileName = file.name;
        setImage(fileName);
    };

    const handleStoreLink = event => {
        var word = event.target.value;
        word.replace(/\n\r?/g, '<br />');
        setStoreLink(word);
        console.log(storeLink);
    }

    const handlePrice = event => {
        var num = parseFloat(event.target.value);
        var amount = (Math.round(num * 100) / 100).toFixed(2);
        setPrice(amount);
        console.log(price);
    }

    const postData = async (event) => {
        const blob = new Blob([mediaFile], { type: mediaFile.type });
        const timestamp = Date.now();
        const fileName = `${artistID}-${timestamp}.${mediaFile.type.split('/')[1]}`;
        const { error } = await supabase.storage.from('user-images').upload(fileName, blob);
        if (error) {
            console.error(error);
            return;
        } else {
            console.log('File uploaded successfully!');
            alert('File uploaded successfully!');
        }
        const publicURL = "https://zouczoaamusrlkkuoppu.supabase.co/storage/v1/object/public/user-images/" + fileName;
        const { data, insertError } = await supabase
        .from('merch_images')
        .insert(
        [{'artist_id':artistID ,'image_url':publicURL, 'price': price, 'store_link': storeLink}]
        );
        window.location.reload();
    }

    const handleMerchButtonPress = () => {
        setOpen(true);
    }

    const handleClear = () => {
        setImage(null);
        setStoreLink("");
        setPrice(0);
        // const dropdown = document.getElementById("event-dropdown");
        // dropdown.value = "";
    }

    return (
        <>
            <Button onClick={handleMerchButtonPress} variant="contained" component="span" style={modal_styles.addMerchButton}>
                <div style={{paddingRight: 5, color:'white'}}><CameraAlt /></div>
                <div style={{color:'white'}}>Add Merch</div>
            </Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description">
                <Box sx={modal_styles.container}>
                    <h1 style={{textAlign: "center"}}>Upload Merch</h1>
                    <div style={modal_styles.formItem}>
                        <input
                            type="file"
                            accept="image/*"
                            style={{ display: 'none' }}
                            id="contained-button-file"
                            onChange={handleImageUpload} />
                        <label htmlFor="contained-button-file">
                            <Button variant="contained" component="span" style={modal_styles.addMerchButton}>
                                <div style={{paddingRight: 5, color:'white'}}><CameraAlt /></div>
                                <div style={{color:'white'}}>Add Image</div>
                            </Button>
                        </label>
                    </div>
                    <div style={modal_styles.formItem}>
                        {image && <div>{image}</div>}
                    </div>
                    <div style={modal_styles.formItem}>
                        <textarea
                        class="form-control shadow-none"
                        style={{ whiteSpace: "pre-wrap" }}
                        rows="1" cols="8"
                        id="store_link"
                        onChange={handleStoreLink}
                        value={storeLink}
                        maxLength={5000}
                        placeholder="Enter the store link to item..." required
                        />
                    </div>
                    <div style={modal_styles.formItem}>
                        <input
                        class="form-control shadow-none"
                        style={{ whiteSpace: "pre-wrap" , width:200}}
                        type="number"
                        min="0.01"
                        step="0.01"
                        id="price"
                        onChange={handlePrice}
                        value={price}
                        maxLength={5000}
                        placeholder="Price" required
                        />
                    </div>
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            gap: 10,
                            margin: 10
                        }}
                        >
                        <Button style={{marginRight: "10"}} variant="contained" onClick={postData}>
                            Submit
                        </Button>
                        <Button variant="contained" onClick={handleClear}>
                            Clear
                        </Button>
                    </div>
                </Box>
            </Modal>
        </>
    )
};


const HelpfulButton = (props) => {
    return (
        <div class="d-flex w-100 justify-content-start pb-1">
            <button 
                onClick={props.onPress} 
                style={{ backgroundColor: props.isHelpfulActive ? '' : '#e7e8e8' }} 
                id="helpful-button" 
                type="button" 
                class="btn btn-outline-light align-self-center"
                disabled={!props.isUnhelpfulActive}
                >
                <div class="row">
                    <div class="col-1">
                        <img id="helpful-icon" src={props.isHelpfulActive ? "../../images/helpful.png" : "../../images/helpful_selected.png"} alt=""></img>
                    </div>
                </div>
            </button>
        </div>
    )
}

const UnhelpfulButton = (props) => {
    return (
        <div class="d-flex w-100 justify-content-start pb-1">
            <button 
            onClick={props.onPress} 
            style={{ backgroundColor: props.isUnhelpfulActive ? '' : '#e7e8e8' }} 
            id="helpful-button" 
            type="button" 
            class="btn btn-outline-light align-self-center"
            disabled={!props.isHelpfulActive}
            >
                <div class="row">
                    <div class="col-1">
                        <img id="helpful-icon" src={props.isUnhelpfulActive ? "../../images/unhelpful.png" : "../../images/unhelpful_selected.png"} alt=""></img>
                    </div>
                </div>
            </button>
        </div>
    )
}


const ResponsiveButtonStyle = {
    button: {
    },
    div: {
        flexWrap: "nowrap",
        width: "fit-content",
        alignItems: "center",
        justifyContent: "center"
    },
    img: {
        width: "3rem",
        height: "auto",

        objectFit: "contain",
        flexGrow: 1
    },
    text: {
        height: "100%",
        flexGrow: 2,
        fontSize: "0.9rem",
        width: "fit-content"
    },
};

export { TwoColumnButton, AddMediaButton, AddMerchButton, HelpfulButton, UnhelpfulButton };

TwoColumnButton.propTypes = {
    text: PropTypes.string.isRequired,
    img: PropTypes.string.isRequired,
    onPress: PropTypes.func.isRequired,
    isActive: PropTypes.bool.isRequired
};

AddMediaButton.propTypes = {
    onPress: PropTypes.func.isRequired,
    isPromo: PropTypes.bool,
};

HelpfulButton.propTypes = {
    onPress: PropTypes.func.isRequired,
    isActive: PropTypes.bool.isRequired
};

