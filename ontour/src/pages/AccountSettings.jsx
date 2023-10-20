//import React from "react";
import React, { useState } from 'react';
import "../index.css";
import "react-multi-carousel/lib/styles.css"; 
import { Helmet } from "react-helmet";
import { Grid, TextField } from "@mui/material";

import Navigation from "../Navigation";
import BusinessSidebar from "../components/BusinessSidebar";
import SideContent from "../components/SideContent";
import Footer from "../components/Footer";
import ExternalLink from "../components/ExternalLink";
//import EditableTextBox from '../components/EditableTextBox';
import ResetPassword from '../components/ResetPassword';
import { createClient } from '@supabase/supabase-js';


function AccountSettings() {
    //functions 
    let linkPairs = [["www.https://open.spotify.com/artist/06HL4z0CvFAxyc27GXpf02", "images/spotify_icon.png"], ["https://www.instagram.com/taylorswift/?hl=en", "images/instagram.png.webp"], ["https://twitter.com/taylorswift13?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor", "images/twitter.png"]];
    const [textLink1, setTextLink1] = useState('');  // Initial text is empty 
    //textLink1 = "https://www.instagram.com/taylorswift/?hl=en";
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
    const [spotifyLink, setSpotifyLink] = useState("");
    const [instaLink, setInstaLink] = useState("");
    const [twitterLink, setTwitterLink] = useState("");

    const supabase = createClient('https://zouczoaamusrlkkuoppu.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpvdWN6b2FhbXVzcmxra3VvcHB1Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY3ODE1ODUyMSwiZXhwIjoxOTkzNzM0NTIxfQ.LTuL_u0tzmsj8Zf9m6JXN4JivwLq1aRXvU2YN-nDLCo');
    
    const getLinks = async () => {
        try {
            const getArtistSupabase = await supabase.from('artists').select('*').eq('artist_id', 20);
            const artistData = getArtistSupabase["data"][0];

        }
        catch {
            console.log('Webpage error. Please reload the page.');
        }
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
                <Grid container
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                rowSpacing={1} md={2}>
                    <TextField
                    margin="normal" 
                    value={textLink1} //draw from database 
                    label="Enter your Instagram link"
                    onChange={(e) => { 
                        setTextLink1(e.target.value); 
                        }} />
                    <TextField
                    margin="normal" 
                    value={textLink1} //draw from database 
                    label="Enter your Twitter link"
                    onChange={(e) => { 
                        setTextLink1(e.target.value); 
                        }} />
                    <TextField
                    margin="normal" 
                    value={textLink1} //draw from database
                    label="Enter your Spotify link"
                    onChange={(e) => { 
                        setTextLink1(e.target.value); 
                        }} />
                    <TextField
                    margin="normal" 
                    value={textLink1} //draw from database
                    label="Enter your Website link"
                    onChange={(e) => { 
                        setTextLink1(e.target.value); 
                    }} />
                </Grid>
                <Grid item xs={12} md={3}>
                    <ResetPassword />
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