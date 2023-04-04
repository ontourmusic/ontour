import React from "react";
import { Alert, Grid, Typography } from "@mui/material";
import ResultsCard from "./ResultsCard";

/*
artistList={props.artistList}
ratings={props.ratings}
reviewCount={props.reviewCount}
artistIDs={props.artistIDs}
venueList={props.venueList}
venueRatings={props.venueRatings}
venueReviewCount={props.venueReviewCount}
*/
const ResultsListContent = (props) => {
    return (
        <>
            {/* <Alert severity='warning' style={{ marginTop: "20px" }}> This feature is still in development. </Alert> */}
            <Grid container spacing={1}>
                <Grid item xs={12}>
                    <Typography variant="h4" align="center" style={{ marginTop: "20px" }}>
                        Artists:
                    </Typography>
                </Grid>
                {Object.keys(props.artistList).map((artistName) => {
                    return (
                        <Grid item xs={12} lg={6}>
                            <ResultsCard

                                link={"/artist?artist=" + artistName + "&id=" + props.artistList[artistName].artistID}
                                artistID={props.artistList[artistName].artistID}
                                name={props.artistList[artistName].name}
                                imageURL={props.artistList[artistName].imageURL}
                                rating={props.ratings[artistName]}
                                reviewCount={props.reviewCount[artistName]}
                            // events={searchForEvents(artistName)}
                            />
                        </Grid>
                    )
                })}
                <Grid item xs={12}>
                    <Typography variant="h4" align="center" style={{ marginTop: "20px" }}>
                        Venues:
                    </Typography>
                </Grid>
                {Object.keys(props.venueList).map((venueName) => {
                    return (
                        <Grid item xs={12} lg={6} >
                            <ResultsCard
                                link={"/venue?venue=" + venueName + "&id=" + props.venueList[venueName].venueID}
                                venueID={props.venueList[venueName].venueID}
                                name={props.venueList[venueName].name}
                                imageURL={props.venueList[venueName].imageURL}
                                rating={props.venueRatings[venueName]}
                                reviewCount={props.venueReviewCount[venueName]}
                            />
                        </Grid>
                    )
                })}
            </Grid>
        </>
    )
}

export default ResultsListContent;