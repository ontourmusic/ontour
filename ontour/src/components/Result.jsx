import React from "react";
import '../index.css';
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';

function Result(props)
{
    return (
        <a href="">
            <div id="result-row" class="row result">
              <div id="result-img" class="col-3">
                <img src={props.src}></img>
              </div>
              <div id="result-info" class="col-9 pt-2 pt-lg-4">
                <div id="result-name" class="fw-bold">{props.name}</div>
                <Rating
                    name="text-feedback"
                    value={props.rating}
                    size = "medium"
                    readOnly
                    precision={0.01}
                    emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit"/>}
                />
              </div>
            </div>
          </a>
    )
}

export default Result;
