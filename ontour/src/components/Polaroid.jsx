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
const HomePagePolaroid = (props) => {
    return (
        <div class="col-4">
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
const CarouselPolaroid = (props) => {
    return (
        <div class="col-4">
            <div>
                <div class="card">
                    <img src={props.image} class="d-block w-100" style={styles.polaroid_image} alt="..." />
                    <div class="card-body">
                        <h1 class="card-title">{props.text}</h1>
                    </div>
                </div>
            </div>
            {/* <Item image={props.image} /> */}
        </div>
    )
}


export { HomePagePolaroid, CarouselPolaroid };