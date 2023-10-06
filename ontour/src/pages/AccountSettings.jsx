import React from "react";
import "../index.css";
import "react-multi-carousel/lib/styles.css";
import ArtistHeader from "../components/ArtistHeader";
import WriteReview from "../components/WriteReview";
import Footer from "../components/Footer";
import { Helmet } from "react-helmet";

import { useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import ArtistNavigation from "../ArtistNavigation"

import artist_styles from "../Styles/artist_styles";

import { createClient } from '@supabase/supabase-js'
import common_styles from "../Styles/common_styles";
import Fuse from 'fuse.js'


// Testing
import { Grid } from "@mui/material";
import SideContent from "../components/SideContent";
import ArtistContent from "../components/ArtistContent";
import ImageCarousel from "../components/ImageCarousel"; 

function AccountSettings() {
    //functions 



    return (
        <>
            <Helmet>
                <title>Account Settings</title>
                <script async src='https://www.googletagmanager.com/gtag/js?id=G-BE8WDNBGS7'></script>
                <script>
                    {`
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', G-BE8WDNBGS7);
                    `}
                </script>
                <script async src="https://www.google-analytics.com/analytics.js" />
                <script>
                    {`
                    window.ga=window.ga||function()
                    {(ga.q = ga.q || []).push(arguments)}
                    ;ga.l=+new Date; ga('create',
                    G-BE8WDNBGS7, 'auto'); ga('send',
                    'pageview');
                    `}
                </script>
            </Helmet>
            <Grid container spacing={0}>
                <Grid container spacing={1} style={artist_styles.grid.body_container}>
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