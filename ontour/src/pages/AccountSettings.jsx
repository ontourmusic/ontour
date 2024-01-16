import React, { useEffect, useState } from 'react';
import "../index.css";
import "react-multi-carousel/lib/styles.css"; 
import { Helmet } from "react-helmet";
import { useAuth0 } from "@auth0/auth0-react";
import { Grid, TextField, Button} from "@mui/material";
import Navigation from "../Navigation";
import BusinessSidebar from "../components/BusinessSidebar";
import Footer from "../components/Footer";
import ResetPassword from '../components/ResetPassword';
import { createClient } from '@supabase/supabase-js';

function AccountSettings() {
    const { isAuthenticated, user } = useAuth0();
    const [userEmail, setUserEmail] = useState("");
    const [username, setUsername] = useState("");
    const [buttonText, setButtonText] = useState('Save Changes');
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [officialProfileName, setOfficialProfileName] = useState("");
    const [currArtistID, setArtistID] = useState("");

    useEffect(() => {
        if (isAuthenticated && user && user.email) {
            setUserEmail(user.email);
                if (user['https://tourscout.com/user_metadata'] && user['https://tourscout.com/app_metadata'].username && user['https://tourscout.com/user_metadata'].artist_id) {
                    setUsername(user['https://tourscout.com/user_metadata'].username);
                    setOfficialProfileName(user['https://tourscout.com/app_metadata'].username);
                    setArtistID(user['https://tourscout.com/user_metadata'].artist_id);
                    getLinks();
                }
        }
        console.log(user);
    }, [user, isAuthenticated, currArtistID]);

    const [spotifyLink, setSpotifyLink] = useState("");
    const [instaLink, setInstaLink] = useState("");
    const [twitterLink, setTwitterLink] = useState("");
    const [websiteLink, setWebsiteLink] = useState("");

    const supabase = createClient('https://zouczoaamusrlkkuoppu.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpvdWN6b2FhbXVzcmxra3VvcHB1Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY3ODE1ODUyMSwiZXhwIjoxOTkzNzM0NTIxfQ.LTuL_u0tzmsj8Zf9m6JXN4JivwLq1aRXvU2YN-nDLCo');
    
    // Artist ID is hardcoded through Auth0
    const getLinks = async () => {
        try {
            const getArtistSupabase = await supabase.from('artists').select('*').eq('artist_id', currArtistID); 
            const artistData = getArtistSupabase["data"][0];
            setInstaLink(artistData["instagram_link"]);
            setTwitterLink(artistData["twitter_link"]);
            setSpotifyLink(artistData["spotify_link"]);
            setWebsiteLink(artistData["website_link"]);
        }
        catch {
            console.log('Webpage error. Please reload the page.');
        }
    }

    //called when save changes is pressed
    const sendTwitterLink = async (twitterLink) => {
        try {
            const {data, error}  = await supabase.from('artists').update({twitter_link: twitterLink}).eq('artist_id', currArtistID); //add mutable artist id 
        }
        catch {
            console.log('Webpage error. Please reload the page.');
        }
    }

    const sendInstaLink = async (instagramLink) => {
        try {
            const {data, error}  = await supabase.from('artists').update({instagram_link: instagramLink}).eq('artist_id', currArtistID); //add mutable artist id 
        }
        catch {
            console.log('Webpage error. Please reload the page.');
        }
    }

    const sendWebsiteLink = async (websiteLink) => {
        try {
            const {data, error}  = await supabase.from('artists').update({website_link: websiteLink}).eq('artist_id', currArtistID); //add mutable artist id 
        }
        catch {
            console.log('Webpage error. Please reload the page.');
        }
    }

    const sendSpotifyLink = async (spotifyLink) => {
        try {
            const { data, error } = await supabase.from('artists').update({ spotify_link: spotifyLink }).eq('artist_id', currArtistID); //add mutable artist id 
        }
        catch {
            console.log('Webpage error. Please reload the page.');
        }
    }

    const sendLinks = async () => {
        console.log("sent");
        sendInstaLink(instaLink);
        sendTwitterLink(twitterLink);
        sendWebsiteLink(websiteLink);
        sendSpotifyLink(spotifyLink);
        setButtonDisabled(true);
        setButtonText('Changes Saved');
    }
    
    return (
        <>
            <Helmet>
            </Helmet>
            <Grid container spacing={1}>
                <Grid item xs={12}>
                    <Navigation navbar={false}/>
                </Grid>
                <Grid item xs={12} md={3}>
                    <BusinessSidebar />
                </Grid>
                <Grid item xs={12} md={9}> 
                    <Grid container spacing={4} direction="column" sx={{ padding: '10px' }}>
                        <Grid item xs={12} container>
                            <Grid item xs={6}>
                                <TextField 
                                fullWidth
                                label="Email"
                                variant="outlined" 
                                value={userEmail}
                                disabled
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                      '&.Mui-focused fieldset': {
                                        borderColor: 'black', // use the color you want
                                      },
                                    },
                                    '& .MuiInputLabel-outlined.Mui-focused': {
                                        color: 'gray', 
                                    },
                                }}
                                
                                />
                            </Grid>
                            <Grid item xs={3}>
                                <ResetPassword></ResetPassword>
                            </Grid>
                        </Grid>
                
                        <Grid item xs={12} container alignItems="center">
                            <Grid item xs={9}>
                                <TextField 
                                fullWidth
                                label="Official Profile Name" 
                                variant="outlined" 
                                value={officialProfileName}
                                disabled
                                // onChange={(e) => { 
                                //     setOfficialProfileName(e.target.value); 
                                // }}
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                      '&.Mui-focused fieldset': {
                                        borderColor: 'black', // use the color you want
                                      },
                                    },
                                    '& .MuiInputLabel-outlined.Mui-focused': {
                                        color: 'gray', 
                                    },
                                }}
                                />
                            </Grid>
                            {/* <Grid item xs={3}>
                                <Button variant="text">Request Edit Access</Button>
                            </Grid> */}
                        </Grid>

                        <Grid item xs={12}>
                            <Grid item xs={9}>
                                <TextField
                                    fullWidth
                                    id="instagram_link"
                                    margin="normal"
                                    value={instaLink}
                                    label="Enter your Instagram link"
                                    onChange={(e) => {
                                        setInstaLink(e.target.value);
                                    }} 
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                          '&.Mui-focused fieldset': {
                                            borderColor: 'black', // use the color you want
                                          },
                                        },
                                        '& .MuiInputLabel-outlined.Mui-focused': {
                                            color: 'gray', 
                                        },
                                    }}/>
                            </Grid>
                        </Grid>

                        <Grid item xs={12}>
                            <Grid item xs={9}>
                                <TextField
                                fullWidth
                                id="twitter_link"
                                margin="normal"
                                value={twitterLink}
                                label="Enter your Twitter link"
                                onChange={(e) => {
                                    setTwitterLink(e.target.value);
                                }} 
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                      '&.Mui-focused fieldset': {
                                        borderColor: 'black', // use the color you want
                                      },
                                    },
                                    '& .MuiInputLabel-outlined.Mui-focused': {
                                        color: 'gray', 
                                    },
                                }}/>
                            </Grid>
                        </Grid>

                        <Grid item xs={12}>
                            <Grid item xs={9}>
                                <TextField
                                fullWidth
                                id="spotify_link"
                                margin="normal"
                                value={spotifyLink}
                                label="Enter your Spotify link"
                                onChange={(e) => {
                                    setSpotifyLink(e.target.value);
                                }} 
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                      '&.Mui-focused fieldset': {
                                        borderColor: 'black', // use the color you want
                                      },
                                    },
                                    '& .MuiInputLabel-outlined.Mui-focused': {
                                        color: 'gray', 
                                    },
                                }}/>
                            </Grid>
                        </Grid>

                        <Grid item xs={12}>
                            <Grid item xs={9}>
                                <TextField
                                fullWidth
                                id="website_link"
                                margin="normal"
                                value={websiteLink}
                                label="Enter your Website link"
                                onChange={(e) => {
                                    setWebsiteLink(e.target.value);
                                }} 
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                      '&.Mui-focused fieldset': {
                                        borderColor: 'black', // use the color you want
                                      },
                                    },
                                    '& .MuiInputLabel-outlined.Mui-focused': {
                                        color: 'gray', 
                                    },
                                }}/>
                            </Grid>
                        </Grid>

                        <Grid item xs={12}>
                            <Grid item xs={9}>
                                <Button disabled={buttonDisabled} id="savebutton" variant="contained" color="primary" onClick={() => {sendLinks();}}>
                                    {buttonText}
                                </Button>
                            </Grid>
                        </Grid>
                        
                    </Grid>
                </Grid>
                
                <Grid item xs={12}>
                    <hr id="artist-footer"></hr>
                    <Footer />
                </Grid>
            </Grid >
        </>
    );
}
export default AccountSettings;