import React from "react";
import { useState, useEffect } from "react";
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

const Clear = () => <FontAwesomeIcon icon={faXmark} />

function GetSearchTerm(name) {
    let lower = name.toLowerCase();
    return lower.replace(" ", "_");
}

export default function SearchBar(){
    const [hasFocus, setHasFocus] = useState(false);
    const [artistList, setArtistList] = useState([]);
    const [venueList, setVenueList] = useState([]);

    const loadSearchItems = async () => {
        var artistsData = await fetch(`http://localhost:8000/artist/`, {mode: 'cors'});
        var venuesData = await fetch(`http://localhost:8000/venue/`, {mode: 'cors'});
        
        var artists = await artistsData.json();
        var venues = await venuesData.json();

        var artistsList = artists["data"];
        var venuesList = venues["data"];

        artistsList.forEach(artist => {
            if(artist["lname"] !== null){
                artist["name"] = artist["fname"] + " " + artist["lname"];
            }
            else{
                artist["name"] = artist["fname"];
            }
        });
        setArtistList(artistsList);
        setVenueList(venuesList);
    }

    useEffect(() => {
        loadSearchItems();
      }, []);

      const listbox = [
        {
          id: "artists",
          name: "Artists",
          data: artistList,
          displayField: 'name',
          searchType: "startswith"
        },
        {
          id: "venues",
          name: "Venues",
          data: venueList,
          displayField: 'name',
          searchType: "contains"
        }
      ];

    const onBlur = () => setHasFocus(false)
    const onFocus = () => setHasFocus(true)

    const containerStyles = hasFocus
    ? 'containerFocus'
    : 'containerNoFocus'

    const navigate = useNavigate(); 
    const searchNavigate = (textEntry, selectedItem) => {
        try{
            console.log(selectedItem);
            if(artistList.some( artist => artist['name'] === textEntry )){
                navigate({
                    pathname: '/artist', 
                    search: createSearchParams({
                    artist: selectedItem.artist_id,
                    }).toString()
                });
            }
            else 
            if(venueList.some( venue => venue['name'] === textEntry )){
                navigate({
                    pathname: '/venue', 
                    search: createSearchParams({
                    venue: GetSearchTerm(textEntry),
                    }).toString()
            });
            } 
            if(typeof selectedItem.text !== undefined){
                if(artistList.some( artist => artist['name'] === selectedItem.name)){
                    navigate({
                        pathname: '/artist', 
                        search: createSearchParams({
                        artist: selectedItem.artist_id,
                        }).toString()
                    });
                }
                else if(venues.some( venue => venue['name'] === selectedItem.name)){
                    navigate({
                        pathname: '/venue', 
                        search: createSearchParams({
                        venue: GetSearchTerm(selectedItem.name),
                        }).toString()
                    });
                }
            }
        }
        catch {
            console.log('Search Error');
        }
        
    }

    const onSelect = (selectedItem, displayField) => {
        console.log(selectedItem, displayField);
        if(artists.includes(selectedItem)){
            navigate({
                pathname: '/artist', 
                search: createSearchParams({
                artist: GetSearchTerm(selectedItem),
                }).toString()
            });
        }
        else if(displayField != undefined && selectedItem != undefined){
            if(venues.some( venue => venue['name'] === selectedItem.name)){
                navigate({
                    pathname: '/venue', 
                    search: createSearchParams({
                    venue: GetSearchTerm(selectedItem.name),
                    }).toString()
                });
            }
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
                onSelect={onSelect}
            />
        </div>
    );
}