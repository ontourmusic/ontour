import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';

// For paginatedItems
import Review from "../components/Review";
import ReactPaginate from 'react-paginate';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import artist_styles from '../Styles/artist_styles';
import ReviewSummary from './ReviewSummary';
const review_display_styles = artist_styles.review_display;

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
        <div class="container">
            <hr></hr>
            <h4 id="reviews" class="fw-bold">Reviews ({props.allReviews.length})</h4>
            <div class="dropdown">
                <Form.Select onChange={props.formChange} aria-label="Default select example">
                    <option>Recommended</option>
                    <option value="1">Newest First</option>
                    <option value="2">Oldest First</option>
                    <option value="3">Highest Rated</option>
                    <option value="4">Lowest Rated</option>
                </Form.Select>
            </div>
            {props.allReviews.length > 0 &&
                <div id="clear">
                    <ReviewSummary allReviews={props.allReviews} />
                    <div id="page" style={review_display_styles.review.container}>
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