import React, { useEffect, useState } from 'react';
import "../index.css";
import "react-multi-carousel/lib/styles.css"; 
import Form from 'react-bootstrap/Form';
import { Helmet } from "react-helmet";
import { useAuth0 } from "@auth0/auth0-react";
import { Grid, TextField, Button} from "@mui/material";
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import Navigation from "../Navigation";
import ReactPaginate from 'react-paginate';
import BusinessSidebar from "../components/BusinessSidebar";
import Footer from "../components/Footer";
import artist_styles from '../Styles/artist_styles';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { createClient } from '@supabase/supabase-js';
import Review from "../components/Review";
import PropTypes from 'prop-types';
import ReviewSummary from '../components/ReviewSummary';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
const review_display_styles = artist_styles.review_display;



var myProps = {
    "id": 4,
    "user": "Noah",
    "date": "2017-03-25",
    "rating": 4,
    "venue": "Mt Smart Stadium",
    "text": "Great !",
    "count": -1,
    "likedUsers": [],
    "dislikedUsers": [],
    "reviewTable": "artist_reviews", 
    "response": "Glad you enjoyed",
};
/**
 * 
 * @returns =======
      <div>
        <h1>Under Construction</h1>
            <p>This page is currently under construction. Please check back later.</p>
            <Review id={4}
                user={"Noah"}
                date={"2017-03-25"}
                key={300}
                rating={4}
                venue={"Mt Smart Stadium"}
                text={"Great !"}
                count={-1}
                likedUsers={[]}
                dislikedUsers={[]}
                reviewTable={"artist_reviews"}
                 />
      </div>
>>>>>>> Stashed changes
 */

function ManageReviews() {

  const { isAuthenticated, user } = useAuth0();
  const [artistID, setArtistID] = useState("");
  const [allReviews, setAllReviews] = useState([]);
  const [reviewsToShow, setReviewsToShow] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const inputChange = (event) => {
      setSearchTerm(event.target.value);
  }

  const reviewSearch = () => {
      onReviewSearch(searchTerm);
  }

  // Getting artist id
  useEffect(() => {
    if (isAuthenticated && user) {
      if (user['https://tourscout.com/user_metadata'] && user['https://tourscout.com/user_metadata'].artist_id) {
        setArtistID(user['https://tourscout.com/user_metadata'].artist_id);
      }
    }
    console.log(artistID);
    getReviews();
  }, [user, isAuthenticated, artistID]);

  const supabase = createClient('https://zouczoaamusrlkkuoppu.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpvdWN6b2FhbXVzcmxra3VvcHB1Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY3ODE1ODUyMSwiZXhwIjoxOTkzNzM0NTIxfQ.LTuL_u0tzmsj8Zf9m6JXN4JivwLq1aRXvU2YN-nDLCo')
  // Getting artist reviews
  const getReviews = async () => {
    try {
      console.log('artistid',artistID);
      const getReviewsSupabase = await supabase.from('artist_reviews').select('*').eq('artist_id', artistID);
      const reviewData = getReviewsSupabase["data"];

      setAllReviews(parseReviewData(reviewData));
      console.log('reviews all', allReviews);
      console.log('reviews all', reviewsToShow);
      setReviewsToShow(allReviews)
    } catch {
      console.log('Webpage error. Please reload the page.');
    }
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
                reviewTable={"artist_reviews"}/>
            })}
        </>
    )
  } 
  
  function parseReviewData(reviewData) {
    var reviewsArray = [];
    var cumulativeRating = 0;
    for (var i = 0; i < reviewData.length; i++) {
        reviewsArray.push({
            "id": reviewData[i].id,                                              // review id
            "review": reviewData[i].review,                                      // review description
            "rating": reviewData[i].rating,                                      // review rating
            "name": reviewData[i].name,                                          // review author
            "event": reviewData[i].event,                                        // review event
            "eventDate": reviewData[i].eventDate,                                // review date
            "likeCount": reviewData[i].likeCount,                                // review like count
            "likedUsers": reviewData[i].likedUsers,                              // review liked users
            "dislikedUsers": reviewData[i].dislikedUsers                         // review disliked users
        });
        cumulativeRating += reviewData[i].rating;
    }
    // setAggregateRating(cumulativeRating / reviewData.length);
    // setTotalReviews(reviewData.length);
    return reviewsArray;
  } 

  function onReviewSearch() {
    
  }

  function onFormChange(event) {
    var tempArray = allReviews;
        if (event.target.value == 3) {
            tempArray.sort(function (a, b) {
                return b.rating > a.rating ? 1 : -1;
            });
        }
        //lowest to highest
        else if (event.target.value == 4) {
            tempArray.sort(function (a, b) {
                console.log(a.rating + " " + b.rating);
                return a.rating > b.rating ? 1 : -1;
            });
        }
        //oldest to newest
        else if (event.target.value == 2) {
            tempArray.sort(function (a, b) {
                return new Date(b.eventDate) < new Date(a.eventDate) ? 1 : -1;
            });
        }
        //newest to oldest
        else if (event.target.value == 1) {
            tempArray.sort(function (a, b) {
                return new Date(a.eventDate) < new Date(b.eventDate) ? 1 : -1;
            });
        }
        
        // setFilteredReviews(tempArray);
        // forceUpdate();
  }

  function onRatingChange() {

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
    const currentItems = allReviews.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(allReviews.length / itemsPerPage);

    // Invoke when user click to request another page.
    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % allReviews.length;
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


  // useEffect(() => {
  //   getReviews();
  //   // console.log(allReviews);
  // }, []);

  return (
      <>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Navigation navbar={false}/>
          </Grid>
          <Grid item xs={12} md={3}>
            <BusinessSidebar />
          </Grid>
          <Grid item xs={12} md={9}> 
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <hr />
              </Grid>
                <Grid item xs={12}>
                  <ReviewSummary allReviews={allReviews} />
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
                    <Form.Select onChange={onFormChange} aria-label="Default select example">
                      <option>Recommended</option>
                      <option value="1">Newest First</option>
                      <option value="2">Oldest First</option>
                      <option value="3">Highest Rated</option>
                      <option value="4">Lowest Rated</option>
                    </Form.Select>
                  </Grid>
                  <Grid item xs={6} md={3}>
                    {/* <div class="dropdown p-3"> */}
                    <Form.Select onChange={onRatingChange} aria-label="Default select example">
                      <option value="0">Filter by Rating</option>
                      <option value="1">1 Star</option>
                      <option value="2">2 Stars</option>
                      <option value="3">3 Stars</option>
                      <option value="4">4 Stars</option>
                      <option value="5">5 Stars</option>
                    </Form.Select>
                    {/* </div> */}
                  </Grid>
                <PaginatedItems itemsPerPage={10} />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <hr id="artist-footer"></hr>
            <Footer />
          </Grid>
        </Grid >
      </>
  );
}
  
export default ManageReviews;