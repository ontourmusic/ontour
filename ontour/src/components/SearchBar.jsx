import React from "react";
import { useState, useEffect } from "react";
import Turnstone from 'turnstone';
import '../Styles/turnstone.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faSearch, faXmark } from '@fortawesome/free-solid-svg-icons';
import {createSearchParams, useNavigate} from "react-router-dom";
import SearchBarItem from "./SearchBarItem";
import { createClient } from '@supabase/supabase-js'



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
    const supabase = createClient('https://zouczoaamusrlkkuoppu.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpvdWN6b2FhbXVzcmxra3VvcHB1Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY3ODE1ODUyMSwiZXhwIjoxOTkzNzM0NTIxfQ.LTuL_u0tzmsj8Zf9m6JXN4JivwLq1aRXvU2YN-nDLCo');

    const loadSearchItems = async () => { 
        var artists = await supabase.from('artists').select('*');
        var venues = await supabase.from('venues').select('*');

        var artistsList = artists["data"];
        var venuesList = venues["data"];

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
            const index = artistList.findIndex(artist => artist['name'] === textEntry);
            const venueIndex = venueList.findIndex(venue => venue['name'] === textEntry);
            if(index > -1){
                navigate({
                    pathname: '/artist', 
                    search: createSearchParams({
                        id: artistList[index]["artist_id"],
                        artist: GetSearchTerm(artistList[index]["name"]),
                    }).toString()
                });
            }

            else if(venueIndex > -1){
                navigate({
                    pathname: '/venue', 
                    search: createSearchParams({
                        id: artistList[venueIndex]["venue_id"],
                        venue: GetSearchTerm(venueList[index]["name"]),
                    }).toString()
            });
            } 
            if(typeof selectedItem.text !== undefined){
                if(artistList.includes(selectedItem)){
                    navigate({
                        pathname: '/artist', 
                        search: createSearchParams({
                        id: selectedItem.artist_id,
                        artist: GetSearchTerm(selectedItem.name),
                        }).toString()
                    });
                }
                else if(venueList.includes(selectedItem)){
                    navigate({
                        pathname: '/venue', 
                        search: createSearchParams({
                        id: selectedItem.venue_id,
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
        if(artistList.includes(selectedItem)){
            navigate({
                pathname: '/artist', 
                search: createSearchParams({
                    id: selectedItem.artist_id,
                    artist: GetSearchTerm(selectedItem.name),
                }).toString()
            });
        }
        else if(displayField != undefined && selectedItem != undefined){
            if(venueList.includes(selectedItem)){
                navigate({
                    pathname: '/venue', 
                    search: createSearchParams({
                        id: selectedItem.venue_id,
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