import React from "react";
import PropTypes from "prop-types";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faMusic, faHouse, faRadio } from '@fortawesome/free-solid-svg-icons';

export default function SearchBarItem(props){
    if(props.groupId === "artists"){
        return (<div>
            <FontAwesomeIcon icon={faMusic} size="sm"/>
            <span>&ensp;{props.item.name}</span>
        </div>);
    }
    else if(props.groupId === "festivals"){
        return (<div>
            <FontAwesomeIcon icon={faRadio} size="sm"/>
            <span>&ensp;{props.item.name}, {props.item.city}, {props.item.state}</span>
        </div>);
    }
    else{
        return (<div>
            <FontAwesomeIcon icon={faHouse} size="sm"/>
            <span>&ensp;{props.item.name}, {props.item.city}, {props.item.state}</span>
        </div>);
    }
}

/*
{
    "groupId": "festivals",
    "groupIndex": 2,
    "groupName": "Festivals",
    "index": 0,
    "isHighlighted": true,
    "item": {
        "id": 1,
        "created_at": "2023-04-07T23:40:18.392641+00:00",
        "name": "Coachella Music Festival",
        "lineup": null,
        "banner_image": "https://static01.nyt.com/images/2020/03/10/arts/10virus-coachella1/10virus-coachella1-mediumSquareAt3X.jpg",
        "city": "Indio",
        "state": "California",
        "review_count": 3
    },
    "query": "Coac",
    "searchType": "contains",
    "totalItems": 1
}
*/

SearchBarItem.propTypes = {
    groupId: PropTypes.string,
    groupIndex: PropTypes.number,
    groupName: PropTypes.string,
    index: PropTypes.number,
    isHighlighted: PropTypes.bool,
    item: PropTypes.shape({
        id: PropTypes.number,
        created_at: PropTypes.string,
        name: PropTypes.string,
        lineup: PropTypes.string,
        banner_image: PropTypes.string,
        city: PropTypes.string,
        state: PropTypes.string,
        review_count: PropTypes.number
    }),
    query: PropTypes.string,
    searchType: PropTypes.string,
    totalItems: PropTypes.number
};