import React from "react";
import '../index.css';
import { Card, CardMedia, CardContent } from '@mui/material';

import polaroid_styles from "../Styles/polaroid_styles";

/* 
expected props:
    - imageURL: string
    - link (optional): string (if not provided, the polaroid will not be clickable
    - bottomComponent (optional): JSX.Element
*/
const Polaroid = (props) => {
    // NEW
    // return (
    //     <Card onClick={props.onPress} style={polaroid_styles.polaroid_background} >
    //         <CardMedia
    //             component="img"
    //             height="194"
    //             image={props.imageURL}
    //             alt="..."
    //         />
    //         <CardContent>
    //             {props.bottomComponent}
    //         </CardContent>
    //     </Card>
    // )

    // OLD
    return (
        <div onClick={props.onPress} style={polaroid_styles.polaroid_container} >
            <a href={props.link} >
                <div class="card" style={polaroid_styles.polaroid_background}>
                    <img src={props.imageURL} class="d-block w-100" style={polaroid_styles.polaroid_image} alt="..." />
                    <div class="card-body">
                        {props.bottomComponent}
                    </div>
                </div>
            </a>
        </div>
    )
}

export { Polaroid };