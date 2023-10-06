import React from "react";
import "../index.css";
import "react-multi-carousel/lib/styles.css"; 
import { Helmet } from "react-helmet";
import { Grid } from "@mui/material";

import Navigation from "../Navigation";
import BusinessSidebar from "../components/BusinessSidebar";
import SideContent from "../components/SideContent";
import Footer from "../components/Footer";


function AccountSettings() {
    //functions 

    return (
        <>
            <Helmet>
            </Helmet>
            <Grid container spacing={0}>
                <Grid item xs={12}>
                    <Navigation navbar={false}/>
                </Grid>
                <Grid item xs={12} md={3}>
                    <BusinessSidebar />
                </Grid>
                <Grid item xs={12} md={8}>
                    <SideContent name={"Links"} linkPairs={[["www.https://open.spotify.com/artist/06HL4z0CvFAxyc27GXpf02", "images/spotify_icon.png"], ["https://www.instagram.com/taylorswift/?hl=en", "images/instagram.png.webp"], ["https://twitter.com/taylorswift13?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor", "images/twitter.png"]]}/>
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