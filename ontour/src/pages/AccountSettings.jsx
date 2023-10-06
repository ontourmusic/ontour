import React from "react";
import "../index.css";
import "react-multi-carousel/lib/styles.css"; 
import { Helmet } from "react-helmet";
import { Grid } from "@mui/material";

import Navigation from "../Navigation";

function AccountSettings() {
    //functions 

    return (
        <>
            <Helmet>
            </Helmet>
            <Grid container spacing={0}>
                <Grid item xs={12}>
                    <Navigation navbar={false}/>
                </Grid>
            </Grid >
        </>
    );
}
export default AccountSettings;