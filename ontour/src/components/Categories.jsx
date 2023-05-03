import {CardContent, Grid, Typography, Button } from "@mui/material";
import React from "react";
// import Grid from "react-loading-icons/dist/esm/components/grid";
import category_styles from "../Styles/category_styles";

import dancingIcon from "../icons/icons8-dancing-100.png";
import frequencyIcon from "../icons/icons8-frequency-100.png";
import mandolinIcon from "../icons/icons8-mandolin-100.png";
import microphoneIcon from "../icons/icons8-micro-100.png";
import musicIcon from "../icons/icons8-music-100.png";
import musicRecordIcon from "../icons/icons8-music-record-100.png";
import rockIcon from "../icons/icons8-rock-music-100.png";
import tractorIcon from "../icons/icons8-tractor-100.png";
import { useNavigate } from "react-router";



const Categories = () => {
    // this should be a api call later
    // Testing: Rock, Pop, EDM, Hip Hop, Folk, Country, R&B, Jazz
    const fontawesome_categories = [
        {
            name: "Rock",
            asset: "fa-thin fa-guitar-electric",
            link: "Rock"
        },
        {
            name: "Pop",
            asset: "fa-microphone-stand",
            link: "Pop"
        },
        {
            name: "EDM",
            asset: "fa-compact-disc",
            link: "EDM"
        },
        {
            name: "Hip Hop",
            asset: "fa-boombox",
            link: "Hip Hop"
        },
        {
            name: "Folk",
            asset: "fa-guitar",
            link: "Folk"
        },
        {
            name: "Country",
            asset: "fa-hat-cowboy-side",
            link: "Country"
        },
        {
            name: "R&B",
            asset: "fa-music",
            link: "R&B"
        },
        {
            name: "Jazz",
            asset: "fa-saxophone-fire",
            link: "Jazz"
        }
    ]
    const categories = [
        {
            name: "Rock",
            asset: rockIcon,
            link: "Rock"
        },
        {
            name: "Pop",
            asset: microphoneIcon,
            link: "Pop"
        },
        {
            name: "EDM",
            asset: musicRecordIcon,
            link: "EDM"
        },
        {
            name: "Hip Hop",
            asset: frequencyIcon,
            link: "Hip Hop"
        },
        {
            name: "Folk",
            asset: mandolinIcon,
            link: "Folk"
        },
        {
            name: "Country",
            asset: tractorIcon,
            link: "Country"
        },
        {
            name: "R&B",
            asset: musicIcon,
            link: "R&B"
        },
        {
            name: "Jazz",
            asset: dancingIcon,
            link: "Jazz"
        }
    ]
    const navigate = useNavigate();
    const handleCategoryClick = (category) => {
        // console.log("category clicked: ", category);
        navigate(`/results?search=${category}`)
    };
    // const iconType = "fa-thin";
    return (
        <Grid container spacing={2.5}>
            <Grid item xs={12}>
                <Typography variant="h4" style={category_styles.text}>
                    Explore new music
                </Typography>
            </Grid>
            {categories.map((category) => {
                return (
                    <Grid item xs={6} md={3}>
                        {/* <Card variant="outlined" style={category_styles.container}>
                            <CardContent>
                                <img style={category_styles.icon} src={category.asset} />
                                <Typography variant="h6" style={category_styles.text}>
                                    {category.name}
                                </Typography>
                            </CardContent>
                        </Card> */}
                        <Button variant="contained" style={category_styles.container} onClick={() => {handleCategoryClick(category.name)}}>
                            <CardContent>
                                <img style={category_styles.icon} src={category.asset} />
                                <Typography variant="h6" style={category_styles.iconText}>
                                    {category.name}
                                </Typography>
                            </CardContent>
                        </Button>

                    </Grid>
                )
            }
            )}
        </Grid>
    )
}

export default Categories;