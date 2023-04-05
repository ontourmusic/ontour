import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import { Alert, Grid, Typography } from '@mui/material';
import ResultsCard from './ResultsCard';
import common_styles from '../Styles/common_styles';
import ResultsListContent from './ResultsListContent';
const window_breakpoints = common_styles.window_breakpoints;

const ResultsOverlay = (props) => {
    const [state, setState] = React.useState({
        results: false,
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
            <ResultsListContent
                artistList={props.artistList}
                ratings={props.ratings}
                reviewCount={props.reviewCount}
                artistIDs={props.artistIDs}
                venueList={props.venueList}
                venueRatings={props.venueRatings}
                venueReviewCount={props.venueReviewCount}
            />
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