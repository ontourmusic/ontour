import React from "react";
import '../index.css';
export default function WriteReview(props)
{
    return (
        <div class="container pb-5" id="review">
          <h4 class="fw-bold">Write a Review</h4>
          <hr></hr>
          <div class="rating">
            <input type="radio" name="rating" value="5" id="5"/><label for="5">☆</label>
            <input type="radio" name="rating" value="4" id="4"/><label for="4">☆</label>
            <input type="radio" name="rating" value="3" id="3"/><label for="3">☆</label>
            <input type="radio" name="rating" value="2" id="2"/><label for="2">☆</label>
            <input type="radio" name="rating" value="1" id="1"/><label for="1">☆</label>
          </div>
          <form>
            <div class="row">
              <div class="col">
                <input type="text" class="form-control" placeholder="First name"/>
              </div>
              <div class="col">
                <input type="text" class="form-control" placeholder="Last name"/>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <input type="text" class="form-control" placeholder="Event"/>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <textarea class="form-control" id="description" rows="3" placeholder="Description"></textarea>
              </div>
            </div>
            <div id="reviewbutton">
              <input class="btn btn-dark fw-bold" type="button" value="Submit"></input>
            </div>
          </form>
        </div>
    )
}