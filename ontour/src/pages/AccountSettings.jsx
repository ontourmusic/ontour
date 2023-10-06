import React from "react";
import "../index.css";
import "react-multi-carousel/lib/styles.css"; 
import { Helmet } from "react-helmet";
import { Grid } from "@mui/material";

import Navigation from "../Navigation";
import BusinessSidebar from "../components/BusinessSidebar"
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
                <Grid item xs={12} md={4}>
                    <BusinessSidebar />
                </Grid>
                <Grid item xs={12} md={8}>
                    
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