import React from "react";
import PropTypes from "prop-types";
import '../index.css';

import polaroid_styles from "../Styles/polaroid_styles";

/* 
expected props:
    - imageURL: string
    - link (optional): string (if not provided, the polaroid will not be clickable
*/
const Polaroid = (props) => {
    return (
        <div onClick={props.onPress} style={polaroid_styles.polaroid_container} >
            <img src={props.imageURL} class="d-block w-100" style={polaroid_styles.polaroid_image} alt="..." />
        </div>
    )
}

export { Polaroid };

Polaroid.propTypes = {
    onPress: PropTypes.func,
    imageURL: PropTypes.string,
    link: PropTypes.string
};