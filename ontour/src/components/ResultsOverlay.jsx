import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import { Alert, Grid, Typography } from '@mui/material';
import ResultsCard from './ResultsCard';
import common_styles from '../Styles/common_styles';
const window_breakpoints = common_styles.window_breakpoints;

const ResultsOverlay = (props) => {
    const [state, setState] = React.useState({
        top: false,
        results: true,
        bottom: false,
        right: false,
    });
    console.log(props.ratings);

    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setState({ ...state, [anchor]: open });
    };


    const list = (anchor) => (
        <Box
            sx={{
                width: window.innerWidth < window_breakpoints.md ? "100vw" : "60vw",
                padding: "0 20px 0 20px"
            }}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <Alert severity='warning' style={{ marginTop: "20px" }}> This feature is still in development. </Alert>
            <Grid container spacing={1}>
                <Grid item xs={12}>
                    <Typography variant="h4" align="center" style={{ marginTop: "20px" }}>
                        Artists:
                    </Typography>
                </Grid>
                {Object.keys(props.artistList).map((artistName) => {
                    return (
                        <Grid item xs={12} xxl={6}>
                            <ResultsCard
                            
                                link={"/artist?artist=" + props.name + "&id=" + props.artistList[artistName].artistID}
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
                        <Grid item xs={12} xxl={6} >
                            <ResultsCard
                                link={"/venue?venue=" + props.name + "&id=" + props.venueList[venueName].venueID}
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
        </Box>
    );

    return (
        <div>
            {['results'].map((anchor) => (
                <React.Fragment key={anchor}>
                    <Button onClick={toggleDrawer(anchor, true)} sx={{ color: "black" }}>{anchor}</Button>
                    <Drawer
                        anchor={anchor}
                        open={state[anchor]}
                        onClose={toggleDrawer(anchor, false)}
                    >
                        {list(anchor)}
                    </Drawer>
                </React.Fragment>
            ))}
        </div>
    );
}

export default ResultsOverlay;