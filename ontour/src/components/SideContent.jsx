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


const SideContent = (props) => {
  if (props.venue) {
    // console.log("yes");
  } else {
    // console.log("no");
  }
  return (
    <div style={{ position: "sticky", top: "15px" }}>
      <Box sx={sidebar_styles.box}>
        <WriteReviewButton venueId={props.venueId}
                  festivalId={props.festivalId}
                  artistID={props.artistID}
                  name={props.name}
                  venue={props.venue}
                  festival={props.festival}
                  artist={props.artist} />


        {props.linkPairs && (
          <div style={sidebar_styles.icon_container}>
            {props.linkPairs.map((pair) => {
              return (
                <ExternalLink
                  venueId={props.venueId}
                  festivalId={props.festivalId}
                  artistID={props.artistID}
                  name={props.name}
                  venue={props.venue}
                  festival={props.festival}
                  artist={props.artist}
                  mediaLink={pair[0]}
                  iconLink={pair[1]}
                />
              );
            })}
          </div>
        )}

        {props.festival && (
          <FestivalUpcomingSchedule
            venueId={props.venueId}
            festivalId={props.festivalId}
            artistID={props.artistID}
            name={props.name}
            venue={props.venue}
            festival={props.festival}
            artist={props.artist}
          />
        )}
        {props.venue && (
          <VenueUpcomingSchedule
            venueId={props.venueId}
            festivalId={props.festivalId}
            artistID={props.artistID}
            name={props.name}
            venue={props.venue}
            festival={props.festival}
            artist={props.artist}
          />
        )}
        {!props.venue && !props.festival && (
          <UpcomingSchedule venueId={props.venueId}
          festivalId={props.festivalId}
          artistID={props.artistID}
          
          venue={props.venue}
          festival={props.festival}
          artist={props.artist} name={props.name} />
        )}
      </Box>
    </div>
  );
};

export default SideContent;

SideContent.propTypes = {
  name: PropTypes.string.isRequired,
  linkPairs: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)),
  festival: PropTypes.bool,
  venue: PropTypes.bool,
};
