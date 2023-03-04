import React from "react";
import { Box } from "@mui/material";
import ProgressWithLabel from "./ProgressWithLabel";


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
const ReviewSummary = ({ReviewValueArray, TotalReviews}) => {
    return (
        <Box>
            {
                [1,2,3,4,5].map((star) => {
                    return (
                        <ProgressWithLabel percent={Math.round(ReviewValueArray[star]/TotalReviews*100)} />
                    )
                })
            }
        </Box>
    )
}

export default ReviewSummary;