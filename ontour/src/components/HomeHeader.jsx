import React from "react";
import home_styles from "../Styles/home_styles";
import SearchBar from "./SearchBar";


const HomeHeader = () => {
    return (
        <div style={home_styles.header.container}>
            <div style={home_styles.header.content} class="search">
                <h1 style={home_styles.header.title}>Find Your Next<br />Live Music Experience</h1>
                <SearchBar />
            </div>
        </div>
    );
}

export default HomeHeader;