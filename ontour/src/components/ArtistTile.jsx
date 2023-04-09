import React from "react";

export default function ArtistTile(props){
    return (
    <div>
        <img style={styles.Image} src={props.imageURL} alt="" />
    </div>
    )
}

const styles = {
    Container: {
        
    },
    Image: {
        width: "100%",
        height: "100%",
        objectFit: "cover",
    },
}