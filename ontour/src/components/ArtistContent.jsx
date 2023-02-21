import React, { useState, useEffect } from 'react';

import Rating from '@mui/material/Rating';
import Form from 'react-bootstrap/Form';

// For paginatedItems
import Review from "../components/Review";
import ReactPaginate from 'react-paginate';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';

const ArtistContent = (props) => {
    function Items({ currentItems }) {
        return (
            <>
                {currentItems && currentItems.map(function (review, index) {
                    return <Review user={review[2]} date={review[4]} key={index} rating={review[1]} venue={review[3]} text={review[0]} />
                })}
            </>
        )
    }
    function PaginatedItems({ itemsPerPage }) {
        // Here we use item offsets; we could also use page offsets
        // following the API or data you're working with.
        const [itemOffset, setItemOffset] = useState(0);

        // Simulate fetching items from another resources.
        // (This could be items from props; or items loaded in a local state
        // from an API endpoint with useEffect and useState)
        const endOffset = itemOffset + itemsPerPage;
        console.log(`Loading items from ${itemOffset} to ${endOffset}`);
        const currentItems = props.allReviews.slice(itemOffset, endOffset);
        const pageCount = Math.ceil(props.allReviews.length / itemsPerPage);

        // Invoke when user click to request another page.
        const handlePageClick = (event) => {
            const newOffset = (event.selected * itemsPerPage) % props.allReviews.length;
            console.log(
                `User requested page number ${event.selected}, which is offset ${newOffset}`
            );
            setItemOffset(newOffset);
        };

        return (
            <>
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    boxSizing: 'border-box',
                    width: '100%',
                    height: '100%',
                }}>
                    <Items currentItems={currentItems} />
                    <ReactPaginate
                        activeClassName={'item active '}
                        breakClassName={'item break-me '}
                        containerClassName={'pagination'}
                        disabledClassName={'disabled-page'}
                        marginPagesDisplayed={2}
                        nextClassName={"item next "}
                        nextLabel={<ArrowForwardIosIcon style={{ fontSize: 18, width: 50, color: "black" }} />}
                        breakLabel="..."
                        onPageChange={handlePageClick}
                        pageRangeDisplayed={2}
                        pageClassName={'item pagination-page '}
                        pageCount={pageCount}
                        previousClassName={"item previous"}
                        previousLabel={<ArrowBackIosIcon style={{ fontSize: 18, width: 50, color: "black" }} />}
                        renderOnZeroPageCount={null}
                    />
                </div>
            </>
        );
    }


    return (<div class="container">
        <hr></hr>
        <h4 id="reviews" class="fw-bold">Reviews ({props.allReviews.length})</h4>
        {props.allReviews.length > 0 &&
            <div id="clear">
                <div id="reviews-margin" class="row">
                    <div class="col-12 col-sm-9 align-self-center">
                        <div class="rating fw-bold">
                            Overall Rating: {props.aggregateRating.toFixed(1)} out of 5
                        </div>
                        <div class="rating">
                            <Rating
                                name="text-feedback"
                                value={props.aggregateRating}
                                size="large"
                                readOnly
                                precision={0.1}
                                emptyIcon={<StarBorderOutlinedIcon style={{ opacity: 1 }} fontSize="inherit" />}
                            />
                        </div>
                    </div>

                    <div class="col-12 col-sm-3 align-self-center">
                        <div class="dropdown">
                            <Form.Select onChange={props.formChange} aria-label="Default select example">
                                <option>Recommended</option>
                                <option value="1">Newest First</option>
                                <option value="2">Oldest First</option>
                                <option value="3">Highest Rated</option>
                                <option value="4">Lowest Rated</option>
                            </Form.Select>
                        </div>
                    </div>
                </div>

                <div id="page" class="list-group">
                    {/* {allReviews && allReviews.map(function(review, index) {
return <Review user={review[2]} date={review[4]} key={index} rating={review[1]} venue = {review[3]} text={review[0]}/>
})} */}
                    <PaginatedItems itemsPerPage={10} />
                </div>
            </div>
        }
    </div>
    )
}

export default ArtistContent;