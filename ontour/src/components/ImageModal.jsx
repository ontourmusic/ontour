import React from "react";
import artist_styles from "../Styles/artist_styles";
import CommentBox from "./CommentBox";
import { Box, Grid, Modal } from "@mui/material";
import { useState, useEffect } from "react";
import { GetAverageColor, getTextColor, rgbToHex } from "./ColorFunctions";
const modal_styles = artist_styles.modal;


const ImageModal = (props) => {
    const [modalBackgroundColour, setModalBackgroundColour] = useState("white");
    const [imageBackgroundColour, setImageBackgroundColour] = useState("white");
    const [textColor, setTextColor] = useState("black");

    const handleAverageColorButton = (url) => {
        console.log("Average Color Button Clicked");
        // const averageColor = GetAverageColor(props.image);
        const imageUrl = "https://imagez.tmz.com/image/3a/4by3/2021/11/14/3a1b784d843e44bdbd609f17b17bee03_xl.jpg";
        GetAverageColor(url ? url : imageUrl)
            .then((averageColor) => {
                console.log("Average color:", averageColor)
                setModalBackgroundColour(`rgb(${averageColor.r}, ${averageColor.g}, ${averageColor.b})`);
                setImageBackgroundColour(`rgb(${averageColor.r + 45}, ${averageColor.g + 45}, ${averageColor.b + 45})`);
                setTextColor(getTextColor(rgbToHex(averageColor.r, averageColor.g, averageColor.b)));
            })
            .catch((error) => console.error("Error:", error));
    }
    useEffect(() => {
        handleAverageColorButton(props.image);
    }, []);

    return (
        <Modal
            open={true}
            onClose={props.handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <Grid container columnSpacing={1}
                sx={{
                    overflow: "scroll",
                    width: "min(1800px, 80vw)",
                    height: "min(1000px, 80vh)",
                    boxShadow: 24,
                    p: 4,
                    borderRadius: "10px",
                    background: `linear-gradient(110deg, ${modalBackgroundColour}, 70%, ${imageBackgroundColour})`,
                }}
            >
                <Grid item xs={12} md={8}
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        maxHeight: "100%",
                        borderRadius: "10px",
                    }}
                >
                    <img src={props.image} style={modal_styles.image} />
                </Grid>
                <Grid item xs={12} md={4}>
                    <CommentBox
                        textColor={textColor}
                        imageId={props.imageId}
                        isVenue={props.isVenue}
                    />
                </Grid>
            </Grid>
        </Modal>
    );
}

export default ImageModal;