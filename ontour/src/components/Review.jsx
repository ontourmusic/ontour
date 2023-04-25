import React from "react";
import '../index.css';
import { RiStarFill } from "react-icons/ri"
import { AiOutlineUser } from "react-icons/ai"
import { useState } from 'react';
import { HelpfulButton } from "./Buttons";
import artist_styles from "../Styles/artist_styles";
import { IconButton, Button, Typography } from "@mui/material";
import { ThumbUpAlt } from "@mui/icons-material";

const review_styles = artist_styles.review_display.review;

// export default function 
const Review = (props) => {
    const [isActive, setIsActive] = useState(true);

    const handleHelpful = event => {
        event.currentTarget.classList.toggle('fw-bold');
        event.currentTarget.classList.toggle('btn-outline-light');
        setIsActive(current => !current);
    };

    const refactorTesting = true;
    if (refactorTesting) {
        return (
            <div style={review_styles.container}>
                <div class="d-flex bd-highlight">
                    <div class="p-1 bd-highlight"><AiOutlineUser size={23} /> </div>
                    <div class="p-1 bd-highlight"><h6 class="review-user">{props.user}</h6></div>
                    <br></br>
                </div>
                <div style={{
                    width: "fit-content",
                }}>
                    {[...Array(props.rating)].map(star => (
                            <RiStarFill className="star" color={"#faaf00"} size={20} />
                        ))}
                    {[...Array(5 - props.rating)].map(star => (
                            <RiStarFill className="star" color={"#bdbdbd"} size={20} />
                        ))}
                </div>
                <small>{props.date} • {props.venue}</small>
                <p id="rating-text" style={{ whiteSpace: "pre-wrap" }} class="mb-2" align="left">{props.text}</p>
                <Button variant="outlined" startIcon={<ThumbUpAlt />} sx={review_styles.helpfulButton}>
                    Helpful
                </Button>
                {/* <IconButton>
                    <ThumbUpAlt />
                </IconButton> */}
            </div>
        )
    }

    return (
        <div style={review_styles.item}>
            <div class="d-flex bd-highlight">
                <div class="p-1 bd-highlight"><AiOutlineUser size={23} /> </div>
                <div class="p-1 bd-highlight"><h6 class="review-user">{props.user}</h6></div>
                <br></br>
            </div>
            {/* <div> */}
                <div class="d-flex bd-highlight mb-2">
                    {[...Array(props.rating)].map(star => {
                        return (
                            <RiStarFill
                                className="star"
                                color={"#faaf00"}
                                size={20}
                            />
                        );
                    })}
                    {[...Array(5 - props.rating)].map(star => {
                        return (
                            <RiStarFill
                                className="star"
                                color={"#bdbdbd"}
                                size={20}
                            />
                        );
                    })}
                </div>
                <div align="left" class="d-flex bd-highlight mb-2">
                    <small>{props.date} • {props.venue}</small>
                </div>
            {/* </div> */}
            <div class="d-flex w-100 justify-content-start">
                <p id="rating-text" style={{ whiteSpace: "pre-wrap" }} class="mb-2" align="left">{props.text}</p>
            </div>
            {/* <HelpfulButton onPress={handleHelpful} isActive={isActive} /> */}
            <Button variant="outlined" startIcon={<ThumbUpAlt />} sx={{
                backgroundColor: "rgba(0,0,0,0.1)",
                color: "rgba(0,0,0,0.54)",
                textTransform: "none",
            }}>
                Helpful
            </Button>
            <IconButton>
                <ThumbUpAlt />
            </IconButton>

        </div>
    )
}

export default Review;