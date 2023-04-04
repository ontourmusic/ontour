import { Grid, Typography, Alert } from "@mui/material";
import React from "react";
import { useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Navigation from "../ArtistNavigation";
import { createClient } from '@supabase/supabase-js'
import ResultsCard from "../components/ResultsCard";
import ResultsOverlay from "../components/ResultsOverlay";


const SearchResults = () => {
    const [searchParams] = useSearchParams();
    const textSearched = searchParams.get("search");

    const [artist_name, setName] = useState('')
    const [ratings, setRatings] = useState({});
    const [reviewCount, setReviewCount] = useState({});
    const [venueRatings, setVenueRatings] = useState({});
    const [venueReviewCount, setVenueReviewCount] = useState({});
    const [loading, setLoading] = useState(true);
    const [artistIDs, setArtistIDs] = useState({});
    const [artistList, setArtistList] = useState({ name: "", imageURL: "", artistID: -1 });
    const [venueList, setVenueList] = useState({});
    const supabase = createClient('https://zouczoaamusrlkkuoppu.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpvdWN6b2FhbXVzcmxra3VvcHB1Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY3ODE1ODUyMSwiZXhwIjoxOTkzNzM0NTIxfQ.LTuL_u0tzmsj8Zf9m6JXN4JivwLq1aRXvU2YN-nDLCo');


    //gets the artist rating data from the database
    const performSearch = async () => {
        var starsResults = {};
        var ratingCount = {};
        var newRatings = {};
        var newCount = {};
        var newVenueRatings = {};
        var newVenueCount = {};
        var artistIDList = {};


        //gets the list of recent artists from the database
        // const recentArtists = await supabase.from('artists').select('*').order('artist_id', { ascending: false }).limit(10);
        // for (let i = 0; i < recentArtists["data"].length; i++) {
        //     const currData = recentArtists["data"][i];
        //     const key = currData.name.replace(/\s+/g, '_').toLowerCase();
        //     artistObject[key] = {
        //         name: currData.name,
        //         imageURL: currData.home_image,
        //         artistID: currData.artist_id,
        //     }
        // }
        const artistObject = {};
        const artistsByGenre = await supabase.from('artists').select('*').match({ genre: textSearched });
        for (let i = 0; i < artistsByGenre["data"].length; i++) {
            const currData = artistsByGenre["data"][i];
            const key = currData.name.replace(/\s+/g, '_').toLowerCase();
            newRatings[currData.artist_id] = 0;
            newCount[currData.artist_id] = 0;
            artistObject[key] = {
                name: currData.name,
                imageURL: currData.home_image,
                artistID: currData.artist_id,
            }
        }

        //gets the artist reviews from the database 
        const reviewData = await supabase.from('artist_reviews').select('*');

        // for (let i = 0; i < reviewData.data.length; i++) {
        //     const currData = reviewData.data[i].artist_id;
        //     newRatings[currData] = 0;
        //     newCount[currData] = 0;
        // }

        //loop through the reviews and add the ratings to the artist
        for (let i = 0; i < reviewData.data.length; i++) {
            const currData = reviewData.data[i];
            newRatings[currData.artist_id] += currData.rating;
            newCount[currData.artist_id]++;
        }
        //gets the venue reviews from the database
        const venueReviewData = await supabase.from('venue_reviews').select('*');

        for (let i = 0; i < venueReviewData.data.length; i++) {
            const currData = venueReviewData.data[i].venue_id;
            newVenueRatings[currData] = 0;
            newVenueCount[currData] = 0;
        }
        //same as above but for venues
        for (let i = 0; i < venueReviewData.data.length; i++) {
            const currData = venueReviewData.data[i];
            newVenueRatings[currData.venue_id] += currData.rating;
            newVenueCount[currData.venue_id]++;
        }
        // console.log(newVenueRatings);

        //gets the list of recent venues from the database
        const recentVenues = await supabase.from('venues').select('*').order('venue_id', { ascending: false }).limit(10);
        const venueObject = {};
        for (let i = 0; i < recentVenues["data"].length; i++) {
            const currData = recentVenues["data"][i];
            const key = currData.name.replace(/\s+/g, '_').toLowerCase();
            venueObject[key] = {
                name: currData.name,
                imageURL: currData.home_image,
                venueID: currData.venue_id,
            }
        }
        setVenueList(venueObject);
        setArtistList(artistObject);
        // console.log(artistList);

        for (var i = 0; i < Object.keys(artistObject).length; i++) {
            var artistNameList = Object.keys(artistObject);
            var artistName = artistNameList[i];
            var artistID = artistObject[artistName].artistID;
            if(newCount[artistID] == 0){
                starsResults[artistName] = 0;
            }
            else{
                starsResults[artistName] = (newRatings[artistID] / newCount[artistID]);
            }
            ratingCount[artistName] = newCount[artistID];
            artistIDList[artistName] = artistID;
        }

        for (var i = 0; i < Object.keys(venueObject).length; i++) {
            var venueNameList = Object.keys(venueObject);
            var venueName = venueNameList[i];
            var venueID = venueObject[venueName].venueID;
            venueRatings[venueName] = (newVenueRatings[venueID] / newVenueCount[venueID]);
            venueReviewCount[venueName] = newVenueCount[venueID];
        }

        setRatings(() => {
            return starsResults
        });
        setReviewCount(() => {
            return ratingCount
        })
        setArtistIDs(() => {
            return artistIDList
        })
        setLoading(false);
    }

    useEffect(() => {
        performSearch();
    }, []);

    useEffect(() => {
        // console.log("search params:", textSearched);
        // console.log("artist list:", artistList);
        // console.log("venue list:", venueList);
        // console.log("ratings:", ratings);
        // console.log("venue ratings:", venueRatings);
        // console.log("review count:", reviewCount);
        // console.log("venue review count:", venueReviewCount);
    }, [textSearched, artistList, venueList]);

    return (

        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Navigation />
            </Grid>
            <Grid item xs={12}>
                <Alert severity='warning' style={{ marginTop: "20px" }}> This feature is still in development. </Alert>
            </Grid>
            <Grid item xs={12} sm={6} md={4} >
                {
                    artistList &&
                    <ResultsOverlay
                        artistList={artistList}
                        ratings={ratings}
                        reviewCount={reviewCount}
                        artistIDs={artistIDs}
                        venueList={venueList}
                        venueRatings={venueRatings}
                        venueReviewCount={venueReviewCount}
                    />
                }
            </Grid>
            {/* <Grid item xs={12} spacing={2} container >

                <Grid item xs={12}>
                    <Typography variant="h4" align="center" style={{ marginTop: "20px" }}>
                        Artists:
                    </Typography>
                </Grid>
                {Object.keys(artistList).map((artistName) => {
                    return (
                        <Grid item xs={12} sm={6} md={4} >
                            <ResultsCard
                                artistID={artistList[artistName].artistID}
                                name={artistList[artistName].name}
                                imageURL={artistList[artistName].imageURL}
                                rating={ratings[artistName]}
                                reviewCount={reviewCount[artistName]}
                            />
                        </Grid>
                    )
                })}
                <Grid item xs={12}>
                    <Typography variant="h4" align="center" style={{ marginTop: "20px" }}>
                        Venues:
                    </Typography>
                </Grid>
                {Object.keys(venueList).map((venueName) => {
                    return (
                        <Grid item xs={12} sm={6} md={4} >
                            <ResultsCard
                                venueID={venueList[venueName].venueID}
                                name={venueList[venueName].name}
                                imageURL={venueList[venueName].imageURL}
                                rating={venueRatings[venueName]}
                                reviewCount={venueReviewCount[venueName]}
                            />
                        </Grid>
                    )
                })}
            </Grid> */}
        </Grid>
    )
}

export default SearchResults