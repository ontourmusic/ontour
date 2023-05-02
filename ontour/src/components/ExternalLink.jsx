import React from "react";
import PropTypes from "prop-types";
import '../index.css';
export default function ExternalLink(props) {
    return (
        <a href={props.mediaLink} class="social-media-icon" target="_blank" rel="noopener noreferrer">
            <img src={props.iconLink} alt="link" />
        </a>
    )
}

ExternalLink.propTypes = {
    mediaLink: PropTypes.string,
    iconLink: PropTypes.string
};

