import React from "react";
import '../index.css';
import Button from '@mui/material/Button';
import { CameraAlt } from "@mui/icons-material";

import button_style from "../Styles/button_styles";
import { padding } from "@mui/system";
import { createClient } from '@supabase/supabase-js'
const two_column_button_style = button_style.two_column_button;
const supabase = createClient('https://zouczoaamusrlkkuoppu.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpvdWN6b2FhbXVzcmxra3VvcHB1Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY3ODE1ODUyMSwiZXhwIjoxOTkzNzM0NTIxfQ.LTuL_u0tzmsj8Zf9m6JXN4JivwLq1aRXvU2YN-nDLCo');


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
    const artistID = props.artistID;
    const handleButtonPress = () => {
        alert('Feature coming soon!');
    }
    const handleImageUpload = async (event) => {
        const file = event.target.files[0];
        const blob = new Blob([file], { type: file.type });
        const timestamp = Date.now();
        const fileName = `${artistID}-${timestamp}.${file.type.split('/')[1]}`;
        const { error } = await supabase.storage.from('user-images').upload(fileName, blob);
        if (error) {
            console.error(error);
            return;
        } else {
            console.log('File uploaded successfully!');
            alert('File uploaded successfully!');
        }
        const publicURL = "https://zouczoaamusrlkkuoppu.supabase.co/storage/v1/object/public/user-images/" + fileName;
        console.log(artistID);
        const { data, insertError } = await supabase
        .from('artist_images')
        .insert(
        [{'image_url':publicURL, 'artist_id': artistID}]
        );
        window.location.reload();
      };
    return (
        <><input
            type="file"
            accept="image/*"
            style={{ display: 'none' }}
            id="contained-button-file"
            onChange={handleImageUpload} />
            <label htmlFor="contained-button-file">
                <Button variant="contained" component="span" style={{backgroundColor:'#21252B'}}>
                    <div style={{paddingRight: 5, color:'white'}}><CameraAlt /></div>
                     <div style={{color:'white'}}>Add Media</div>
                </Button>
            </label></>
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
