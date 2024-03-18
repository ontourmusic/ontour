import React, { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";
import { useNavigate } from "react-router";
import { RiStarFill } from "react-icons/ri";
import artist_styles from "../Styles/artist_styles";
import { AiOutlineUser } from "react-icons/ai";

const ArtistEventReview = ({ artistID }) => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const getEventReviews = async () => {
    try {
      const { data, error } = await supabase
        .from("artist_reviews")
        .select(
          "rating,review,name,artist_events(artists(name,artist_id),venues(name,venue_id),date)"
        )
        // .eq("artist_events_id","not",null)
        .eq("artist_events.artist_id", artistID);
      if (!error) {
        //   console.log(data, "eventData");
        setData(data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getEventReviews();
    console.log("data");
  }, [artistID]);
  return (
    <div>
      {!!data.length ? (
        data.map(
          (e) =>
            e.artist_events && (
              <div style={artist_styles.review_display.review}>
                <div class="d-flex bd-highlight">
                  <div class="p-1 bd-highlight">
                    <AiOutlineUser size={23} />{" "}
                  </div>
                  <div class="p-1 bd-highlight">
                    <h6 class="review-user">{e.name}</h6>
                  </div>
                  <br></br>
                </div>
                <div>
                  <div class="d-flex bd-highlight mb-2">
                    {Array(5)
                      .fill()
                      .map((_, i) => (
                        <RiStarFill
                          color={i < e.rating ? "#faaf00" : "#bdbdbd"}
                          size={20}
                          key={i}
                        />
                      ))}
                  </div>
                  <div align="left" class="d-flex bd-highlight mb-2">
                    <small>
                      {e.artist_events.date} •{" "}
                      <small
                        style={{ cursor: "pointer" }}
                        onClick={() =>
                          navigate(
                            `/venue?venue=${e.artist_events.venues.name}&id=${e.artist_events.venues.venue_id}`
                          )
                        }
                      >
                        {e.artist_events.venues.name}
                      </small>
                    </small>
                  </div>
                </div>
                <div class="d-flex w-100 justify-content-start">
                  <p
                    id="rating-text"
                    style={{ whiteSpace: "pre-wrap" }}
                    class="mb-2"
                    align="left"
                  >
                    {e.review}
                  </p>
                </div>
              </div>
            )
        )
      ) : (
        <></>
      )}
    </div>
  );
};

export default ArtistEventReview;
