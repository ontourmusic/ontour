import React from "react";
import '../index.css';
import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardMedia, Typography, Box, Rating, Grid, alpha } from "@mui/material";
import results_styles from "../Styles/results_styles";
import { Stack, Chip } from "@mui/material";

export default function DisplayHeadliners(props) {
    console.log("DisplayHeadliners props: ", props);
    const chipTesting = true;
    if (chipTesting) {
        return (
            <div
                style={{
                    borderRadius: "10px",
                    padding: "10px 13px 10px 13px",
                    backgroundColor: "#f5f5f5",
                    boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.2)",
                    "&:hover": {
                        boxShadow: "0px 0px 10px 0px rgba(0,0,0,1)",
                    },
                    marginBottom: "14px"
                }}
            >
                <Typography variant="h5" align="left" className="fw-bold">Artists playing in 2023</Typography>
                <Typography variant="subtitle1" align="left" className="fw-bold">Headliners</Typography>
                <Grid container direction="row" spacing={1}
                    style={{
                        marginTop: "5px",
                        width: "100%",
                        marginBottom: "5px"
                    }}
                >
                    {props.headliners.map((headliner) => (
                        <Chip
                            key={headliner}
                            label={headliner}
                            variant="outlined"
                        />))
                    }
                </Grid>
                <Typography variant="subtitle1" align="left" className="fw-bold">Supporting Acts</Typography>
                <Grid container direction="row" spacing={1}
                    style={{
                        marginTop: "5px",
                        width: "100%",
                        marginBottom: "5px"
                    }}
                >
                    {props.standardActs.map((supporting, index) => {
                        if (index < 15) {
                            return (
                                <Chip
                                    key={supporting}
                                    label={supporting}
                                    variant="outlined"
                                />
                            )
                        }
                    })}
                </Grid>
            </div>
        )
    }
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