import React from "react";
import "../index.css";
import "react-multi-carousel/lib/styles.css";
import ArtistHeader from "../components/ArtistHeader";
import Carousel from "../components/Carousel";
import WriteReview from "../components/WriteReview";
import Footer from "../components/Footer";

import { useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import ArtistNavigation from "../ArtistNavigation"

import artist_styles from "../Styles/artist_styles";

import { createClient } from '@supabase/supabase-js'


// Testing
import { Grid } from "@mui/material";
import SideContent from "../components/SideContent";
import ArtistContent from "../components/ArtistContent";
import ComponentCarousel from "../components/ComponentCarousel";


function Artist() {
    //gets the name from the artist that was searched for on the home page
    const [searchParams] = useSearchParams();
    const artistID = searchParams.get("id");
    const artistName = searchParams.get("artist")
    console.log(artistID);

    const supabase = createClient('https://zouczoaamusrlkkuoppu.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpvdWN6b2FhbXVzcmxra3VvcHB1Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY3ODE1ODUyMSwiZXhwIjoxOTkzNzM0NTIxfQ.LTuL_u0tzmsj8Zf9m6JXN4JivwLq1aRXvU2YN-nDLCo')

    //set var names here
    const [artistData, setArtistData] = useState({
        fullName: "",
        allReviews: [],
        artistIdNumber: 0,
    });

    const [fullName, setFullName] = useState("");
    const [allReviews, setAllReviews] = useState([]);
    const [artistIdNumber, setArtistIdNumber] = useState(artistID);
    const [aggregateRating, setAggregateRating] = useState(0);
    const [totalReviews, setTotalReviews] = useState(0);
    const [artistImage, setArtistImage] = useState("");
    const [spotifyLink, setSpotifyLink] = useState("");
    const [ticketLink, setTicketLink] = useState("");
    const [imageArray, setImageArray] = useState([]);
    const [, updateState] = React.useState();
    const forceUpdate = React.useCallback(() => updateState({}), []);

    const performSearch = async () => {
        try{


            //try the supabase query here
            const getArtistSupabase = await supabase.from('artists').select('*').eq('artist_id', artistID);



            //Queries artist database with artistID passed by search bar
            // const artistResponse = await fetch(`http://18.188.104.212:8000/artist/${artistID}`, { mode: 'cors' });
            // const artistDataResponse = await artistResponse.json();
            const artistData = getArtistSupabase["data"][0];

            //Queries reviews database with artistID passed by search bar
            // const getReviews = await fetch(`http://18.188.104.212:8000/reviews/${artistID}`, { mode: 'cors' });
            const getReviewsSupabase = await supabase.from('artist_reviews').select('*').eq('artist_id', artistID);
            // const reviewDataResponse = await getReviews.json();
            const reviewData = getReviewsSupabase["data"];
            //Parse review data
            setAllReviews(parseReviewData(reviewData));

            //Sets artist header image
            const bannerImage = artistData["banner_image"];
            setArtistImage(bannerImage);

            //log the artist name
            setFullName(artistData["name"]);

            //TODO: CALL IMAGE CAROUSEL DATABASE
            // const imageGallery = await fetch(`http://18.188.104.212:8000/carousel_images/${artistID}`, { mode: 'cors' });
            const imageGallerySupabase = await supabase.from('artist_carousel_images').select('*').eq('artist_id', artistID);
            // console.log(imageGallerySupabase);
            // const imageGalleryData = await imageGallery.json();
            // console.log(imageGalleryData);
            //initialize an array to hold the images
            var imageArray = [];
            //loop through the data and push the images into the array
            for (var i = 0; i < imageGallerySupabase.data.length; i++) {
                console.log(imageGallerySupabase.data[i].image_url);
                imageArray.push(imageGallerySupabase.data[i].image_url);
            }
            //set the image array to the state
            console.log(imageArray);
            setImageArray(imageArray);
            // const imageGallery = artistData[0].images;
            // setImageArray(imageGallery);


            //gets the tickemaster artist details 
            const tmArtist = await fetch(`https://app.ticketmaster.com/discovery/v2/attractions.json?apikey=NwphXHPsTvSzPp0XwvUNdp3vyzE3vEww&keyword=${artistName}`, { mode: 'cors' });
            const tmData = await tmArtist.json();
            var spotify = tmData._embedded.attractions[0].externalLinks.spotify[0].url;
            var tickets = tmData._embedded.attractions[0].url;
            setTicketLink(tickets);
            setSpotifyLink(spotify);
        }
        catch{
            console.log('Webpage error. Please reload the page.');
        }
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
            reviewsArray.push([
                reviewData[i].review,                                       // review description
                reviewData[i].rating,                                       // review rating
                reviewData[i].name,                                         // review author
                reviewData[i].event,                                        // review event
                reviewData[i].eventDate,                                    // review date
            ]);
            cumulativeRating += reviewData[i].rating;
        }
        setAggregateRating(cumulativeRating / reviewData.length);
        console.log("aggregate rating: ")
        console.log(aggregateRating);
        setTotalReviews(reviewData.length);
        return reviewsArray;
    }

    const formChange = (event) => {
        //sort all reviews array by rating highest to lowest
        console.log("in here");
        console.log(event.target.value);
        var tempArray = allReviews;
        if (event.target.value === 3) {
            tempArray.sort(function (a, b) {
                return b[1] > a[1] ? 1 : -1;
            });
        }
        //lowest to highest
        else if (event.target.value === 4) {
            console.log("in lowest to highest");
            tempArray.sort(function (a, b) {
                return a[1] > b[1] ? 1 : -1;
            });
        }
        //oldest to newest
        else if (event.target.value === 2) {
            tempArray.sort(function (a, b) {
                return new Date(b[4]) < new Date(a[4]) ? 1 : -1;
            });
        }
        //newest to oldest
        else if (event.target.value === 1) {
            tempArray.sort(function (a, b) {
                return new Date(a[4]) < new Date(b[4]) ? 1 : -1;
            });
        }

        //print all reviews array
        for (var i = 0; i < allReviews.length; i++) {
            console.log(allReviews[i]);
        }
        setAllReviews(tempArray);
        forceUpdate();
    }

    return (
        <Grid container spacing={0}>
            <Grid item xs={12}>
                <ArtistNavigation />
            </Grid>
            <Grid item xs={12}>
                <ArtistHeader name={fullName} rating={aggregateRating} total={totalReviews} image={artistImage} />
            </Grid>
            <Grid container spacing={1} style={artist_styles.grid.body_container}>
                <Grid item xs={12} md={8}>
                    {/* {
                        imageArray.length > 0 &&
                        <ComponentCarousel numToDisplay={3} uniformWidth={true} 
                            componentArray={imageArray.map((image, index) => {
                                return (
                                    <Polaroid key={index} imageURL={image} />
                                );
                            })}
                        />
                    } */}
                    <Carousel images={imageArray} />
                    <ArtistContent allReviews={allReviews} aggregateRating={aggregateRating} onFormChange={formChange} />
                    {fullName !== "" && <WriteReview artistId={artistIdNumber} name={fullName} />}
                </Grid>
                <Grid item xs={12} md={4}>
                    <SideContent name={fullName} linkPairs={[[spotifyLink, "images/spotify_icon.png"], [ticketLink, "images/ticketmaster_icon.png"]]} />
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <hr id="artist-footer"></hr>
                <Footer />
            </Grid>
        </Grid >
    );
}
export default Artist;