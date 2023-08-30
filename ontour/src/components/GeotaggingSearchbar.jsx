import React, { useState, useRef } from 'react'
import Turnstone from 'turnstone'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faSearch, faXmark } from '@fortawesome/free-solid-svg-icons';
import '../Styles/turnstone.css';

// Tailwind classes for Turnstone elements
const styles = {
    input: 'input',
    typeahead: 'typeahead',
    listbox: 'listbox',
    groupHeading: 'groupHeading',
    item: 'item',
    highlightedItem: 'highlightedItem',
    clearButton: 'clearButton',
}

  
  // The maximum number of items we want to show in the list
  const maxItems = 10

  const Clear = () => <FontAwesomeIcon icon={faXmark} />
  const box = ["pizza", "burger", "pasta"];
  // Set up listbox contents. We are fetching cities and airports from two different
  // API endpoints. 10 from each but ideally we only want to show 8 cities and 2 airports.
  const listbox = 
    {
      id: 'cities',
      name: 'Cities',
      data: (query) =>
        fetch(`https://api.mapbox.com/search/searchbox/v1/suggest?q=${query}&access_token=pk.eyJ1Ijoic2VhcmNoLW1hY2hpbmUtdXNlci0xIiwiYSI6ImNrNnJ6bDdzdzA5cnAza3F4aTVwcWxqdWEifQ.RFF7CVFKrUsZVrJsFzhRvQ&session_token=3b9b0564-d1b0-4f7d-b7a0-38e51857dd37&language=en&limit=10&types=country%2Cregion%2Cdistrict%2Cpostcode%2Clocality%2Cplace`)
        .then(res => res.json())
        .then(data => {
            let cities = [];
            for(let i = 0; i < data.suggestions.length; i++)
            {
                let city = data.suggestions[i].name + ", " + data.suggestions[i].place_formatted;
                cities.push(city);
            }
            return cities;
        }),
      searchType: "contains"
    }
  
  const GeotaggingSearchbar = React.memo(({getCoordinates}) => {


    const [hasFocus, setHasFocus] = useState(false)
    const [currentCity, setCurrentCity] = useState("");
    const onSelectTrigger = useRef(false);

    // Style the container so on mobile devices the search box and results
    // take up the whole screen
    const containerStyles = hasFocus
        ? 'containerFocus'
        : 'containerNoFocus'
  
    const iconDisplayStyle = hasFocus ? 'hidden text-crystal-600' : 'inline-flex text-oldsilver-400'

    const handleSearch = (location) => {
      console.log("in search");
      if(location)
      {
        var key = "AIzaSyCZpLyl5Q2hyMNM-AnuDfsKfRCr_lTl6vA";
        var url = `https://maps.googleapis.com/maps/api/geocode/json?address=${location}&key=${key}`;
        var latitude;
        var longitude;
        const response = fetch(url).then(result => result.json())
        .then(featureCollection => {
            latitude = featureCollection.results[0].geometry.location.lat;
            longitude = featureCollection.results[0].geometry.location.lng;
            getCoordinates(latitude, longitude);
        })
        .catch(error => {
            console.log(error);
        });
      }
    }

    const handleSelect = (location) => {
      if(location != currentCity)
      {
        setCurrentCity(location);
        handleSearch(location);
      }
    }
  
    const onBlur = () => setHasFocus(false)
    const onFocus = () => setHasFocus(true)
  
    return (
      <div className={containerStyles}>
        <Turnstone
          autoFocus={true}
          //ref={turnstoneRef}
          clearButton={true}
          id="autocomplete"
          listbox={listbox}
          matchText={true}
          maxItems={maxItems}
          noItemsMessage="We found no places that match your search"
          onBlur={onBlur}
          onFocus={onFocus}
          placeholder="Enter a city"
          styles={styles}
          onEnter = {(e) => handleSearch(e)}
          onSelect = {(e) => handleSelect(e)}
          Clear={Clear}
        />
      </div>
    )
  });

  export default GeotaggingSearchbar;