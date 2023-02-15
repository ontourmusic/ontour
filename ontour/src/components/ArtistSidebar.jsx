// New sidebar component for artist page
import React from "react";
import "../index.css";
import UpcomingSchedule from "./UpcomingSchedule";
import ExternalLink from "./ExternalLink";
import { Grid } from "@mui/material";
import { Box } from "@mui/system";

const ArtistSidebar = (props) => {

    // console.log(props.spotify);
    return (
        <div style={{ position: "sticky", top: "15px" }}>
            <Box sx={styles.Box}>
                <a href="#review">
                    <button id="writebutton" type="button" class="btn btn-dark fw-bold">
                        <div class="row">
                            <div class="col-md-3">
                                <img id="review-icon" src="../../images/review.png" alt=""></img>
                            </div>
                            <div id="write-a-review" class="d-none d-md-block col-md-9">
                                Write a Review
                            </div>
                        </div>
                    </button>
                </a>
                <div style={styles.IconContainer}>
                    <ExternalLink mediaLink={props.spotify} iconLink="images/spotify_icon.png" />
                    <ExternalLink mediaLink={props.tickets} iconLink="images/ticketmaster_icon.png" />
                </div>
                <UpcomingSchedule name={props.name} />
                {/* <a href="#">
            <img id="arrow" src="../../images/arrow.png" alt=""></img>
            </a> */}
            </Box>
        </div>
    );
}

const styles = {
    Box: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        // justifyContent: 'center',
        width: '100%',
        height: '100%',
        // paddingRight: '2vw',

        // position: sticky;
        // top: "0",
        // float: "right",
    },
    IconContainer: {
        display: 'flex',
        flexDirection: 'space-between',
    }
}

export default ArtistSidebar;