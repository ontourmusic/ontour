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
import EditableTextBox from '../components/EditableTextBox';


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
                    value={textLink1} //draw from database
                    label="Enter your Instagram link"
                    onChange={(e) => { 
                        setTextLink1(e.target.value); 
                        }} />
                    <TextField
                    value={textLink1} //draw from database
                    label="Enter your Twitter link"
                    onChange={(e) => { 
                        setTextLink1(e.target.value); 
                        }} />
                    <TextField
                    value={textLink1} //draw from database
                    label="Enter your Spotify link"
                    onChange={(e) => { 
                        setTextLink1(e.target.value); 
                        }} />
                    <TextField
                    value={textLink1} //draw from database
                    label="Enter your Website link"
                    onChange={(e) => { 
                        setTextLink1(e.target.value); 
                    }} />
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