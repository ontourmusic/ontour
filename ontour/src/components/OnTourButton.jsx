import React from "react";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faPodcast } from '@fortawesome/free-solid-svg-icons';

export default function OnTourButton(){
    return (
        <div style={styles.OnTour} className="d-flex align-items-center justify-content-around">
            <span className="mr-3">ON TOUR</span>
            <FontAwesomeIcon icon={faPodcast} className={`fa-sharp fa-solid`} beat size="lg"/>
        </div>
    )
}

const styles = {
    OnTour: {
        background: "red",
        height: "30px",
        width: "110px",
        marginBottom: "10px",
        borderRadius: "8px"
    }
}