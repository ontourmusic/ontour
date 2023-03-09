import React from "react";
import { useState, useEffect } from "react";
import { Box } from "@mui/material";
import ProgressWithLabel from "./ProgressWithLabel";
import { Grid } from "@mui/material";
import Rating from "@mui/material/Rating";
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';



const ReviewSummary = ({ allReviews }) => {
    const [reviewValueArray, setReviewValueArray] = useState([0, 0, 0, 0, 0, 0]);
    const [TotalReviews, setTotalReviews] = useState(0);
    const [aggregateRating, setAggregateRating] = useState(0);

    useEffect(() => {
        let tempArray = [0, 0, 0, 0, 0, 0];
        let tempTotal = 0;
        allReviews.forEach((review) => {
            // index 1 is the rating
            tempArray[review[1]]++;
            tempTotal++;
        });
        setTotalReviews(tempTotal);
        setReviewValueArray(tempArray);
        setAggregateRating((tempArray[1] + tempArray[2] * 2 + tempArray[3] * 3 + tempArray[4] * 4 + tempArray[5] * 5) / tempTotal);
    }, [allReviews]);
    const gridTesting = true;
    if (gridTesting) {
        return (
            <Grid container spacing={1} style={{marginBottom: 10}}>
                <Grid item xs={12} md={6}>
                    <div class="rating fw-bold">
                        Overall Rating: {aggregateRating.toFixed(1)}
                    </div>
                    <div class="rating">
                        <Rating
                            name="text-feedback"
                            value={aggregateRating}
                            size="large"
                            readOnly
                            precision={0.1}
                            emptyIcon={<StarBorderOutlinedIcon style={{ opacity: 1 }} fontSize="inherit" />}
                        />
                    </div>
                </Grid>
                <Grid item xs={12} md={6}>
                    <ReviewProgressBars ReviewValueArray={reviewValueArray} TotalReviews={TotalReviews} />
                </Grid>
            </Grid>

        )
    }
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
        <>
            {
                [5, 4, 3, 2, 1].map((star) => {
                    return (
                        <ProgressWithLabel percent={Math.round((ReviewValueArray[star] ? ReviewValueArray[star] : 0) / (TotalReviews ? TotalReviews : 1) * 100)} />
                    )
                })
            }
        </>
    )
}

export default ReviewSummary;