import React from "react";
import { Card, CardContent, CardMedia, Typography, Box, Rating, Grid, alpha } from "@mui/material";
import results_styles from "../Styles/results_styles";
import { useNavigate } from "react-router-dom";

/*
    link: string
    artistID={artistList[artistName].artistID}
    name={artistList[artistName].name}
    imageURL={artistList[artistName].imageURL}
    rating={ratings[artistName]}
    reviewCount={reviewCount[artistName]}
*/

const ResultsCard = (props) => {
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
                <Grid item xs={12} sm={6}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', textAlign: "left" }}>
                        <CardContent sx={{ flex: '1 0 auto' }}>
                            <Typography component="div" variant="h4">
                                {props.name}
                            </Typography>
                            {/* <Typography variant="subtitle1" color="text.secondary" component="div">
                            Mac Miller
                        </Typography> */}
                        </CardContent>
                        <Box sx={results_styles.ResultsCard.starBox}>
                            <Rating
                                name="read-only"
                                value={props.rating}
                                precision={0.1}
                                // size="medium"
                                sx={{ fontSize: "2rem" }}
                                readOnly
                            />
                            <Typography
                                variant="subtitle1"
                                component="div"
                                sx={results_styles.ResultsCard.reviewCount}>
                                {props.reviewCount ? props.reviewCount : 0} reviews
                            </Typography>
                        </Box>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <CardMedia
                        component="img"
                        height="100%"

                        image={props.imageURL}
                        alt="loading..."
                    />
                </Grid>
            </Grid>
        </Card>
    )
}

export default ResultsCard