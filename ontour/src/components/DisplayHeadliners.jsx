import React from "react";
import PropTypes from "prop-types";
import '../index.css';
import { Typography, Grid } from "@mui/material";
import { Chip } from "@mui/material";

const DisplayHeadliners = (props) => {
    console.log("DisplayHeadliners props: ", props);
    return (
        <div
            style={{
                borderRadius: "10px",
                padding: "10px 13px 10px 13px",
                backgroundColor: "#f5f5f5",
                boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.2)",
                "&:hover": {
                    boxShadow: "0px 0px 10px 0px rgba(0,0,0,1)",
                },
                marginBottom: "14px"
            }}
        >
            <Typography variant="h5" align="left" className="fw-bold">Artists playing in 2023</Typography>
            {
                props.headliners.length !== 0 &&
                <>
                    <Typography variant="subtitle1" align="left" className="fw-bold">Headliners</Typography>
                    <Grid container direction="row" spacing={1}
                        style={{
                            marginTop: "5px",
                            width: "100%",
                            marginBottom: "5px"
                        }}
                    >
                        {props.headliners.map((headliner) => (
                            <Chip
                                key={headliner}
                                label={headliner}
                                variant="outlined"
                            />))
                        }
                    </Grid>
                </>
            }
            {
                props.standardActs.length > 0 &&
                <>
                    <Typography variant="subtitle1" align="left" className="fw-bold">Supporting Acts</Typography>
                    <Grid container direction="row" spacing={1}
                        style={{
                            marginTop: "5px",
                            width: "100%",
                            marginBottom: "5px"
                        }}
                    >
                        {props.standardActs.map((supporting, index) => {
                            if (index < 15) {
                                return (
                                    <Chip
                                        key={supporting}
                                        label={supporting}
                                        variant="outlined"
                                    />
                                )
                            }
                        })}
                    </Grid>
                </>
            }
        </div>
    )
}

export default DisplayHeadliners;

DisplayHeadliners.propTypes = {
    headliners: PropTypes.arrayOf(PropTypes.string),
    standardActs: PropTypes.arrayOf(PropTypes.string)
};