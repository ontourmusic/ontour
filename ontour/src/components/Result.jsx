import React from "react";
import '../index.css';
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';

function Result(props)
{
    return (
        <a href="">
            <div id="result-row" class="row result">
              <div id="result-img" class="col-3 align-self-center">
                <img src={props.src}></img>
              </div>
              <div id="result-info" class="col-8 align-self-center">
                <div id="result-name" class="fw-bold">{props.name}</div>
                <Rating
                    name="text-feedback"
                    value={props.rating}
                    size = "medium"
                    readOnly
                    precision={0.01}
                    emptyIcon={<StarIcon style={{ opacity: 1 }} fontSize="inherit"/>}
                />
              </div>
              <div class="col-1 align-self-center">
                    •
                </div>
            </div>
          </a>
    )
}

export default Result;
