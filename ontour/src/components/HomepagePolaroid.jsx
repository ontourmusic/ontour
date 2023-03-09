import React from "react";
import '../index.css';

import polaroid_styles from "../Styles/polaroid_styles";

/* 
expected props:
    - imageURL: string
    - link (optional): string (if not provided, the polaroid will not be clickable
    - bottomComponent (optional): JSX.Element
*/
const HomepagePolaroid = (props) => {
    return (
        <div class="col-12 p-4" onClick={props.onPress} >
            <a href={props.link} >
                <div class="card p-1" style={polaroid_styles.polaroid_background}>
                    <img src={props.imageURL} class="card-img-top" style={polaroid_styles.polaroid_image_inner} alt="..." />
                    <div class="card-body">
                        {props.bottomComponent}
                    </div>
                </div>
            </a>
        </div>
    )
}

export { HomepagePolaroid };