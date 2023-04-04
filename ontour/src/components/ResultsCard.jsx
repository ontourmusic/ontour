import React, { useEffect } from "react";
import { Card, CardContent, CardMedia, Typography, Box, Rating, Grid, alpha } from "@mui/material";
import results_styles from "../Styles/results_styles";
import { useNavigate } from "react-router-dom";
import UpcomingSchedule from "./UpcomingSchedule";

/*
    link: string
    artistID={artistList[artistName].artistID}
    name={artistList[artistName].name}
    imageURL={artistList[artistName].imageURL}
    rating={ratings[artistName]}
    reviewCount={reviewCount[artistName]}
*/

const ResultsCard = (props) => {
    // const searchForEvents = async (name) => {
    //     let tmEvents;
    //     let tmEventData;
    //     if (name) {
    //         let newname = name.replace(" ", "%20");
    //         console.log(props.id);
    //         let id = props.id;
    //         let url = `https://app.ticketmaster.com/discovery/v2/events.json?apikey=NwphXHPsTvSzPp0XwvUNdp3vyzE3vEww&keyword=${newname}&sort=date,asc&size=5&classificationName=music`;
    //         console.log(url);
    //         tmEvents = await fetch(url);
    //         tmEventData = await tmEvents.json();
    //         console.log(tmEventData);
    //         // let events = [];
    //         // if (tmEventData.page.totalElements > 0) {
    //         //     for (let i = 0; i < tmEventData._embedded.events.length; i++) {
    //         //         if (events.length < 5) {
    //         //             let event = createEvent(tmEventData._embedded.events[i]);
    //         //             events.push(event);
    //         //         }
    //         //     }
    //         //     setEventArray(events);
    //         // }
    //     }
    //     return tmEventData;
    // }
    // useEffect(() => {
    //     searchForEvents(props.name);
    // }, []);

    // console.log("props:", props)
    const navigate = useNavigate();
    const handleClick = () => {
        // navigate to props.link
        if (props.link) {
            navigate(props.link);
        }
    };

    return (
        <Card sx={results_styles.ResultsCard.container} onClick={() => { handleClick() }}>
            <Grid container>

                <Grid item xs={12} sm={6} lg={5}>
                    <CardMedia
                        component="img"

                        image={props.imageURL}
                        alt="loading..."
                    />
                </Grid>
                <Grid item xs={12} sm={6} lg={7}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', textAlign: "left" }}>
                        <CardContent sx={{ flex: '1 0 auto' }}>
                            <Typography component="div" variant="h5">
                                {props.name}
                            </Typography>
                        </CardContent>
                        <Box sx={results_styles.ResultsCard.starBox}>
                            <Rating
                                name="read-only"
                                value={props.rating}
                                precision={0.1}
                                sx={{ fontSize: "2rem" }}
                                readOnly
                            />
                            <Typography
                                variant="subtitle1"
                                component="div"
                                sx={results_styles.ResultsCard.reviewCount}>
                                {props.reviewCount ? props.reviewCount : 0}
                            </Typography>
                        </Box>
                        <Box>
                            {props.events && props.events.length > 0 &&
                                <Typography variant="subtitle1" component="div">
                                    Upcoming Events ({props.events.length})
                                </Typography>
                            }
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </Card>
    )
}

export default ResultsCard