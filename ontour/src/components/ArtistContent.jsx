import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';

// For paginatedItems
import Review from "../components/Review";
import ReactPaginate from 'react-paginate';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import artist_styles from '../Styles/artist_styles';
import ReviewSummary from './ReviewSummary';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { TextField, Grid} from '@mui/material';
const review_display_styles = artist_styles.review_display;


const ArtistContent = (props) => {
    const [searchTerm, setSearchTerm] = useState("");
    const reviewSearch = () => {
        props.onReviewSearch(searchTerm);
    }
    const inputChange = (event) => {
        
        setSearchTerm(event.target.value);
    }
    function Items({ currentItems }) {
        return (
            <>
                {currentItems && currentItems.map(function (review, index) {
                    return <Review 
                    id={review.id} 
                    user={review.name} 
                    date={review.eventDate} 
                    key={index} 
                    rating={review.rating} 
                    venue={review.event} 
                    text={review.review} 
                    count={review.likeCount}
                    likedUsers={review.likedUsers}
                    dislikedUsers={review.dislikedUsers} 
                    reviewTable={props.reviewTable}
                    response = {review.artist_response}
                    />
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
        //console.log(`Loading items from ${itemOffset} to ${endOffset}`);
        const currentItems = props.filteredReviews.slice(itemOffset, endOffset);
        const pageCount = Math.ceil(props.filteredReviews.length / itemsPerPage);

        // Invoke when user click to request another page.
        const handlePageClick = (event) => {
            const newOffset = (event.selected * itemsPerPage) % props.filteredReviews.length;
            console.log(
                `User requested page number ${event.selected}, which is offset ${newOffset}`
            );
            setItemOffset(newOffset);
        };

        return (
            <>
                <div style={review_display_styles.paginated_div}>
                    <Items currentItems={currentItems} />
                    <ReactPaginate
                        activeClassName={'item active '}
                        breakClassName={'item break-me '}
                        containerClassName={'pagination'}
                        disabledClassName={'disabled-page'}
                        marginPagesDisplayed={2}
                        nextClassName={"item next "}
                        nextLabel={<ArrowForwardIosIcon style={review_display_styles.page_arrow} />}
                        breakLabel="..."
                        onPageChange={handlePageClick}
                        pageRangeDisplayed={2}
                        pageClassName={'item pagination-page '}
                        pageCount={pageCount}
                        previousClassName={"item previous"}
                        previousLabel={<ArrowBackIosIcon style={review_display_styles.page_arrow} />}
                        renderOnZeroPageCount={null}
                    />
                </div>
            </>
        );
    }
    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <hr />
                </Grid>
                <Grid item xs={12}>
                    <ReviewSummary allReviews={props.allReviews} />
                </Grid>
                <Grid item xs={12} container spacing={1} style={{
                    paddingTop: "10px",
                    paddingBottom: "10px",
                }}>
                    <Grid item xs={12} md={6}>
                        <div className='d-flex justify-content-left align-content-center'>
                            <TextField id="standard-basic" label="Search Reviews" variant="outlined" onChange={inputChange}
                                style={{
                                    width: "-webkit-fill-available"
                                }}
                            />
                            <button type="button" class="btn btn-primary btn-sm" onClick={reviewSearch}
                                style={{
                                    marginLeft: '3px',
                                    height: "auto",
                                }}
                            >
                                <FontAwesomeIcon icon={faSearch} size="sm" />
                            </button>
                        </div>
                    </Grid>
                    <Grid item xs={6} md={3}>
                        <Form.Select onChange={props.onFormChange} aria-label="Default select example">
                            <option>Recommended</option>
                            <option value="1">Newest First</option>
                            <option value="2">Oldest First</option>
                            <option value="3">Highest Rated</option>
                            <option value="4">Lowest Rated</option>
                        </Form.Select>
                    </Grid>
                    <Grid item xs={6} md={3}>
                        {/* <div class="dropdown p-3"> */}
                        <Form.Select onChange={props.onRatingChange} aria-label="Default select example">
                            <option value="0">Filter by Rating</option>
                            <option value="1">1 Star</option>
                            <option value="2">2 Stars</option>
                            <option value="3">3 Stars</option>
                            <option value="4">4 Stars</option>
                            <option value="5">5 Stars</option>
                        </Form.Select>
                        {/* </div> */}
                    </Grid>
                </Grid>

            </Grid>
            {props.allReviews.length > 0 &&
                <div id="clear">
                    {
                        props.searchResults ?
                            <div className='d-flex justify-content-left align-content-center mb-3 pl-5 ml-5'>
                                <div className='pl-5'>
                                    {props.filteredReviews.length} reviews matching the search term &nbsp;
                                </div>
                                <button type="button" className='btn btn-outline-secondary btn-sm ml-5' onClick={props.onClearSearch}>
                                    Clear Search
                                </button>
                            </div> : <></>
                    }

                    <div id="page" style={review_display_styles.review.container}>
                        {/* {allReviews && allReviews.map(function(review, index) {
                        return <Review user={review[2]} date={review[4]} key={index} rating={review[1]} venue = {review[3]} text={review[0]}/>
                        })} */}
                        <PaginatedItems itemsPerPage={10} />
                    </div>
                </div>
            }
            
        </>
    )
}

export default ArtistContent;

ArtistContent.propTypes = {
    aggregateRating: PropTypes.number,
    searchResults: PropTypes.bool,
    allReviews: PropTypes.arrayOf(PropTypes.shape({
        review: PropTypes.string,
        rating: PropTypes.number,
        name: PropTypes.string,
        event: PropTypes.string,
        eventDate: PropTypes.string
    })),
    filteredReviews: PropTypes.arrayOf(PropTypes.shape({
        review: PropTypes.string,
        rating: PropTypes.number,
        name: PropTypes.string,
        event: PropTypes.string,
        eventDate: PropTypes.string
    })),
}