import React from "react";
import '../index.css';
import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardMedia, Typography, Box, Rating, Grid, alpha } from "@mui/material";
import results_styles from "../Styles/results_styles";

export default function DisplayHeadliners(props)
{

    return (
        // <Grid>
        <>
        <Typography variant="h5" align="left" className="fw-bold">Headliners</Typography>
            <Grid container>
                <Grid item xs={12} sm={6} lg={5} style={{
                    height: "min(23vh, 200px)"
                }}>
                        <CardMedia
                            component="img"
                            height="100%"
                            image="https://www.rollingstone.com/wp-content/uploads/2019/09/frank-ocean-next-album-lie.jpg"
                            alt="loading..."
                        />
                </Grid>
                <Grid item xs={12} sm={6} lg={7}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', textAlign: "left" }}>
                        <CardContent sx={{ flex: '1 0 auto' }}>
                            <Typography component="div" variant="h5">
                                Frank Ocean
                            </Typography>
                        </CardContent>
                        {/* <Box>
                            {props.events && props.events.length > 0 &&
                                <Typography variant="subtitle1" component="div">
                                    Upcoming Events ({props.events.length})
                                </Typography>
                            }
                        </Box> */}
                    </Box>
                </Grid>
            </Grid>
            </>
        // </Grid>
    );

}