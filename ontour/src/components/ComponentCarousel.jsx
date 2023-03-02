import React from "react";
import { useState, useEffect } from "react";
import { Grid } from "@mui/material";



/*
componentArray is an array of components
numToDisplay is the number of components to display at a time
uniformWidth is a boolean that determines whether the components are all the same width
*/
const ComponentCarousel = ({ componentArray, numToDisplay, uniformWidth }) => {
    const [displayStartIndex, setDisplayStartIndex] = useState(0);
    const [componentWidth, setComponentWidth] = useState(12);
    const [muiGridItemWidth, setMuiGridItemWidth] = useState(12);
    const [displayComponents, setDisplayComponents] = useState([]);

    useEffect(() => {
        if (uniformWidth) {
            const width = document.getElementById("component-carousel").clientWidth / (numToDisplay ? numToDisplay : 1);
            setComponentWidth(width);
            setMuiGridItemWidth(12 / (numToDisplay ? numToDisplay : 1));
            displayItems();
        }
    }, []);

    const displayItems = () => {
        console.log(`muiGridItemWidth: ${muiGridItemWidth} - numToDisplay: ${numToDisplay} - displayStartIndex: ${displayStartIndex}`);
        let temp_componentsToDisplay = componentArray.map((component, index) => {
            if (index >= displayStartIndex && index < displayStartIndex + numToDisplay) {
                return (
                    <Grid item xs={muiGridItemWidth}>
                        {component}
                    </Grid>
                );
            }
        });
        setDisplayComponents(temp_componentsToDisplay);
    }


    return (
        <Grid container id="component-carousel" >
            {displayComponents}
        </Grid>
    );
}

export default ComponentCarousel;