import React from "react";
import "../index.css";
import "react-multi-carousel/lib/styles.css"; 
import { Helmet } from "react-helmet";
import { Grid } from "@mui/material";

import HomeHeader from "../components/HomeHeader";

function AccountSettings() {

    return (
        <>
            <Helmet>
            </Helmet>
            <Grid container spacing={0}>
                <Grid item xs={12}>
                    <HomeHeader />
                </Grid>
            </Grid >
        </>
    );
}
export default AccountSettings;