// New sidebar component for artist page
import React from "react";
import PropTypes from "prop-types";
import "../index.css";
import UpcomingSchedule from "./UpcomingSchedule";
import VenueUpcomingSchedule from "./VenueUpcomingSchedule";
import ExternalLink from "./ExternalLink";
import { Box } from "@mui/system";

import artist_styles from "../Styles/artist_styles";
import FestivalUpcomingSchedule from "./FestivalUpcomingSchedule";
import WriteReviewButton from "./WriteReviewButton";
const sidebar_styles = artist_styles.sidebar;

/*
Props:
    name: venue or artist name
    linkPairs [][2]: array of pairs, link and icon link
    festival: bool, true if festival
    venue: bool, true if venue
*/

const SideContent = ({name, linkPairs, venue, festival}) => {
    if(venue)
    {
       // console.log("yes");
    }
    else
    {
       // console.log("no");
    }
    return (
        <div style={{ position: "sticky", top: "15px" }}>
            <Box sx={sidebar_styles.box}>
                <WriteReviewButton />
                {linkPairs && 
                <div style={sidebar_styles.icon_container}>
                    {
                            linkPairs.map((pair) => {
                                    return <ExternalLink mediaLink={pair[0]} iconLink={pair[1]} />
                            
                        })
                    }
                </div> }
                {festival && <FestivalUpcomingSchedule name={name} />}
                {venue && <VenueUpcomingSchedule name={name} />}
                {!venue && !festival && <UpcomingSchedule name={name} />}
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