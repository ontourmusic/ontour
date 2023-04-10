
import React from "react";
import { createSearchParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Navigation from "../Navigation";
import SearchBar from "../components/SearchBar";
import "pure-react-carousel/dist/react-carousel.es.css";
import '../Styles/carousel.css';
import ArtistCarousel from "../components/ArtistCarousel";
import { Audio } from 'react-loading-icons'
import { createClient } from '@supabase/supabase-js'
import Categories from "../components/Categories";
import { Divider, Typography } from "@mui/material";
import { Grid } from "@mui/material";
import category_styles from "../Styles/category_styles";
import HomeTile from "../components/HomeTile";
import Rating from '@mui/material/Rating';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import OnTourColors from "../Styles/colors";


function Home() {
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

    const navigate = useNavigate();
    const routeChange = (artist) => {
        navigate({
            pathname: '/artist',
            search: createSearchParams({
                artist: artist_name,
            }).toString()
        });
    };

    //gets the artist rating data from the database
    const performSearch = async () => {
        var starsResults = {};
        var ratingCount = {};
        var newRatings = {};
        var newCount = {};
        var newVenueRatings = {};
        var newVenueCount = {};
        var artistIDList = {};


        //gets the artist reviews from the database 
        const reviewData = await supabase.from('artist_reviews').select('*');

        for (let i = 0; i < reviewData.data.length; i++) {
            const currData = reviewData.data[i].artist_id;
            newRatings[currData] = 0;
            newCount[currData] = 0;
        }

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
        console.log(newVenueRatings);

        //gets the list of recent artists from the database
        const recentArtists = await supabase.from('artists').select('*').order('review_count', { ascending: false }).limit(8);
        const artistObject = {};
        for (let i = 0; i < recentArtists["data"].length; i++) {
            const currData = recentArtists["data"][i];
            const key = currData.name.replace(/\s+/g, '_').toLowerCase();
            artistObject[key] = {
                name: currData.name,
                imageURL: currData.home_image,
                artistID: currData.artist_id,
            }
        }

        //gets the list of recent venues from the database
        const recentVenues = await supabase.from('venues').select('*').order('review_count', { ascending: false }).limit(8);
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
        console.log(artistList);

        for (var i = 0; i < Object.keys(artistObject).length; i++) {
            var artistNameList = Object.keys(artistObject);
            var artistName = artistNameList[i];
            var artistID = artistObject[artistName].artistID;
            starsResults[artistName] = (newRatings[artistID] / newCount[artistID]);
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


        //try geolocating
        var url = "https://ipinfo.io/json?token=fb31edba4fabb9";
        const response = fetch(url).then(result => result.json())
            .then(featureCollection => {
                var lat = featureCollection.loc.split(",")[0];
                var lon = featureCollection.loc.split(",")[1];
                console.log(lat);
                console.log(lon);

                var ticketmasterurl = `https://app.ticketmaster.com/discovery/v2/events.json?apikey=NwphXHPsTvSzPp0XwvUNdp3vyzE3vEww&latlong=${lat},${lon}&sort=relevance,desc&classificationName=Music`
                const ticketmasterresponse = fetch(ticketmasterurl).then(result => result.json())
                    .then(featureCollection => {
                        console.log(featureCollection);
                        //sort featurecollection by date
                        var sorted = featureCollection._embedded.events.sort(function (a, b) {
                            var dateA = new Date(a.dates.start.localDate), dateB = new Date(b.dates.start.localDate);
                            return dateA - dateB;
                        }
                        );
                        console.log(sorted);
                    })
            });






    }

    //performs the search when the page loads
    useEffect(() => {
        performSearch();
        console.log(reviewCount);
    }, [artistList.name]);

    const display = loading ? "hidden" : "visible";
    const testingGrid = true;
    if (testingGrid) {
        return (
            <Grid container spacing={0} sx={{ backgroundColor: "#181816" }}>
                <Grid item xs={12}>
                    <Navigation />
                </Grid>
                <Grid item xs={12}>
                    <div id="homeheader">
                        <div id="headercontent" class="search">
                            <h1 class="hometitle">Find Your Next<br />Live Music Experience</h1>
                            <SearchBar></SearchBar>
                        </div>
                    </div>
                </Grid>
                <Grid item xs={12} container>
                    <Grid item xs={12}>
                        <h1 style={{ color: "#FFFFFF" }} class="homebanner">Review the artists you love</h1>
                    </Grid>
                    {Object.keys(artistList).map((artist, index) => {
                        return (
                            <Grid item xs={4} md={3}>
                                <HomeTile
                                    isArtist={true}
                                    imageURL={artistList[artist].imageURL}
                                    loading={loading}
                                    id={artistList[artist].artistID}
                                    name={artistList[artist].name}
                                    rating={ratings[artist]}
                                    reviewCount={reviewCount[artist]}
                                />
                            </Grid>
                        )
                    })}
                </Grid>
                <Grid item xs={12}>
                    <div class="homereview" style={{ backgroundColor: "#181816" }}>
                        <p>No one puts on a show like Taylor Alison Swift! After the chaos that was trying to
                            get tickets to the Eras Tour I had VERY high hopes for this show and thankfully
                            it did not disappoint. This concert was THREE hours of pure joy and bliss!</p>
                        <div style={styles.RatingRow}>
                            <Rating
                                value={5}
                                size="large"
                                readOnly
                                precision={0.1}
                                emptyIcon={<StarBorderOutlinedIcon style={{ opacity: 1, color: "white" }} fontSize="inherit" />}
                            />
                            <div style={styles.TotalReviewsText}>
                                Tom H. 12/22/2022 Allegiant Stadium
                            </div>
                        </div>
                    </div>
                </Grid>
                <Categories />
                <Grid item xs={12} container>
                    <Grid item xs={12}>
                        <h1 style={{ color: "#FFFFFF" }} class="homebanner">Review Legendary Venues</h1>
                    </Grid>
                    {Object.keys(venueList).map((venue, index) => {
                        return (
                            <Grid item xs={4} md={3}>
                                <HomeTile
                                    isArtist={false}
                                    id={venueList[venue].venueID}
                                    imageURL={venueList[venue].imageURL}
                                    name={venueList[venue].name}
                                    rating={venueRatings[venue]}
                                    reviewCount={venueReviewCount[venue]}
                                />
                            </Grid>
                        )
                    })}
                </Grid>
                <Grid item xs={12}>
                    <div class="homereview" style={{ backgroundColor: "#181816" }}>
                        <p>No one puts on a show like Taylor Alison Swift! After the chaos that was trying to
                            get tickets to the Eras Tour I had VERY high hopes for this show and thankfully
                            it did not disappoint. This concert was THREE hours of pure joy and bliss!</p>
                        <div style={styles.RatingRow}>
                            <Rating
                                value={5}
                                size="large"
                                readOnly
                                precision={0.1}
                                emptyIcon={<StarBorderOutlinedIcon style={{ opacity: 1, color: "white" }} fontSize="inherit" />}
                            />
                            <div style={styles.TotalReviewsText}>
                                Tom H. 12/22/2022 Allegiant Stadium
                            </div>
                        </div>
                    </div>
                </Grid>

            </Grid>
        )
    }

    return (
        <>
            <Navigation />
            <div id="homepage">
                <div id="homeheader">
                    <div id="headercontent" class="search row">
                        <h1 class="hometitle">Find Your Next<br />Live Music Experience</h1>
                        <SearchBar></SearchBar>
                    </div>
                </div>
                <div class="homegrid">
                    <h1 class="homebanner">Review the artists you love</h1>
                    <Grid container>
                        {Object.keys(artistList).map((artist, index) => {
                            return (
                                <Grid item xs={4} md={3}>
                                    <HomeTile isArtist={true} imageURL={artistList[artist].imageURL} loading={loading} id={artistList[artist].artistID} name={artistList[artist].name} rating={ratings[artist]} reviewCount={reviewCount[artist]}></HomeTile>
                                </Grid>
                            )
                        })}
                    </Grid>
                </div>
                <div class="homereview">
                    <p>No one puts on a show like Taylor Alison Swift! After the chaos that was trying to
                        get tickets to the Eras Tour I had VERY high hopes for this show and thankfully
                        it did not disappoint. This concert was THREE hours of pure joy and bliss!</p>
                    <div style={styles.RatingRow}>
                        <Rating
                            value={5}
                            size="large"
                            readOnly
                            precision={0.1}
                            emptyIcon={<StarBorderOutlinedIcon style={{ opacity: 1, color: "white" }} fontSize="inherit" />}
                        />
                        <div style={styles.TotalReviewsText}>
                            Tom H. 12/22/2022 Allegiant Stadium
                        </div>
                    </div>
                </div>
                <Categories />
                <div class="homegrid">
                    <h1 class="homebanner">Review legendary venues</h1>
                    <Grid container>
                        {Object.keys(venueList).map((venue, index) => {
                            return (
                                <Grid item xs={4} md={3}>
                                    <HomeTile isArtist={false} id={venueList[venue].venueID} imageURL={venueList[venue].imageURL} name={venueList[venue].name} rating={venueRatings[venue]} reviewCount={venueReviewCount[venue]}></HomeTile>
                                </Grid>
                            )
                        })}
                    </Grid>
                </div>
                <div class="homereview">
                    <p>No one puts on a show like Taylor Alison Swift! After the chaos that was trying to
                        get tickets to the Eras Tour I had VERY high hopes for this show and thankfully
                        it did not disappoint. This concert was THREE hours of pure joy and bliss!</p>
                    <div style={styles.RatingRow}>
                        <Rating
                            value={5}
                            size="large"
                            readOnly
                            precision={0.1}
                            emptyIcon={<StarBorderOutlinedIcon style={{ opacity: 1, color: "white" }} fontSize="inherit" />}
                        />
                        <div style={styles.TotalReviewsText}>
                            Tom H. 12/22/2022 Allegiant Stadium
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
export default Home;

const styles = {
    RatingRow: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        spacing: 1,
    },
    TotalReviewsText: {
        marginLeft: "0.5rem",
        color: "white",
        position: "center",
    },
}
