import React from "react";
import { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import ProgressWithLabel from "./ProgressWithLabel";
import { Grid } from "@mui/material";
import Rating from "@mui/material/Rating";
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import artist_styles from "../Styles/artist_styles";



const ReviewSummary = ({ allReviews }) => {
    const [reviewValueArray, setReviewValueArray] = useState([0, 0, 0, 0, 0, 0]);
    const [TotalReviews, setTotalReviews] = useState(0);
    const [aggregateRating, setAggregateRating] = useState(0);

    useEffect(() => {
        let tempArray = [0, 0, 0, 0, 0, 0];
        let tempTotal = 0;
        allReviews.forEach((review) => {
            // index 1 is the rating
            tempArray[review.rating]++;
            tempTotal++;
        });
        setTotalReviews(tempTotal);
        setReviewValueArray(tempArray);
        setAggregateRating((tempArray[1] + tempArray[2] * 2 + tempArray[3] * 3 + tempArray[4] * 4 + tempArray[5] * 5) / tempTotal);
    }, [allReviews]);

    return (
        <Grid container spacing={1} >
            <Grid item xs={12} md={4} style={artist_styles.review_display.summary.leftContainer}>
                <h4 style={{ textAlign: "start" }}>
                    Overall Rating
                </h4>
                <Rating
                    name="text-feedback"
                    value={aggregateRating}
                    size="large"
                    readOnly
                    precision={0.1}
                    emptyIcon={<StarBorderOutlinedIcon style={{ opacity: 1 }} fontSize="inherit" />}
                    style={artist_styles.review_display.summary.starBox}
                />
                <Typography variant="body2" color="text.secondary" textAlign={"start"}>
                    {TotalReviews} {TotalReviews === 1 ? "review" : "reviews"}
                </Typography>
            </Grid>
            <Grid item xs={12} md={8}>
                <ReviewProgressBars ReviewValueArray={reviewValueArray} TotalReviews={TotalReviews} />
            </Grid>
        </Grid>

    )
}

/*
ReviewValueArray: []
    ReviewValueArray[0] = not used
    ReviewValueArray[1] = # of 1 star reviews
    ReviewValueArray[2] = # of 2 star reviews
    ReviewValueArray[3] = # of 3 star reviews
    ReviewValueArray[4] = # of 4 star reviews
    ReviewValueArray[5] = # of 5 star reviews
TotalReviews: # of reviews total
*/
const ReviewProgressBars = ({ ReviewValueArray, TotalReviews }) => {
    return (
        <Box style={artist_styles.review_display.summary.barContainer}>
            {
                [5, 4, 3, 2, 1].map((star) => {
                    return (
                        <Grid container spacing={0} style={{ marginBottom: 7 }}>
                            <Grid item xs={2}>
                                <Typography variant="body2" color="text.secondary">
                                    {star} star{star > 1 ? "s" : " "}
                                </Typography>
                            </Grid>
                            <Grid item xs={10}>
                                <ProgressWithLabel
                                    percent={Math.round((ReviewValueArray[star] ? ReviewValueArray[star] : 0) / (TotalReviews ? TotalReviews : 1) * 100)}
                                />
                            </Grid>
                        </Grid>
                    )
                })
            }
        </Box>
    )
}

export default ReviewSummary;