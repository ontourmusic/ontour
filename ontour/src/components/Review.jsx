import React, { useEffect } from "react";
import PropTypes from "prop-types";
import '../index.css';
import { RiStarFill } from "react-icons/ri"
import { AiOutlineUser } from "react-icons/ai"
import { useState } from 'react';
import { HelpfulButton } from "./Buttons";
import { createClient } from '@supabase/supabase-js'
import { UnhelpfulButton } from "./Buttons";
import artist_styles from "../Styles/artist_styles";
import { useAuth0 } from "@auth0/auth0-react";
import { TextField, Button } from "@mui/material";

const review_styles = artist_styles.review_display.review;

export default function Review(props) {
    const { user, isAuthenticated, isLoading } = useAuth0();
    const [userEmail, setUserEmail] = useState("");
    const [username, setUsername] = useState("");
    const [currArtistID, setArtistID] = useState("");
    const [isHelpfulActive, setIsHelpfulActive] = useState(isAuthenticated && !props.likedUsers.includes(user.username));
    const [isUnhelpfulActive, setIsUnhelpfulActive] = useState(isAuthenticated && !props.dislikedUsers.includes(user.username));
    const [count, setCount] = useState(props.count);
    const [isRespondMode, setIsRespondMode] = useState(false);
    const [newResponse, setNewResponse] = useState("");
    const reviewTable = props.reviewTable;
    //maybe set props to pass the artist ID or the permissions
    const supabase = createClient('https://zouczoaamusrlkkuoppu.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpvdWN6b2FhbXVzcmxra3VvcHB1Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY3ODE1ODUyMSwiZXhwIjoxOTkzNzM0NTIxfQ.LTuL_u0tzmsj8Zf9m6JXN4JivwLq1aRXvU2YN-nDLCo');


    const handleHelpful = event => {

        event.currentTarget.classList.toggle('fw-bold');
        event.currentTarget.classList.toggle('btn-outline-light');
        setIsHelpfulActive(current => !current);
        if(isHelpfulActive) {
            setCount(count + 1);
            addLikedUser(user.username);
            postData(count + 1);
        }
        else {
            setCount(count - 1);
            removeLikedUser(user.username);
            postData(count - 1);
        }
    };

    const handleUnHelpful = event => {
        event.currentTarget.classList.toggle('fw-bold');
        event.currentTarget.classList.toggle('btn-outline-light');
        setIsUnhelpfulActive(current => !current);
        if(isUnhelpfulActive) {
            setCount(count - 1);
            addUnlikedUser(user.username);
            postData(count - 1);
        }
        else {
            setCount(count + 1);
            removedUnlikedUser(user.username);
            postData(count + 1);
        }
    }

    const addLikedUser = async (user) => {
        const {data, error} = await supabase
            .from(reviewTable)
            .update({ likedUsers: [...props.likedUsers, user] })
            .eq('id', props.id)
    }

    const removeLikedUser = async (user) => {
        const {data, error} = await supabase
            .from(reviewTable)
            .update({ likedUsers: props.likedUsers.filter(u => u != user) })
            .eq('id', props.id)
    }

    const addUnlikedUser = async (user) => {
        const {data, error} = await supabase
            .from(reviewTable)
            .update({ dislikedUsers: [...props.dislikedUsers, user] })
            .eq('id', props.id)
    }

    const removedUnlikedUser = async (user) => {
        const {data, error} = await supabase
            .from(reviewTable)
            .update({ dislikedUsers: props.dislikedUsers.filter(u => u != user) })
            .eq('id', props.id)
    }

    const postData = async (currCount) => {
        const { data, error } = await supabase
            .from(reviewTable)
            .update({ likeCount: currCount })
            .eq('id', props.id);
    }

    const checkEditPermissions = async () => {
        const getArtistSupabase = await supabase.from(reviewTable).select('*').eq('id', props.id); 
        const artistData = getArtistSupabase["data"][0];
       //console.log("checked permissions");
        if (artistData["artist_id"] == currArtistID) {
            setIsRespondMode(true);
            return true;
        }
        else {
            setIsRespondMode(false);
            return false;
        }
    };
    
    const sendNewReponse = async (newResponse) => {
        try {
            const {data, error}  = await supabase.from(reviewTable).update({artist_response: newResponse}).eq('id', props.id); //add mutable artist id 
        }
        catch {
            console.log('Webpage error. Please reload the page.');
        }
    }

      useEffect(() => {
        if (isAuthenticated && user && user.email) {
            setUserEmail(user.email);
                if (user['https://tourscout.com/user_metadata'] && user['https://tourscout.com/app_metadata'].username && user['https://tourscout.com/user_metadata'].artist_id) {
                    setUsername(user['https://tourscout.com/user_metadata'].username);
                    setArtistID(user['https://tourscout.com/user_metadata'].artist_id);
                    setNewResponse(props.response);
                    checkEditPermissions();
                }
        }
      }, [user, isAuthenticated, currArtistID]);
    

    return (
        <div style={review_styles.item}>
            <div class="d-flex bd-highlight">
                <div class="p-1 bd-highlight"><AiOutlineUser size={23} /> </div>
                <div class="p-1 bd-highlight"><h6 class="review-user">{props.user}</h6></div>
                <br></br>
            </div>
            <div>
                <div class="d-flex bd-highlight mb-2">
                    {[...Array(props.rating)].map(star => {
                        return (
                            <RiStarFill
                                className="star"
                                color={"#faaf00"}
                                size={20}
                            />
                        );
                    })}
                    {[...Array(5 - props.rating)].map(star => {
                        return (
                            <RiStarFill
                                className="star"
                                color={"#bdbdbd"}
                                size={20}
                            />
                        );
                    })}
                </div>
                <div align="left" class="d-flex bd-highlight mb-2">
                    <small>{props.date} • {props.venue}</small>
                </div>
            </div>
            <div class="d-flex w-100 justify-content-start">
                <p id="rating-text" style={{ whiteSpace: "pre-wrap" }} class="mb-2" align="left">{props.text}</p>
            </div>
            { isRespondMode ?     <>       
            <div class="d-flex w-100 justify-content-start">
                <TextField 
                    id="review-response-text"
                    label="Artist Response" 
                    variant="outlined" 
                    fullWidth
                    multiline
                    value={newResponse}
                    onChange={(e) => { setNewResponse(e.target.value); }} 
                    sx={{
                        '& .MuiOutlinedInput-root': {
                            '&.Mui-focused fieldset': {
                                borderColor: 'black', // use the color you want
                            },
                        },
                        '& .MuiInputLabel-outlined.Mui-focused': {
                            color: 'gray', 
                        },
                        width: '100%', // This will make the TextField full width within its parent container
                        my: 1, // This adds margin on the top and bottom
                        mx: 2, // This adds margin on the left and right
                        '.MuiInputBase-input': {
                            p: '10px', // This adds padding within the input area of the TextField
                        }
                    }}
                    align="left"/>
                    <Button 
                        id="publishbutton" 
                        variant="contained" 
                        color="primary" 
                        onClick={() => {sendNewReponse(newResponse);}}
                        sx={{
                            whiteSpace: 'nowrap', // Prevents the button text from wrapping
                            py: 2, // Adjust padding top and bottom as needed
                            px: 3, // Adjust padding left and right as needed
                            alignSelf: 'center', // Center the button vertically with respect to the TextField
                        }}>
                        Publish Response
                    </Button>
                </div> 
                </>  
                 : (
                <>  
                    <div>
                    {props.response && (
                        <div>
                        <p className="response-title">Response from the Artist:</p> {/* Updated class name */}
                        <p className="artist-response">{props.response}</p> {/* Updated class name */}
                        </div>
                    )}
                    </div>
                </>
                )}
                {/* // : <>  
                // <div > {(props.response) ? <div> <p id="responseTitle">{"Response from the Artist:"}</p> <p id="textbox" class="mb-2" align="left">{props.response}</p></div> : <p></p>}</div></> } */}
            
            { isAuthenticated ? 
                <>
                <div className = "d-flex justify-content-start" >
                    <div className="mr-3">
                        <HelpfulButton onPress={handleHelpful} isHelpfulActive={isHelpfulActive} isUnhelpfulActive={isUnhelpfulActive} />
                    </div>
                    <span className="count" style={{margin:"10px"}}>{count}</span>
                    <div>
                        <UnhelpfulButton onPress={handleUnHelpful} isUnhelpfulActive={isUnhelpfulActive} isHelpfulActive={isHelpfulActive}/>
                    </div>
                </div>
                </>
                : <> </> }
        </div>
    )
}

Review.propTypes = {
    user: PropTypes.string,
    rating: PropTypes.number,
    date: PropTypes.string,
    venue: PropTypes.string,
    text: PropTypes.string, 
    response: PropTypes.string
};