import React from "react";
import "../index.css";
import "react-multi-carousel/lib/styles.css";
import mixpanel from "mixpanel-browser";
import ArtistHeader from "../components/ArtistHeader";
import WriteReview from "../components/WriteReview";
import Footer from "../components/Footer";
import { Helmet } from "react-helmet";
import {supabase} from "../components/supabaseClient"
import { useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import ArtistNavigation from "../ArtistNavigation"

import artist_styles from "../Styles/artist_styles";

import { createClient } from '@supabase/supabase-js';
import common_styles from "../Styles/common_styles";
import Fuse from 'fuse.js'


// Testing
import { Grid } from "@mui/material";
import SideContent from "../components/SideContent";
import ArtistContent from "../components/ArtistContent";
import ImageCarousel from "../components/ImageCarousel";
import MerchCarousel from "../components/MerchCarousel";

function Artist() {
    const [searchParams] = useSearchParams();
    const artistID = searchParams.get("id");
    const artistName = searchParams.get("artist")
    const [currArtistID, setArtistID] = useState("");
    mixpanel.init('046ea653daecc890e2168c762151eb85', {debug: true, track_pageview: true, persistence: 'localStorage'});
    mixpanel.track_pageview({"page": "Artist Page", "artistID": artistID, "artistName": artistName});
    // const supabase = createClient('https://zouczoaamusrlkkuoppu.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpvdWN6b2FhbXVzcmxra3VvcHB1Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY3ODE1ODUyMSwiZXhwIjoxOTkzNzM0NTIxfQ.LTuL_u0tzmsj8Zf9m6JXN4JivwLq1aRXvU2YN-nDLCo')

    // const [artistData, setArtistData] = useState({
    //     fullName: "",
    //     allReviews: [],
    //     artistIdNumber: 0,
    // });
    console.log("Artist reload triggered")

    const [fullName, setFullName] = useState("");
    const [allReviews, setAllReviews] = useState([]);
    const [filteredReviews, setFilteredReviews] = useState([]);
    // const [artistIdNumber, setArtistIdNumber] = useState(artistID);
    const [aggregateRating, setAggregateRating] = useState(0);
    const [totalReviews, setTotalReviews] = useState(0);
    const [artistImage, setArtistImage] = useState("");
    const [spotifyLink, setSpotifyLink] = useState("");
    // const [ticketLink, setTicketLink] = useState("");
    const [instaLink, setInstaLink] = useState("");
    const [twitterLink, setTwitterLink] = useState("");
    const [websiteLink, setWebsiteLink] = useState("");
    const [imageArray, setImageArray] = useState([]);
    const [videoArray,setVideoArray] = useState([]);
    const [showResults, setShowResults] = useState(false);
    const [onTour, setOnTour] = useState(false);
    const [merchImgArray, setMerchImgArray] = useState([]);
    const [merchPriceArray, setMerchPriceArray] = useState([]);
    const [merchLinkArray, setMerchLinkArray] = useState([]);
    const [merchTitleArray, setMerchTitleArray] = useState([]);
    const [promoImageArray, setPromoImageArray] = useState([]);
    const [originalBannerImage,setOriginalBannerImg] = useState("");
    const [adminLoggedIn, setAdminLoggedIn] = useState(false);
    const [, updateState] = React.useState();
    const forceUpdate = React.useCallback(() => updateState({}), []);
    const handleAdminLoggedIn = () => {
        setAdminLoggedIn(true);
    }
    const searchReviews = (searchTerm) => {
        const options = {
            keys: ["review", "event"],
            minMatchCharLength: 3,
        }
        const fuse = new Fuse(filteredReviews, options);
        const results = fuse.search(searchTerm);
        setFilteredReviews(results.map((result) => { return result.item }));
        setShowResults(true);
    }

    const clearSearch = () => {
        setShowResults(false);
        setFilteredReviews(allReviews);
    }
    const performSearch = async () => {
        try {
            //try the supabase query here
            const getArtistSupabase = await supabase.from('artists').select('*').eq('artist_id', artistID);
            //Queries artist database with artistID passed by search bar
            const artistData = getArtistSupabase["data"][0];

            //Queries reviews database with artistID passed by search bar
            const getReviewsSupabase = await supabase.from('artist_reviews').select('*').eq('artist_id', artistID);
            const reviewData = getReviewsSupabase["data"];

            //Parse review data
            setAllReviews(parseReviewData(reviewData));
            setFilteredReviews(parseReviewData(reviewData));

            //Sets artist header image
            const bannerImage = artistData["cropped_image"] || artistData["banner_image"];
            setArtistImage(bannerImage);
            setOriginalBannerImg(artistData["banner_image"]);
            //log the artist name
            setFullName(artistData["name"]);
            setOnTour(artistData["on_tour"]);

            const imageGallerySupabase = await supabase.from('artist_images').select('*').eq('artist_id', artistID);
            //initialize an array to hold the images
            var imageArray = [];
            //loop through the data and push the images into the array
            for (var i = 0; i < imageGallerySupabase.data.length; i++) {
                imageArray.push(imageGallerySupabase.data[i].image_url);
            }
          
            var videoArray = []
            for (var i = 0; i < imageGallerySupabase.data.length; i++) {
                // console.log(imageGallerySupabase.data[i].video_url);
                videoArray.push(imageGallerySupabase.data[i].video_url);
            }
            //set the image array to the state
            setImageArray(imageArray);
            setVideoArray(videoArray);
            
            const merchGallerySupabase = await supabase.from('merch_images').select('*').eq('artist_id', artistID);

            var merchImgArray = [];
            var merchPriceArray = [];
            var merchLinkArray = [];
            var merchTitleArray = [];
            for (var i = 0; i < merchGallerySupabase.data.length; i++) {
                merchImgArray.push(merchGallerySupabase.data[i].image_url);
            }
            for (var i = 0; i < merchGallerySupabase.data.length; i++) {
                merchPriceArray.push(merchGallerySupabase.data[i].price);
            }
            for (var i = 0; i < merchGallerySupabase.data.length; i++) {
                merchLinkArray.push(merchGallerySupabase.data[i].store_link);
            }
            for (var i = 0; i < merchGallerySupabase.data.length; i++) {
                merchTitleArray.push(merchGallerySupabase.data[i].title);
            }
            setMerchImgArray(merchImgArray);
            setMerchPriceArray(merchPriceArray);
            setMerchLinkArray(merchLinkArray);
            setMerchTitleArray(merchTitleArray);
        
       
            
            const promoImageGallerySupabase = await supabase.from('promo_images').select('*').eq('artist_id', artistID);
            //initialize an array to hold the artist uploaded promo images
            var promoImageArray = []
            //loop through the data and push the images into the array
            for (var i = 0; i < promoImageGallerySupabase.data.length; i++) {
                // console.log(promoImageGallerySupabase.data[i].image_url);
                promoImageArray.push(promoImageGallerySupabase.data[i].image_url);
            }
            //set the image array to the state
            setPromoImageArray(promoImageArray);

            //gets the tickemaster artist details 
            const tmArtist = await fetch(`https://app.ticketmaster.com/discovery/v2/attractions.json?apikey=NwphXHPsTvSzPp0XwvUNdp3vyzE3vEww&classificationName=music&keyword=${artistName}`, { mode: 'cors' });
            const tmData = await tmArtist.json();
          /** 
            console.log(tmData);
            var spotify = tmData._embedded.attractions[0].externalLinks.spotify[0].url;
            var instagram = tmData._embedded.attractions[0].externalLinks.instagram[0].url;
            var twitter = tmData._embedded.attractions[0].externalLinks.twitter[0].url;
            var tickets = tmData._embedded.attractions[0].url;
            setInstaLink(instagram);
            setTwitterLink(twitter);

            setSpotifyLink(spotify);

            setSpotifyLink(spotify); **/
           // const getArtistSupabase = await supabase.from('artists').select('*').eq('artist_id', currArtistID); 
           // const artistData = getArtistSupabase["data"][0];
            setInstaLink(artistData["instagram_link"]);
            setTwitterLink(artistData["twitter_link"]);
            setSpotifyLink(artistData["spotify_link"]);
            setWebsiteLink(artistData["website_link"]);
           // const tmArtist = await fetch(`https://app.ticketmaster.com/discovery/v2/attractions.json?apikey=NwphXHPsTvSzPp0XwvUNdp3vyzE3vEww&classificationName=music&keyword=${artistName}`, { mode: 'cors' });
           // const tmData = await tmArtist.json();
            //var tickets = tmData._embedded.attractions[0].url;
           // setTicketLink(tickets);
        }
        catch {
            console.log('Webpage error. Please reload the page.');
        }
    }
    const changeBannerImage = (image)=>{
        setArtistImage(image);
    }
    //performs the search when the page loads
    useEffect(() => {
        performSearch();
    }, [artistID]);
    
    //parses the review data from the database
    function parseReviewData(reviewData) {
        var reviewsArray = [];
        var cumulativeRating = 0;
        for (var i = 0; i < reviewData.length; i++) {
            reviewsArray.push({
                "id": reviewData[i].id,                                              // review id
                "review": reviewData[i].review,                                      // review description
                "rating": reviewData[i].rating,                                      // review rating
                "name": reviewData[i].name,                                          // review author
                "event": reviewData[i].event,                                        // review event
                "eventDate": reviewData[i].eventDate,                                // review date
                "likeCount": reviewData[i].likeCount,                                // review like count
                "likedUsers": reviewData[i].likedUsers,                              // review liked users
                "dislikedUsers": reviewData[i].dislikedUsers                         // review disliked users
            });
            cumulativeRating += reviewData[i].rating;
        }
        setAggregateRating(cumulativeRating / reviewData.length);
        setTotalReviews(reviewData.length);
        return reviewsArray;
    }

    const ratingFilter = (event) => {
        var tempArray = allReviews;
        if (event.target.value > 0) {
            tempArray = tempArray.filter(review => {
                return review.rating == event.target.value
            });
        }
        setFilteredReviews(tempArray);
        forceUpdate();
    }

    const formChange = (event) => {
        //sort all reviews array by rating highest to lowest
        var tempArray = allReviews;
        if (event.target.value == 3) {
            tempArray.sort(function (a, b) {
                return b.rating > a.rating ? 1 : -1;
            });
        }
        //lowest to highest
        else if (event.target.value == 4) {
            tempArray.sort(function (a, b) {
                console.log(a.rating + " " + b.rating);
                return a.rating > b.rating ? 1 : -1;
            });
        }
        //oldest to newest
        else if (event.target.value == 2) {
            tempArray.sort(function (a, b) {
                return new Date(b.eventDate) < new Date(a.eventDate) ? 1 : -1;
            });
        }
        //newest to oldest
        else if (event.target.value == 1) {
            tempArray.sort(function (a, b) {
                return new Date(a.eventDate) < new Date(b.eventDate) ? 1 : -1;
            });
        }

        setFilteredReviews(tempArray);
        forceUpdate();
    }

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
                    <ArtistNavigation handleAdminLoggedIn={handleAdminLoggedIn}/>
                </Grid>
                <Grid item xs={12}>
                    <ArtistHeader  adminLoggedIn={adminLoggedIn} changeBannerImage={changeBannerImage} artistID={artistID} images={imageArray} videos={videoArray} name={fullName} rating={aggregateRating} total={totalReviews} image={artistImage} isVenue={0} onTour={onTour} verified={false} originalBannerImage={originalBannerImage}/>
                </Grid>
                <Grid container spacing={1} style={artist_styles.grid.body_container}>
                    <Grid item xs={12} md={8}>
                      {
                            // always show image carousel with promo if the curr user/artist is on their own page
                            // show image carousel to all other users if there are promo images to show
                            (currArtistID === artistID || promoImageArray.length > 0) && <>
                                <ImageCarousel artistID={artistID} images={promoImageArray} videos={[]} isPromo={true} currArtistID={currArtistID}
                                slideCount={window.innerWidth < common_styles.window_breakpoints.sm ? 1 : 3} />
                            </>
                        }
                        {/* <ImageCarousel artistID={artistID} images={imageArray} 
                            slideCount={window.innerWidth < common_styles.window_breakpoints.sm ? 1 : 3} /> */}
                        <ImageCarousel artistName={artistName} artistID={artistID} images={imageArray} videos={videoArray}  
                            slideCount={window.innerWidth < common_styles.window_breakpoints.sm ? 1 : 4} />
                        {
                            (currArtistID === artistID || merchImgArray.length > 0) && <>
                                <MerchCarousel artistID={artistID} currArtistID={currArtistID} images={merchImgArray} prices={merchPriceArray} links={merchLinkArray} titles={merchTitleArray}
                                slideCount={window.innerWidth < common_styles.window_breakpoints.sm ? 1 : 5} />
                                </>    
                        }

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
                        {fullName !== "" && <WriteReview artistId={artistID} name={fullName} numReviews={totalReviews}/>}
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
export default Artist;
