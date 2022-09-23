import React from "react";
import '../index.css';

export default function Show(props)
{
    return(
        <a href="/review">
            <div class="row justify-content-center py-3 show">
                <div class="col-2">
                    <button type="button" class="date-btn btn btn-secondary">
                        <h6>
                            {props.date}
                        </h6>
                    </button>
                </div>
                <div class="col-8 show-location">
                    <div class="font-weight-bold">
                        {props.event}
                    </div>
                    <div>
                        {props.location}
                    </div>
                </div>
                <div class="col-2 align-self-center">
                    <img src="https://assets.sk-static.com/images/nw/furniture/icons/chevron-black.svg"></img>
                </div>
            </div>
        </a>
    );
}