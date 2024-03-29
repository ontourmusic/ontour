import React from "react";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faPodcast } from '@fortawesome/free-solid-svg-icons';

export default function OnTourButton(){
    return (
        <div style={styles.OnTour} className="d-flex align-items-center justify-content-around">
            <span className="mr-3" style={{ color: "white" }}>ON TOUR</span>
            <FontAwesomeIcon icon={faPodcast} className={`fa-sharp fa-solid`} style={{ color: "white" }} beat size="lg"/>
        </div>
    )
}

const styles = {
    OnTour: {
        background: "red",
        height: "30px",
        width: "120px",
        marginBottom: "10px",
        borderRadius: "8px",
        paddingRight: "5px",
        paddingLeft: "5px",
    }
}