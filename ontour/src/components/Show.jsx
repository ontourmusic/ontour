import React from "react";
import PropTypes from "prop-types";
import '../index.css';
import artist_styles from "../Styles/artist_styles";
import { Grid } from "@mui/material";

const show_styles = artist_styles.sidebar.upcomingShows;

const Show = (props) => {
    return (
        <Grid container
            columnSpacing={1}
            justifyContent={"center"}
            alignItems={"center"}
            sx={show_styles.rowContainer}
        >
            <Grid item xs={3}>
                <div class="fw-bold schedule-font">
                    {props.date}
                </div>
                <div class="schedule-subfont">
                    {props.time}
                </div>
            </Grid>
            <Grid item xs={8} style={show_styles.rightTextContainer}>
                <div class="fw-bold schedule-font">
                    {props.event}
                </div>
                {!props.isVenue &&
                    <>
                        <div class="schedule-subfont">
                            {props.venue} - {props.city}, {props.state}
                        </div>
                    </>
                }
                {props.price != -1 &&
                    <div class="schedule-subfont">
                        {props.price && <>Tickets from <strong>{props.price}</strong></>}
                    </div>
                }
            </Grid>
            <Grid item xs={1}>
                •
            </Grid>
        </Grid>
    )
}

export default Show;

/*
{
    "time": " ",
    "isVenue": true,
    "date": "Sun, Jul 16",
    "event": "Concacaf Gold Cup Final",
    "price": "$90.00"
}
*/
Show.propTypes = {
    time: PropTypes.string,
    isVenue: PropTypes.bool,
    date: PropTypes.string.isRequired,
    event: PropTypes.string.isRequired,
    price: PropTypes.string,
    venue: PropTypes.string,
    city: PropTypes.string,
    state: PropTypes.string,
};
