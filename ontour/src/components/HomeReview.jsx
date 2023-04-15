import React from 'react';
import { Grid } from '@mui/material';
import Rating from '@mui/material/Rating';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import home_styles from '../Styles/home_styles';


/*
props:
    text: string
    rating: number
    subText: string
*/
const HomeReview = (props) => {
    return (
        <div style={home_styles.review.container}>
            <p style={home_styles.review.text}>
                {props.text}
            </p>
            <Grid container spacing={1} alignItems="center" justifyContent="center">
                <Grid item xs="auto">
                    <Rating
                        value={props.rating}
                        style={{ fontSize: "2em" }}
                        readOnly
                        precision={0.1}
                        emptyIcon={<StarBorderOutlinedIcon style={{ opacity: 1, color: "white" }} fontSize="inherit" />}
                    />
                </Grid>
                <Grid item xs="auto" style={{ width: "fit-content" }}>
                    <div style={{ overflowWrap: "break-word", textAlign: "center" }}>
                        {props.subText}
                    </div>
                </Grid>
            </Grid>
        </div>
    );
}

export default HomeReview;