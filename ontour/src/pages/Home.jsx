
import React from "react";
import { createSearchParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Navigation from "../Navigation";
import "pure-react-carousel/dist/react-carousel.es.css";
import '../Styles/carousel.css';
import { createClient } from '@supabase/supabase-js'
import Categories from "../components/Categories";
import HomeTile from "../components/HomeTile";
import HomeReview from "../components/HomeReview";
import HomeHeader from "../components/HomeHeader";
import { Grid } from "@mui/material";
import Schedule from "../components/Schedule";
import { GoogleMap, MarkerF, InfoWindowF} from '@react-google-maps/api';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import GeotaggingSearchbar from "../components/GeotaggingSearchbar";
import {supabase} from "../components/supabaseClient"
import CircularProgress from '@mui/material/CircularProgress';



class UpcomingEvent {
  constructor(name, date, eventId, eventURL, timezone, eventTime, venue, city, state, price, lat, lng, isVenue) {
      this.name = name;
      this.date = date;
      this.eventId = eventId;
      this.eventURL = eventURL;
      this.timezone = timezone;
      this.eventTime = eventTime;
      this.venue = venue;
      this.city = city;
      this.state = state;
      this.price = price;
      this.lat = lat;
      this.lng = lng;
      this.isVenue = isVenue;

  }
}

// Placeholder component for loading state
const LoadingPlaceholder = () => (
    <Grid item xs={6} md={3} style={{ height: "30vh", display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <CircularProgress />
    </Grid>
);

function Home() {
    const [artist_name, setName] = useState('')
    const [ratings, setRatings] = useState({});
    const [reviewCount, setReviewCount] = useState({});
    const [venueRatings, setVenueRatings] = useState({});
    const [venueReviewCount, setVenueReviewCount] = useState({});
    const [loading, setLoading] = useState(true);
    const [artistIDs, setArtistIDs] = useState({});
    const [artistList, setArtistList] = useState({ name: "", imageURL: "", artistID: -1 });
    const [venueList, setVenueList] = useState({});
    // const supabase = createClient('https://zouczoaamusrlkkuoppu.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpvdWN6b2FhbXVzcmxra3VvcHB1Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY3ODE1ODUyMSwiZXhwIjoxOTkzNzM0NTIxfQ.LTuL_u0tzmsj8Zf9m6JXN4JivwLq1aRXvU2YN-nDLCo');
    const [upcomingEvents, setUpcomingEvents] = useState([]);
    const [latitude, setLatitude] = useState(39.8355);
    const [longitude, setLongitude] = useState(-99.0909);
    const [mapZoom, setMapZoom] = useState(3);
    const [citySearchResults, setCitySearchResults] = useState([]);
    const markers = [
        { address: "Crypto", lat: 34.0430, lng: -118.267616 },
        { address: "Santa Monica", lat: 34.0195, lng: -118.4912 },
        { address: "Address3", lat: 33.9535, lng: -118.339630 },
    ];
    const [isOpen, setIsOpen] = useState(false);
    const [infoWindowData, setInfoWindowData] = useState();
    const [hoveredVenue, setHoveredVenue] = useState();
    const displayPlaceholders = loading || Object.keys(artistList).length === 0;
    
    const handleHoveredIndexChange = (index) => {
        setHoveredVenue(index);
        setInfoWindowData({ id: index, venue: index });
    }

    const navigate = useNavigate();
    const routeChange = (artist) => {
        navigate({
            pathname: '/artist',
            search: createSearchParams({
                artist: artist_name,
            }).toString()
        });
    };

    //gets the artist rating data from the database
    const performSearch = async () => {
        var starsResults = {};
        var ratingCount = {};
        var newRatings = {};
        var newCount = {};
        var newVenueRatings = {};
        var newVenueCount = {};
        var artistIDList = {};


        //gets the artist reviews from the database 
        const reviewData = await supabase.from('artist_reviews').select('*');

        for (let i = 0; i < reviewData.data.length; i++) {
            const currData = reviewData.data[i].artist_id;
            newRatings[currData] = 0;
            newCount[currData] = 0;
        }

        //loop through the reviews and add the ratings to the artist
        for (let i = 0; i < reviewData.data.length; i++) {
            const currData = reviewData.data[i];
            newRatings[currData.artist_id] += currData.rating;
            newCount[currData.artist_id]++;
        }
        //gets the venue reviews from the database
        const venueReviewData = await supabase.from('venue_reviews').select('*');

        for (let i = 0; i < venueReviewData.data.length; i++) {
            const currData = venueReviewData.data[i].venue_id;
            newVenueRatings[currData] = 0;
            newVenueCount[currData] = 0;
        }
        //same as above but for venues
        for (let i = 0; i < venueReviewData.data.length; i++) {
            const currData = venueReviewData.data[i];
            newVenueRatings[currData.venue_id] += currData.rating;
            newVenueCount[currData.venue_id]++;
        }

        //gets the list of recent artists from the database
        const recentArtists = await supabase.from('artists').select('*').order('review_count', { ascending: false }).limit(8);
        const artistObject = {};
        for (let i = 0; i < recentArtists["data"].length; i++) {
            const currData = recentArtists["data"][i];
            const key = currData.name.replace(/\s+/g, '_').toLowerCase();
            artistObject[key] = {
                name: currData.name,
                imageURL: currData.home_image,
                artistID: currData.artist_id,
            }
        }

        //gets the list of recent venues from the database
        const recentVenues = await supabase.from('venues').select('*').order('review_count', { ascending: false }).limit(8);
        const venueObject = {};
        for (let i = 0; i < recentVenues["data"].length; i++) {
            const currData = recentVenues["data"][i];
            const key = currData.name.replace(/\s+/g, '_').toLowerCase();
            venueObject[key] = {
                name: currData.name,
                imageURL: currData.home_image,
                venueID: currData.venue_id,
            }
        }
        setVenueList(venueObject);
        setArtistList(artistObject);

        for (var i = 0; i < Object.keys(artistObject).length; i++) {
            var artistNameList = Object.keys(artistObject);
            var artistName = artistNameList[i];
            var artistID = artistObject[artistName].artistID;
            starsResults[artistName] = (newRatings[artistID] / newCount[artistID]);
            ratingCount[artistName] = newCount[artistID];
            artistIDList[artistName] = artistID;
        }

        for (var i = 0; i < Object.keys(venueObject).length; i++) {
            var venueNameList = Object.keys(venueObject);
            var venueName = venueNameList[i];
            var venueID = venueObject[venueName].venueID;
            venueRatings[venueName] = (newVenueRatings[venueID] / newVenueCount[venueID]);
            venueReviewCount[venueName] = newVenueCount[venueID];
        }

        Geolocate();

    setRatings(()=> {
      return starsResults
    });
    setReviewCount(()=>{
      return ratingCount
    })
    setArtistIDs(()=>{
      return artistIDList
    })
    setLoading(false);
  }

  function Geolocate(newLat, newLon)
  {
    if(newLat)
    {
        var ticketmasterurl = `https://app.ticketmaster.com/discovery/v2/events.json?apikey=NwphXHPsTvSzPp0XwvUNdp3vyzE3vEww&latlong=${newLat},${newLon}&classificationName=Music&radius=50&unit=miles&size=200`
    }
    else{
        var ticketmasterurl = `https://app.ticketmaster.com/discovery/v2/events.json?apikey=NwphXHPsTvSzPp0XwvUNdp3vyzE3vEww&classificationName=Music&size=200`
    }
    const ticketmasterresponse = fetch(ticketmasterurl).then(result => result.json())
        .then(featureCollection => {
            console.log(featureCollection);
            var eventArray = [];
            var sorted = featureCollection._embedded.events.sort(function (a, b) {
                var dateA = new Date(a.dates.start.localDate), dateB = new Date(b.dates.start.localDate);
                return dateA - dateB;
            }
            );
            for (let i = 0; i < sorted.length; i++) {
                if(eventArray.length <= 7)
                {
                var event = createEvent(sorted[i]);
                eventArray.push(event);
                }
                else{
                break;
                }
            }
            setUpcomingEvents(eventArray);
        })
  }

  function createEvent(eventInfo)
  {
    var name = eventInfo.name;
    var date = eventInfo.dates.start.localDate;
    var fullDate = parseDate(date);
    var timezone = parseTimezone(eventInfo.dates.timezone);
    var eventId = eventInfo.id;
    var eventURL = eventInfo.url;
    var time = parseTime(eventInfo.dates.start.localTime);
    var price = -1;
    var city = eventInfo._embedded.venues[0].city.name;
    var state = "";
    if(eventInfo._embedded.venues[0].state)
    {
        state = eventInfo._embedded.venues[0].state.stateCode;
    }
    var venue = eventInfo._embedded.venues[0].name;
    if(eventInfo.priceRanges)
    {
        if(eventInfo.priceRanges[0].min)
        {
            price = eventInfo.priceRanges[0].min;
            price = price.toFixed(2);
            price = "$" + price;
        }
    }
    var latitude = parseFloat(eventInfo._embedded.venues[0].location.latitude);
    var longitude = parseFloat(eventInfo._embedded.venues[0].location.longitude);
    var event = new UpcomingEvent(name, fullDate, eventId, eventURL, timezone, time, venue, city, state, price, latitude, longitude, false);
    return event;
  }

  function parseTimezone(timezone){
    if(!timezone)
    {
        timezone = " ";
    }
    else {
        timezone = timezone.split('/')[1];
        timezone = timezone.replace('_', ' ');
    }
    return timezone;
  }

  function parseTime(eventTime){
    var hours;
    var minutes
    var time;
    if(eventTime)
    {
        eventTime = eventTime.split(':');
        hours = eventTime[0];
        minutes = eventTime[1];
        time = (hours > 12) ? hours-12 : hours;
        time += ':' + minutes;
        time += (hours >= 12) ? " pm" : " am";
    }
    else{
        time = " ";
    }
    return time;
  }

  function parseDate(date){
    const[year, month, day] = date.split("-");
    const newData = new Date(+year, month - 1, +day);
    var weekday = newData.toString().split(" ")[0];
    var monthStr = newData.toString().split(" ")[1];
    var dayStr = newData.toString().split(" ")[2];
    
    if(dayStr.charAt(0) == '0') {
        dayStr = dayStr.slice(1);
    }

    var fullDate = weekday + ", " + monthStr + " " + dayStr;
    return fullDate;
    }

    function handleMarkerClick(id, lat, lng, venue)
    {
        setInfoWindowData({ id, venue });
        setIsOpen(true);
    }

    const setNewCoordinates = (latitude, longitude) => {
        setLatitude(latitude);
        setLongitude(longitude);
        setMapZoom(10);
        Geolocate(latitude, longitude);
    }

    //performs the search when the page loads
    useEffect(() => {
        performSearch();
    }, [artistList.name]);

    const display = loading ? "hidden" : "visible";
    return (
        <Grid container style={{ width: "100vw" }} spacing={0} sx={{ backgroundColor: "#181816" }}>
            <Grid item xs={12}>
                <Navigation navbar={false}/>
            </Grid>
            <Grid item xs={12}>
                <HomeHeader />
            </Grid>
            <Grid item xs={12} container spacing={2} justifyContent="center" >
                <Grid item xs={10} container>
                    <Grid item xs={12}>
                        <h1 style={{ color: "#FFFFFF" }} class="homebanner">Review the artists you love</h1>
                    </Grid>
                    <Grid item xs={12} container spacing={2}>
                        {displayPlaceholders
                            ? Array.from({ length: 8 }, (_, index) => <LoadingPlaceholder key={index} />)
                            : Object.keys(artistList).map((artist, index) => (
                                <Grid item xs={6} md={3} style={{ height: "30vh" }}>
                                    <HomeTile
                                        isArtist={true}
                                        imageURL={artistList[artist].imageURL}
                                        loading={loading}
                                        id={artistList[artist].artistID}
                                        name={artistList[artist].name}
                                        rating={ratings[artist]}
                                        reviewCount={reviewCount[artist]}
                                    />
                                </Grid>
                            ))}
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <HomeReview
                        text="No one puts on a show like Taylor Alison Swift! After the chaos that was trying to get tickets to the Eras Tour I had VERY high hopes for this show and thankfully it did not disappoint. This concert was THREE hours of pure joy and bliss!"
                        rating={5}
                        subText="Alex C. 03/17/2023 State Farm Stadium"
                    />
                </Grid>
                <Grid item xs={10}>
                    <Categories />
                </Grid>
                <Grid item xs={10} container>
                    <Grid item xs={12}>
                        <h1 style={{ color: "#FFFFFF" }} class="homebanner">Legendary Venues</h1>
                    </Grid>
                    <Grid item xs={12} spacing={2} container>
                        {Object.keys(venueList).map((venue, index) => {
                            return (
                                <Grid item xs={6} md={3} style={{ height: "30vh"}}>
                                    <HomeTile
                                        isArtist={false}
                                        id={venueList[venue].venueID}
                                        loading={loading}
                                        imageURL={venueList[venue].imageURL}
                                        name={venueList[venue].name}
                                        rating={venueRatings[venue]}
                                        reviewCount={venueReviewCount[venue]}
                                    />
                                </Grid>
                            )
                        })}
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <HomeReview
                        text="I saw Bon Jovi here in 2017, it was awesome and he brought the house down!
                                The Forum is old but historic and was still a lot of fun as a concert venue.  It is intimate feeling despite
                                how big it is and I would highly recommend seeing a concert here."
                        rating={5}
                        subText="Jack 03/08/2017 Kia Forum"
                    />
                </Grid>
                {/* ADD GEOLOCATING CODE */}
                <Grid item xs={10} container>
                  <Grid item xs={12}>
                      <h1 style={{ color: "#FFFFFF" }} class="homebanner">Upcoming Popular Events</h1>
                      <GeotaggingSearchbar getCoordinates={setNewCoordinates}/>
                  </Grid>
                    <Grid container spacing={2} marginTop={3}>
                        <Grid item xs={12} md={6}>
                             <Schedule eventArray={upcomingEvents} darkMode={true} hideTitle={true} onHoveredIndexChange={handleHoveredIndexChange} />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <GoogleMap
                                googleMapsApiKey="AIzaSyCZpLyl5Q2hyMNM-AnuDfsKfRCr_lTl6vA"
                                mapContainerStyle={{width: "100%", height: "80vh"}} 
                                zoom={mapZoom}
                                onClick={() => setIsOpen(false)}
                                center={{lat: latitude, lng: longitude}}>
                                {upcomingEvents.map(({ venue, lat, lng }, ind) => (
                                    <MarkerF
                                        key={ind}
                                        position={{ lat, lng }}
                                        onClick={() => {
                                            handleMarkerClick(ind, lat, lng, venue);
                                        }}
                                    >
                                        {(hoveredVenue == venue || isOpen && infoWindowData.id === ind) && (
                                            <InfoWindowF onCloseclick={() => {setIsOpen(false)}}>
                                                <div>{infoWindowData.venue}</div>
                                            </InfoWindowF>
                                        )}
                                    </MarkerF>
                                ))}
                            </GoogleMap>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}
export default Home;