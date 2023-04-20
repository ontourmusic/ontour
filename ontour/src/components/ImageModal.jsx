import React from "react";
import artist_styles from "../Styles/artist_styles";
import CommentBox from "./CommentBox";
import { Grid, Modal, IconButton } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { useState, useEffect } from "react";
import { GetAverageColor, getTextColor, rgbToHex } from "./ColorFunctions";
const modal_styles = artist_styles.modal;


const ImageModal = (props) => {
    const [modalBackgroundColour, setModalBackgroundColour] = useState("white");
    const [imageBackgroundColour, setImageBackgroundColour] = useState("white");
    const [textColor, setTextColor] = useState("black");

    const handleAverageColorButton = (url) => {
        console.log("Average Color Button Clicked");
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
            style={modal_styles.container}
        >
            <Grid container columnSpacing={0} rowSpacing={{xs: 1, md: 0}}
                sx={{
                    ...modal_styles.gridContainer,
                    p: { xs: 1, md: 2, lg: 3 },
                    background: `linear-gradient(110deg, ${modalBackgroundColour}, 70%, ${imageBackgroundColour})`,
                    "&:focus": {
                        outline: "none",
                    },
                }}
            >
                <Grid item xs={12} md={8} style={modal_styles.imageContainer}>
                    <img src={props.image} style={modal_styles.image} />
                </Grid>
                <Grid item xs={12} md={4}
                    sx={{
                        paddingLeft: { xs: "0px", md: "10px" },
                    }}
                >
                    <CommentBox
                        textColor={textColor}
                        imageData={props.imageData}
                        isVenue={props.isVenue}
                    />
                </Grid>
            </Grid>
        </Modal>
    );
}

export default ImageModal;