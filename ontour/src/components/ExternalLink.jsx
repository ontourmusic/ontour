import React from "react";
import PropTypes from "prop-types";
import '../index.css';
import mixpanel from "mixpanel-browser";

export default function ExternalLink(props) {
    function handleClick() {
        let x = props.iconLink
        console.log("clicked",props.mediaLink,props.iconLink);
        console.log("clicked",x.substring(x.indexOf('/')+1,x.indexOf('.', x.indexOf('/'))));
        mixpanel.track("social_media_icon_clicked", {
            "platform_type":x.substring(x.indexOf('/')+1,x.indexOf('.', x.indexOf('/'))),
            "entity_name":props.name,
            "entity_type":(props.venue && "venue" || props.festival && "festival" || props.artist && "artist"),
            "entity_id": props.venueId || props.artistId || props.festivalId
        })
    }
    if (!props.mediaLink || props.mediaLink=="") {
        return (
            <div onClick={handleClick} href={props.mediaLink} class="social-media-icon" id="grayMedia" target="_blank" rel="noopener noreferrer">
                <img  src={props.iconLink} alt="link"  />
                
            </div>
        )
    }
    else {
        return (
            <a onClick={handleClick}  class="social-media-icon" target="_blank" rel="noopener noreferrer">
                <img src={props.iconLink} alt="link" />
            </a>
        )
    }

}

ExternalLink.propTypes = {
    mediaLink: PropTypes.string,
    iconLink: PropTypes.string
};

