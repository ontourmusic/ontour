import React from "react";
import { Card, CardContent, CardMedia, Typography, Box, Rating, Grid} from "@mui/material";
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
    console.log("ResultsCard.jsx", props);
    console.log(props.rating + " " + props.name);
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
                        height="100%"
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
                                name="text-feedback"
                                value={props.rating ? props.rating : 0}
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