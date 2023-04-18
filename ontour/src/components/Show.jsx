import React from "react";
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
                        Tickets from <strong>{props.price}</strong>
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