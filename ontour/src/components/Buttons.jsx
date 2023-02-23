import React from "react";
import '../index.css';
import Button from '@mui/material/Button';
import { CameraAlt } from "@mui/icons-material";

import button_style from "../Styles/button_styles";
const two_column_button_style = button_style.two_column_button;


const TwoColumnButton = (props) => {
    return (
        // <div class="d-flex w-100 justify-content-end pb-1">
        //     <button
        //         type="button"
        //         class="btn btn-outline-light fw-bold"
        //         onClick={props.onPress}
        //         style={ResponsiveButtonStyle.button}
        //     >
        //         <div class="row" style={ResponsiveButtonStyle.div}>
        //             {props.left}
        //             {props.right}
        //         </div>
        //     </button>
        // </div>
        <button style={two_column_button_style.container} onClick={props.onPress}>
            <div style={two_column_button_style.icon}> {props.left} </div>
            <div style={two_column_button_style.text}> {props.right} </div>
        </button>
    );
};

const AddMediaButton = (props) => {
    const handleButtonPress = () => {
        alert('Feature coming soon!');
    }
    return (
        <TwoColumnButton
            onPress={handleButtonPress}
            // left={<img id="camera-icon" style={ResponsiveButtonStyle.img} src="../../images/camera.png" alt=""></img>}
            left={<CameraAlt />}
            right={"Add Media"}
        />
        // <Button
        //     onClick={handleButtonPress}
        //     variant="outlined"
        //     size="small"
        //     startIcon={<CameraAlt />}
        // >
        //     Add Media
        // </Button>

    )
};

const HelpfulButton = (props) => {
    return (
        <div class="d-flex w-100 justify-content-start pb-1">
            <button onClick={props.onPress} style={{ backgroundColor: props.isActive ? '' : '#e7e8e8' }} id="helpful-button" type="button" class="btn btn-outline-light align-self-center">
                <div class="row">
                    <div class="col-1">
                        <img id="helpful-icon" src={props.isActive ? "../../images/helpful.png" : "../../images/helpful_selected.png"} alt=""></img>
                    </div>
                    <div id="helpful" class="col-1">
                        Helpful
                    </div>
                </div>
            </button>
        </div>
    )
}


const ResponsiveButtonStyle = {
    button: {
    },
    div: {
        flexWrap: "nowrap",
        width: "fit-content",
        alignItems: "center",
        justifyContent: "center"
    },
    img: {
        width: "3rem",
        height: "auto",

        objectFit: "contain",
        flexGrow: 1
    },
    text: {
        height: "100%",
        flexGrow: 2,
        fontSize: "0.9rem",
        width: "fit-content"
    },
};

export { TwoColumnButton, AddMediaButton, HelpfulButton };
