import React from "react";
import "../index.css";
import { Grid } from "@mui/material";
import ArtistNavigation from "../ArtistNavigation"
import ArtistHeader from "../components/ArtistHeader";
import {useState, useEffect} from "react";
import { useSearchParams } from "react-router-dom";
import { createClient } from '@supabase/supabase-js'
import common_styles from "../Styles/common_styles";
import artist_styles from "../Styles/artist_styles";
import ImageCarousel from "../components/ImageCarousel";
import Fuse from 'fuse.js'
import ArtistContent from "../components/ArtistContent";
import SideContent from "../components/SideContent";



export default function Festival() {

    const [searchParams] = useSearchParams();
    const festivalNameGet = searchParams.get("festival");
    const festivalIDGlobal = searchParams.get("id");
    console.log(festivalIDGlobal)
    console.log(festivalNameGet)
    const supabase = createClient('https://zouczoaamusrlkkuoppu.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpvdWN6b2FhbXVzcmxra3VvcHB1Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY3ODE1ODUyMSwiZXhwIjoxOTkzNzM0NTIxfQ.LTuL_u0tzmsj8Zf9m6JXN4JivwLq1aRXvU2YN-nDLCo')


    const [festival_name, setFestivalName] = useState("");
    const [banner_image, setBannerImage] = useState("");
    const [aggregateRating, setAggregateRating] = useState(0);
    const [totalReviews, setTotalReviews] = useState(0);
    const [festivalCity, setFestivalCity] = useState("");
    const [festivalState, setFestivalState] = useState("");
    const [festivalImages, setFestivalImages] = useState([]);
    const [allReviews, setAllReviews] = useState([]);
    const forceUpdate = React.useCallback(() => updateState({}), []);
    const [filteredReviews, setFilteredReviews] = useState([]);
    const [showResults, setShowResults] = useState(false);
    const [, updateState] = React.useState();
    const window_breakpoints = common_styles.window_breakpoints;

    const searchReviews = (searchTerm) => {
        const options = {
            keys: ["review", "event"],
            minMatchCharLength: 3,
        }
        const fuse = new Fuse(filteredReviews, options);
        const results = fuse.search(searchTerm);
        setFilteredReviews(results.map((result) => {return result.item}));
        setShowResults(true);
      }
    
      const clearSearch = () => {
          setShowResults(false);
          setFilteredReviews(allReviews);
      }
    


    const performSearch = async () => {
        try
        {
            const festivalData = await supabase.from('festivals').select('*').eq('id', festivalIDGlobal);
            console.log(festivalData)
            setFestivalName(festivalData.data[0].name);
            const banner_image = festivalData.data[0].banner_image;
            const city = festivalData.data[0].city;
            const state = festivalData.data[0].state;
            setFestivalCity(city);
            setFestivalState(state);
            setBannerImage(banner_image);

            const festivalGalleryData  = await supabase.from('festival_carousel_images').select('*').eq('festival_id', festivalIDGlobal);
            var imageGallery = [];
            //loop through the data and push the image urls into the array
            for (var i = 0; i < festivalGalleryData.data.length; i++) {
                imageGallery.push(festivalGalleryData.data[i].image_url);
            }
            setFestivalImages(imageGallery);
            const reviewData = await supabase.from('festival_reviews').select('*').eq('festival_id', festivalIDGlobal);
            setAllReviews(parseReviewData(reviewData["data"]));
            setFilteredReviews(parseReviewData(reviewData["data"]));
        }
        catch
        {
            console.log('Webpage error. Please reload the page.');
        }
    }


    //performs the search when the page loads
    useEffect(() => {
        performSearch();
    }, [festivalIDGlobal]);

    //parses the review data from the database
    function parseReviewData(reviewData) {
        var reviewsArray = [];
        var cumulativeRating = 0;
        for(var i = 0; i < reviewData.length; i++) {
        reviewsArray.push({
            "review":reviewData[i].review,                                       // review description
            "rating":reviewData[i].rating,                                       // review rating
            "name":reviewData[i].name,                                         // review author                                       // review event
            "eventDate":reviewData[i].eventDate,                                    // review date
        });

        cumulativeRating += reviewData[i].rating;
        }
        cumulativeRating = cumulativeRating / reviewData.length;
        setAggregateRating(cumulativeRating);
        setTotalReviews(reviewData.length);
        console.log(reviewsArray);
        return reviewsArray;
    }

    const ratingFilter = (event) => {
        var tempArray = allReviews;
        if(event.target.value > 0){
            tempArray = tempArray.filter(review => review.rating == event.target.value);
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
        <Grid container spacing={0}>
            <Grid item xs={12}>
                <ArtistNavigation />
            </Grid>
            <Grid item xs={12}>
                <ArtistHeader name={festival_name} rating={aggregateRating} total={totalReviews} image={banner_image} isVenue={0} city={festivalCity} onTour={false} verified={true}/>
            </Grid>
            <Grid container spacing={1} style={artist_styles.grid.body_container}>
                <Grid item xs={12} md={8}>
                    <ImageCarousel 
                        images={festivalImages} 
                        slideCount={window.innerWidth < window_breakpoints.sm ? 1 : 3} 
                        isVenue={1} 
                        venueID={festivalIDGlobal} />
                    <ArtistContent allReviews={allReviews} filteredReviews={filteredReviews} aggregateRating={aggregateRating} onFormChange={formChange} onRatingChange={ratingFilter} onReviewSearch={searchReviews} searchResults={showResults} onClearSearch={clearSearch}/>
                    {/* {venue_name !== "" && <WriteVenueReview venueId={venueIdNumber} name={venue_name} numReviews={totalReviews}/>} */}
                </Grid>
                <Grid item xs={12} md={4}>
                    {/* <SideContent name={venue_name} venue={true} linkPairs={[[ticketLink, "images/ticketmaster_icon.png"],]} /> */}
                    <SideContent name={"Coachella Music Festival"} festival={true} />
                </Grid>
            </Grid>
        </Grid>
    )
}