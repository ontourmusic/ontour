import React from "react";
import home_styles from "../Styles/home_styles";
import SearchBar from "./SearchBar";


const HomeHeader = () => {
    return (
        <div style={home_styles.header.container}>
            <div style={home_styles.header.content} class="search">
                {/* <h1 style={home_styles.header.title}>Find Your Next<br />Live Music Experience<br />Next line</h1> */}
                <h1 style={home_styles.header.title}><br /><br />Review Your Concerts<br />Find Live Events</h1>
                <SearchBar />
            </div>
        </div>
    );
}

export default HomeHeader;