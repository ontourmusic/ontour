import React from "react";
import '../index.css';
import styles from '../Styles/styles';
import Item from "./Item";

/* 
expected props:
    - imageURL: string
    - link (optional): string (if not provided, the polaroid will not be clickable
    - bottomComponent (optional): JSX.Element
*/
const Polaroid = (props) => {
    return (
        <div class="col-4" onClick={props.onPress}>
            <a href={props.link} >
                <div class="card bg-light">
                    <img src={props.imageURL} class="d-block w-100" style={styles.polaroid_image} alt="..." />
                    <div class="card-body">
                        {props.bottomComponent}
                    </div>
                </div>
            </a>
        </div>
    )
}

export { Polaroid };