import React from "react";
import PropTypes from "prop-types";

const ImageSlide = ({ onPress, link, imageUrl }) => {
    return (
        <div onClick={onPress} style={{
            height: "100%",
            objectFit: "cover",
        }}>
            <img
                src={imageUrl}
                style={{
                    height: "100%",
                    width: "100%",
                }}
                alt="..."
            />
        </div>
    );
}

export default ImageSlide;

ImageSlide.propTypes = {
    onPress: PropTypes.func,
    link: PropTypes.string,
    imageUrl: PropTypes.string
};