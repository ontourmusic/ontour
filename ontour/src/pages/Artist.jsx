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


// Testing
import { Grid } from "@mui/material";
import ArtistSidebar from "../components/ArtistSidebar";
import ArtistContent from "../components/ArtistContent";
import ComponentCarousel from "../components/ComponentCarousel";
import { Polaroid } from "../components/Polaroid";


function Artist() {
    //gets the name from the artist that was searched for on the home page
    const [searchParams] = useSearchParams();
    const artistName = searchParams.get("artist");

    //set var names here
    const [artistData, setArtistData] = useState({
        fullName: "",
        allReviews: [],
        artistIdNumber: 0,
    });

    const [fullName, setFullName] = useState("");
    const [allReviews, setAllReviews] = useState([]);
    const [artistIdNumber, setArtistIdNumber] = useState(0);
    const [aggregateRating, setAggregateRating] = useState(0);
    const [totalReviews, setTotalReviews] = useState(0);
    const [artistImage, setArtistImage] = useState("");
    const [spotifyLink, setSpotifyLink] = useState("");
    const [ticketLink, setTicketLink] = useState("");
    const [imageArray, setImageArray] = useState([]);
    const [, updateState] = React.useState();
    const forceUpdate = React.useCallback(() => updateState({}), []);

    //gets the artist and review data from the database
    const performSearch = async () => {
        console.log(artistName);
        const artistResponse = await fetch(`http://ec2-3-129-52-41.us-east-2.compute.amazonaws.com:8000/search_artist/${artistName}`, { mode: 'cors' });
        const artistData = await artistResponse.json();
        console.log(artistData);
        setFullName(artistData[0].fname + " " + artistData[0].lname);
        const artistId = artistData[0].artist_id;
        const imageUrls = artistData[0].image_url;
        setArtistImage(imageUrls);
        setArtistIdNumber(artistId);
        const imageGallery = artistData[0].images;
        setImageArray(imageGallery);

        const getReviews = await fetch(`http://ec2-3-129-52-41.us-east-2.compute.amazonaws.com:8000/reviews/${artistId}`, { mode: 'cors' });
        const reviewData = await getReviews.json();
        console.log(reviewData);
        setAllReviews(parseReviewData(reviewData));

        //gets the tickemaster artist details 
        const tmArtist = await fetch(`https://app.ticketmaster.com/discovery/v2/attractions.json?apikey=NwphXHPsTvSzPp0XwvUNdp3vyzE3vEww&keyword=${artistName}`, { mode: 'cors' });
        const tmData = await tmArtist.json();
        var spotify = tmData._embedded.attractions[0].externalLinks.spotify[0].url;
        var tickets = tmData._embedded.attractions[0].url;
        setTicketLink(tickets);
        setSpotifyLink(spotify);

    }

    //performs the search when the page loads
    useEffect(() => {
        performSearch();
    }, [artistName]);

    //parses the review data from the database
    function parseReviewData(reviewData) {
        var reviewsArray = [];
        var cumulativeRating = 0;
        for (var i = 0; i < reviewData.length; i++) {
            reviewsArray.push([
                reviewData[i].description,                                  // review description
                reviewData[i].rating,                                       // review rating
                reviewData[i].fname + " " + reviewData[i].lname[0] + ".",   // review author
                reviewData[i].eventname,                                    // review event
                reviewData[i].date,                                         // review date
            ]);
            cumulativeRating += reviewData[i].rating;
        }
        setAggregateRating(cumulativeRating / reviewData.length);
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
                    <ArtistSidebar name={fullName} spotify={spotifyLink} tickets={ticketLink} />
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <hr id="artist-footer"></hr>
                <Footer />
            </Grid>
        </Grid>

    );

}


export default Artist;