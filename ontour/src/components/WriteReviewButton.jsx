import mixpanel from "mixpanel-browser";
import React from "react";

const WriteReviewButton = (props) => {
  // test
  function sendDataToMixPanel(){
    mixpanel.track("write_review_button_clicked",{
      "entity_id" : props.venueId || props.festivalId || props.artistID,
      "entity_name" : props.name,
      "entity_type" : ((props.venue && "venue") || (props.festival && "festival") || (props.artist && "artist"))
    })
  }
  return (
    <a href="#review">
      <button onClick={()=>sendDataToMixPanel()} id="writebutton" type="button" class="btn btn-dark fw-bold">
        <div class="row">
          <div class="col-md-3">
            <img id="review-icon" src="../../images/review.png" alt=""></img>
          </div>
          <div id="write-a-review" class="d-none d-md-block col-md-9">
            Write a Review
          </div>
        </div>
      </button>
    </a>
  );
};

export default WriteReviewButton;
