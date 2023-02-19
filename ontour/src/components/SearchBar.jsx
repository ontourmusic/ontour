import React from "react";
import { useState } from "react";
import Turnstone from 'turnstone';
import '../Styles/turnstone.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faSearch, faXmark } from '@fortawesome/free-solid-svg-icons';
import {createSearchParams, useNavigate} from "react-router-dom";
import SearchBarItem from "./SearchBarItem";


const styles = {
    input: 'input',
    typeahead: 'typeahead',
    listbox: 'listbox',
    groupHeading: 'groupHeading',
    item: 'item',
    highlightedItem: 'highlightedItem',
    clearButton: 'clearButton',
}

const artists = [
    "Adele", "Andrea Bocelli", "Billie Eilish",
    "Billy Joel", "The Chainsmokers", "Dominic Fike",
    "Elton John", "Harry Styles", "Jack Harlow", 
    "Old Dominion", "Post Malone", "Yung Gravy",
  ];
  
const venues = [
    {"name": "Kia Forum",
     "city": "Los Angeles, CA"
    }
  ];

  // Set up listbox contents.
  const listbox = [
    {
      id: "artists",
      name: "Artists",
      data: artists,
      searchType: "startswith"
    },
    {
      id: "venues",
      name: "Venues",
      data: venues,
      displayField: 'name',
      searchType: "contains"
    }
  ];

const Clear = () => <FontAwesomeIcon icon={faXmark} />

function GetSearchTerm(name) {
    let lower = name.toLowerCase();
    return lower.replace(" ", "_");
}



  

export default function SearchBar(){
    const [hasFocus, setHasFocus] = useState(false);

    const onBlur = () => setHasFocus(false)
    const onFocus = () => setHasFocus(true)

    const containerStyles = hasFocus
    ? 'containerFocus'
    : 'containerNoFocus'

    const navigate = useNavigate(); 
    const searchNavigate = (textEntry, selectedItem) => {
        try{
            console.log(GetSearchTerm(textEntry +' '+selectedItem));
            if(artists.includes(textEntry)){
                navigate({
                    pathname: '/artist', 
                    search: createSearchParams({
                    artist: GetSearchTerm(textEntry),
                    }).toString()
                });
            }
            else if(venues.some( venue => venue['name'] === textEntry )){
                navigate({
                    pathname: '/artist', 
                    search: createSearchParams({
                    artist: "billie_eilish",
                    }).toString()
                });
            } 
            if(typeof selectedItem.text !== undefined){
                if(artists.includes(selectedItem.text)){
                    navigate({
                        pathname: '/artist', 
                        search: createSearchParams({
                        artist: GetSearchTerm(selectedItem.text),
                        }).toString()
                    });
                }
                else if(venues.some( venue => venue['name'] === selectedItem.text)){
                    navigate({
                        pathname: '/artist', 
                        search: createSearchParams({
                        artist: "billie_eilish",
                        }).toString()
                    });
                }
            }
        }
        catch {
            console.log('Search Error');
        }
        
    }
    

    return (
        <div className={containerStyles}>
            <FontAwesomeIcon icon={faSearch} className={`iconStyle ${containerStyles}`} size="lg"/>
            <Turnstone
                id="fruitveg"
                listbox={listbox}
                matchText={true}
                placeholder="Search for an artist or venue"
                noItemsMessage="We found no places that match your search"
                styles={styles}
                clearButton={true}
                Clear={Clear}
                onBlur={onBlur}
                onFocus={onFocus}
                onEnter={searchNavigate}
                onTab={searchNavigate}
                Item={SearchBarItem}
            />
        </div>
    );
}