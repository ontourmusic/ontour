import React, { useEffect, useState } from 'react';
import "../index.css";
import "react-multi-carousel/lib/styles.css"; 
import { Helmet } from "react-helmet";
import { useAuth0 } from "@auth0/auth0-react";
import { Grid, TextField, Button} from "@mui/material";

import Navigation from "../Navigation";
import BusinessSidebar from "../components/BusinessSidebar";
import SideContent from "../components/SideContent";
import Footer from "../components/Footer";
import ExternalLink from "../components/ExternalLink";
//import EditableTextBox from '../components/EditableTextBox';
import ResetPassword from '../components/ResetPassword';
import { createClient } from '@supabase/supabase-js';
import EditSettingsTable from '../components/EditSettingsTable';


function AccountSettings() {
    //functions 
    //let linkPairs = [["www.https://open.spotify.com/artist/06HL4z0CvFAxyc27GXpf02", "images/spotify_icon.png"], ["https://www.instagram.com/taylorswift/?hl=en", "images/instagram.png.webp"], ["https://twitter.com/taylorswift13?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor", "images/twitter.png"]];
    /**
     * {linkPairs && 
                <div>
                    {
                        linkPairs.map((pair) => {
                            return <ExternalLink mediaLink={pair[0]} iconLink={pair[1]} />
                        })
                    }
                        </div>}
     */
    const { isAuthenticated, user } = useAuth0();
    const [userEmail, setUserEmail] = useState("");

    useEffect(() => {
      if (isAuthenticated && user && user.email) {
          setUserEmail(user.email);
      }
    }, [user, isAuthenticated]);

    const [spotifyLink, setSpotifyLink] = useState("");
    const [instaLink, setInstaLink] = useState("");
    const [twitterLink, setTwitterLink] = useState("");
    const [websiteLink, setWebsiteLink] = useState("");

    const supabase = createClient('https://zouczoaamusrlkkuoppu.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpvdWN6b2FhbXVzcmxra3VvcHB1Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY3ODE1ODUyMSwiZXhwIjoxOTkzNzM0NTIxfQ.LTuL_u0tzmsj8Zf9m6JXN4JivwLq1aRXvU2YN-nDLCo');
    
    //hardcoding artist ID 
    //
    const getLinks = async () => {
        try {
            const getArtistSupabase = await supabase.from('business_user_data').select('*').eq('id', 20); 
            const artistData = getArtistSupabase["data"][0];
            setInstaLink(artistData["instagram_link"]);
            setTwitterLink(artistData["twitter_link"]);
            setSpotifyLink(artistData["spotify_link"]);
            setWebsiteLink(artistData["website_link"]);
            // console.log(instaLink);
            //console.log(artistData["instagram_link"]);
            //console.log('get link')
        }
        catch {
            console.log('Webpage error. Please reload the page.');
        }
    }

    //called when save changes is pressed
    const sendTwitterLink = async (twitterLink) => {
        try {
            const {data, error}  = await supabase.from('business_user_data').update({twitter_link: twitterLink}).eq('id', 20); //add mutable artist id 
            //const artistData = getArtistSupabase["data"][0];
            //take data from the 4 textboxes and insert into the 4 link data table columns
        }
        catch {
            console.log('Webpage error. Please reload the page.');
        }
    }

    const sendInstaLink = async (instagramLink) => {
        try {
            const {data, error}  = await supabase.from('business_user_data').update({instagram_link: instagramLink}).eq('id', 20); //add mutable artist id 
            //const artistData = getArtistSupabase["data"][0];
            //take data from the 4 textboxes and insert into the 4 link data table columns
        }
        catch {
            console.log('Webpage error. Please reload the page.');
        }
    }

    const sendWebsiteLink = async (websiteLink) => {
        try {
            const {data, error}  = await supabase.from('business_user_data').update({website_link: websiteLink}).eq('id', 2); //add mutable artist id 
            //const artistData = getArtistSupabase["data"][0];
            //take data from the 4 textboxes and insert into the 4 link data table columns
        }
        catch {
            console.log('Webpage error. Please reload the page.');
        }
    }

    const sendSpotifyLink = async (spotifyLink) => {
        try {
            const {data, error}  = await supabase.from('business_user_data').update({spotify_link: spotifyLink}).eq('id', 2); //add mutable artist id 
            //const artistData = getArtistSupabase["data"][0];
            //take data from the 4 textboxes and insert into the 4 link data table columns
        }
        catch {
            console.log('Webpage error. Please reload the page.');
        }
    }
    
    useEffect(() => {
        getLinks();
    }, []);

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
                    {/* <EditSettingsTable /> */}   
                    <Grid container spacing={4} direction="column" sx={{ padding: '10px' }}>
                        <Grid item xs={12} container>
                            <Grid item xs={9}>
                                <TextField 
                                fullWidth
                                label="Email"
                                variant="outlined" 
                                value={userEmail}
                                onChange={(e) => { 
                                    setUserEmail(e.target.value); 
                                }}
                                />
                            </Grid>
                        </Grid>
                
                        <Grid item xs={12} container>
                            <Grid item xs={6}>
                                <TextField 
                                fullWidth
                                label="Password" 
                                type="password" 
                                variant="outlined" 
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
                                />
                            </Grid>
                            <Grid item xs={3}>
                                <Button variant="text">Request Edit Access</Button>
                            </Grid>
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
                                    }} />
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
                                }} />
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
                                }} />
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
                                }} />
                            </Grid>
                        </Grid>

                        <Grid item xs={12}>
                            <Grid item xs={9}>
                                <Button variant="contained" color="primary">
                                    Save Changes
                                </Button>
                            </Grid>
                        </Grid>
                        
                    </Grid>
                </Grid>
                {/* <Grid container
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                rowSpacing={1} md={2}>
                    <TextField
                    id="instagram_link"
                    margin="normal" 
                    value={instaLink} //draw from database 
                    label="Enter your Instagram link"
                    onChange={(e) => { 
                        setInstaLink(e.target.value); 
                        //console.log(e.target.value);
                        }} />
                    <TextField
                        id="twitter_link"
                    margin="normal" 
                    value={twitterLink} //draw from database 
                    label="Enter your Twitter link"
                    onChange={(e) => { 
                        setTwitterLink(e.target.value); 
                        }} />
                    <TextField
                        margin="normal" 
                        id="spotify_link"
                    value={spotifyLink} //draw from database
                    label="Enter your Spotify link"
                    onChange={(e) => { 
                        setSpotifyLink(e.target.value); 
                        }} />
                    <TextField
                    margin="normal" 
                    id="website_link"
                    value={websiteLink} //draw from database
                    label="Enter your Website link"
                    onChange={(e) => { 
                        setWebsiteLink(e.target.value); 
                    }} />
                </Grid> */}
                
                <Grid item xs={12}>
                    <hr id="artist-footer"></hr>
                    <Footer />
                </Grid>
            </Grid >
        </>
    );
}
export default AccountSettings;