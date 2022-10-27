import React from "react";
import '../index.css';
import Item from "./Item";

export default function CarouselImage(props)
{
    return (
        <div class="col-4">
            <Item image={props.image} text="Card title "/>
        </div>
    );
}