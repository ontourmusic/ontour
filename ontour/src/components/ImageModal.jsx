import React from "react";
import artist_styles from "../Styles/artist_styles";
import CommentBox from "./CommentBox";
import { Box, Grid, Modal } from "@mui/material";
import { useState, useEffect } from "react";
const modal_styles = artist_styles.modal;


const ImageModal = (props) => {
    const [modalBackgroundColour, setModalBackgroundColour] = useState("white");

    const handleAverageColorButton = (url) => {
        console.log("Average Color Button Clicked");
        // const averageColor = GetAverageColor(props.image);
        const imageUrl = "https://imagez.tmz.com/image/3a/4by3/2021/11/14/3a1b784d843e44bdbd609f17b17bee03_xl.jpg";
        GetAverageColor(url ? url : imageUrl)
            .then((averageColor) => {
                console.log("Average color:", averageColor)
                setModalBackgroundColour(`rgb(${averageColor.r}, ${averageColor.g}, ${averageColor.b})`);
            })
            .catch((error) => console.error("Error:", error));
    }
    useEffect(() => {
        handleAverageColorButton(props.image);
    }, []);
    function GetAverageColor(url) {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.crossOrigin = "Anonymous";
            img.src = url;

            img.onload = () => {
                const canvas = document.createElement("canvas");
                const ctx = canvas.getContext("2d");
                canvas.width = img.width;
                canvas.height = img.height;
                ctx.drawImage(img, 0, 0, img.width, img.height);

                const imageData = ctx.getImageData(0, 0, img.width, img.height).data;
                let r = 0, g = 0, b = 0;
                const totalPixels = img.width * img.height;

                for (let i = 0; i < imageData.length; i += 4) {
                    if (!isBrownOrBlack(imageData[i], imageData[i + 1], imageData[i + 2])) {
                        r += imageData[i] * imageData[i];
                        g += imageData[i + 1] * imageData[i + 1];
                        b += imageData[i + 2] * imageData[i + 2];
                    }
                }

                // square root of each color
                r = Math.floor(Math.sqrt(r / totalPixels));
                g = Math.floor(Math.sqrt(g / totalPixels));
                b = Math.floor(Math.sqrt(b / totalPixels));

                resolve({ r, g, b });
            };

            img.onerror = () => {
                reject(new Error("Failed to load image"));
            };
        });
    }
    function rgbToHsl(r, g, b) {
        r /= 255;
        g /= 255;
        b /= 255;
        const max = Math.max(r, g, b), min = Math.min(r, g, b);
        let h, s, l = (max + min) / 2;

        if (max === min) {
            h = s = 0;
        } else {
            const d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
            switch (max) {
                case r: h = (g - b) / d + (g < b ? 6 : 0); break;
                case g: h = (b - r) / d + 2; break;
                case b: h = (r - g) / d + 4; break;
            }
            h /= 6;
        }

        return { h: h * 360, s: s * 100, l: l * 100 };
    }

    function isBrownOrBlack(r, g, b) {
        const hsl = rgbToHsl(r, g, b);
        const { h, s, l } = hsl;
        // Adjust the conditions below to fine-tune the color filtering
        return (h >= 20 && h <= 60 && s >= 20 && l <= 50) || l <= 15;
    }

    return (
        <Modal
            open={true}
            onClose={props.handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box
                // sx={modal_styles.container} 
                sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: "min(1800px, 80vw)",
                    height: "min(1000px, 80vh)",
                    // bgcolor: OnTourColors.palette.primary.main,
                    // border: "2px solid #000",
                    boxShadow: 24,
                    p: 4,
                    borderRadius: "10px",
                    backgroundColor: modalBackgroundColour,
                }}>
                <Grid container spacing={2} sx={{ height: "100%" }}>
                    <Grid item xs={12} md={8}>
                        <img src={props.image} style={modal_styles.image} />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <CommentBox imageId={props.imageId} isVenue={props.isVenue} />
                    </Grid>
                </Grid>
            </Box>
        </Modal>
    );
}

export default ImageModal;