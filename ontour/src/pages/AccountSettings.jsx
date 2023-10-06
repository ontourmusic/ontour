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

    return (
        <>
            <Helmet>
                <title>{fullName}</title>
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
                <Grid item xs={12}>
                    <ArtistNavigation />
                </Grid>
                <Grid item xs={12}>
                    <ArtistHeader images={imageArray} name={fullName} rating={aggregateRating} total={totalReviews} image={artistImage} isVenue={0} onTour={onTour} verified={false}/>
                </Grid>
                <Grid container spacing={1} style={artist_styles.grid.body_container}>
                    <Grid item xs={12} md={8}>
                        <ImageCarousel artistID={artistID} images={imageArray} 
                            slideCount={window.innerWidth < common_styles.window_breakpoints.sm ? 1 : 3} />
                        <ArtistContent 
                        allReviews={allReviews} 
                        filteredReviews={filteredReviews} 
                        aggregateRating={aggregateRating} 
                        onFormChange={formChange} 
                        onRatingChange={ratingFilter} 
                        onReviewSearch={searchReviews} 
                        searchResults={showResults} 
                        onClearSearch={clearSearch} 
                        reviewTable={"artist_reviews"}
                            />
                        {fullName !== "" && <WriteReview artistId={artistIdNumber} name={fullName} numReviews={totalReviews}/>}
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <SideContent name={fullName} linkPairs={[[spotifyLink, "images/spotify_icon.png"], [instaLink, "images/instagram.png.webp"], [twitterLink, "images/twitter.png"]]} />
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