import { Grid } from "@mui/material";
import React from "react";
import Navigation from "../Navigation";

const GridHome = () => {
    return (
        <Grid container spacing={2}>
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

        </Grid>
    )

};

export default GridHome;