import React from "react";
import "../index.css";
import { Grid } from "@mui/material";
import ArtistNavigation from "../ArtistNavigation"
import ArtistHeader from "../components/ArtistHeader";
import {useState, useEffect} from "react";
import { useSearchParams } from "react-router-dom";
import { createClient } from '@supabase/supabase-js'


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
    const [totalRating, setTotalRating] = useState(0);
    const [festivalCity, setFestivalCity] = useState("");
    const [festivalState, setFestivalState] = useState("");

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

    return (
        <Grid container spacing={0}>
            <Grid item xs={12}>
                <ArtistNavigation />
            </Grid>
            <Grid item xs={12}>
                <ArtistHeader name={festival_name} rating={4.7} total={7} image={banner_image} isVenue={0} city={festivalCity} onTour={false} verified={true}/>
            </Grid>
        </Grid>
    )
}