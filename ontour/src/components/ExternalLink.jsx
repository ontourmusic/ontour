import React from "react";
import '../index.css';
export default function ExternalLink(props)
{
    return (
        <a href={props.mediaLink} class = "social-media-icon" target="_blank" rel="noopener noreferrer">
            <img src= {props.iconLink} alt="spotify"/>
        </a>
    )
}