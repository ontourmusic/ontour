import React from "react";
import PropTypes from "prop-types";
import '../index.css';

export default function ExternalLink(props) {
    if (!props.mediaLink || props.mediaLink === "") {
        return (
            <div className="social-media-icon disabled-link">
                <img src={props.iconLink} alt="link" />
                <div className="overlay">
                    {/* <span className="cross-symbol">X</span> */}
                </div>
            </div>
        );
    } else {
        return (
            <a href={props.mediaLink} className="social-media-icon" target="_blank" rel="noopener noreferrer">
                <img src={props.iconLink} alt="link" />
            </a>
        );
    }
}

ExternalLink.propTypes = {
    mediaLink: PropTypes.string,
    iconLink: PropTypes.string
};