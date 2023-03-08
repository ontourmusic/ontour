import React from "react";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faMusic, faHouse } from '@fortawesome/free-solid-svg-icons';

export default function SearchBarItem(props){
    if(props.groupId == "artists"){
        return (<div>
            <FontAwesomeIcon icon={faMusic} size="sm"/>
            <span>&ensp;{props.item.name}</span>
        </div>);
    }
    else{
        return (<div>
            <FontAwesomeIcon icon={faHouse} size="sm"/>
            <span>&ensp;{props.item.name}, {props.item.city}, {props.item.state}</span>
        </div>);
    }
}