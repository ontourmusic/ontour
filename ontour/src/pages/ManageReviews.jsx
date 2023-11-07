import React, { useEffect, useState } from 'react';
import "../index.css";
import "react-multi-carousel/lib/styles.css"; 
import { Helmet } from "react-helmet";
import { useAuth0 } from "@auth0/auth0-react";
import { Grid, TextField, Button} from "@mui/material";
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
import Form from 'react-bootstrap/Form';
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

  // Getting artist id
  useEffect(() => {
    if (isAuthenticated && user) {
      if (user['https://tourscout.com/user_metadata'] && user['https://tourscout.com/user_metadata'].artist_id) {
        setArtistID(user['https://tourscout.com/user_metadata'].artist_id);
      }
    }
    console.log(artistID);
  }, [user, isAuthenticated, artistID]);

  const supabase = createClient('https://zouczoaamusrlkkuoppu.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpvdWN6b2FhbXVzcmxra3VvcHB1Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY3ODE1ODUyMSwiZXhwIjoxOTkzNzM0NTIxfQ.LTuL_u0tzmsj8Zf9m6JXN4JivwLq1aRXvU2YN-nDLCo')
  // Getting artist reviews
  const getReviews = async () => {
    try {
      const getReviewsSupabase = await supabase.from('artist_reviews').select('*').eq('artist_id', 13);
      const reviewData = getReviewsSupabase["data"];

      setAllReviews(parseReviewData(reviewData));

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


  useEffect(() => {
    getReviews();
    // console.log(allReviews);
  }, []);

  return (
      <>
            <Helmet>
            </Helmet>
            <Grid container spacing={1}>
                <Grid item xs={12}>
                    <Navigation navbar={false}/>
                </Grid>
                <Grid item xs={12} md={3}>
                    <BusinessSidebar />
                </Grid>
                <Grid item xs={12} md={9}> 
                  <PaginatedItems itemsPerPage={10} />
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