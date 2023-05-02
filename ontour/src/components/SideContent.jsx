// New sidebar component for artist page
import React from "react";
import PropTypes from "prop-types";
import "../index.css";
import UpcomingSchedule from "./UpcomingSchedule";
import VenueUpcomingSchedule from "./VenueUpcomingSchedule";
import ExternalLink from "./ExternalLink";
import { Grid } from "@mui/material";
import { Box } from "@mui/system";

import artist_styles from "../Styles/artist_styles";
import FestivalUpcomingSchedule from "./FestivalUpcomingSchedule";
import WriteReviewButton from "./WriteReviewButton";
const sidebar_styles = artist_styles.sidebar;

/*
Props:
    name: venue or artist name
    linkPairs [][2]: array of pairs, link and icon link
    festival: boolean, true if it is a festival
    venue: boolean, true if it is a venue
*/

const SideContent = (props) => {
    console.log("SideContent props: ", props);
    return (
        <div style={{ position: "sticky", top: "15px" }}>
            <Box sx={sidebar_styles.box}>
                <WriteReviewButton />
                {props.linkPairs && 
                <div style={sidebar_styles.icon_container}>
                    {
                        props.linkPairs.map((pair) => {
                            return <ExternalLink mediaLink={pair[0]} iconLink={pair[1]} />
                        })
                    }
                </div> }
                {props.festival && <FestivalUpcomingSchedule name={props.name} />}
                {props.venue && <VenueUpcomingSchedule name={props.name} />}
                {!props.venue && !props.festival && <UpcomingSchedule name={props.name} />}
            </Box>
        </div>
    );
}

export default SideContent;

SideContent.propTypes = {
    name: PropTypes.string.isRequired,
    linkPairs: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)),
    festival: PropTypes.bool,
    venue: PropTypes.bool
};