import React from "react";

const ImageSlide = ({ onPress, link, imageUrl }) => {
    return (
        <div onClick={onPress} style={{
            height: "100%",
            objectFit: "cover",
        }}>
            {/* <a href={link}> */}
            {/* <div className="card" style={polaroid_styles.polaroid_background}> */}
                <img
                    src={imageUrl}
                    style={{
                        height: "100%",
                        width: "100%",
                    }}
                    alt="..."
                />
            {/* </div> */}
            {/* </a> */}
        </div>
    );
}

export default ImageSlide;