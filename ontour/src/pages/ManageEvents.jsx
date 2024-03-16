import React, { useEffect, useState } from "react";
import { supabase } from "../components/supabaseClient";

const ManageEvents = () => {
  const [artist, setArtist] = useState(null);
  const [venue, setVenue] = useState(null);
  const [date, setDate] = useState(null);
  const [artistNames, setArtistNames] = useState([]);
  const [venueNames, setVenueNames] = useState([]);
  const [eventData, setEventData] = useState([]);
  const [editId, setEditId] = useState(null);
  const getArtistNames = async () => {
    try {
      const { data, error } = await supabase.from("artists").select("*");
      if (!error) {
        setArtistNames(data);
      }
      // console.log();
    } catch (error) {
      console.log(error);
    }
  };
  const getVenueNames = async () => {
    try {
      const { data, error } = await supabase.from("venues").select("*");
      if (!error) {
        setVenueNames(data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!artist || !venue || !date) {
      alert("Please fill all the fields properly");
      return;
    }
    try {
      const { error } = await supabase
        .from("artist_events")
        .insert({ artist_id: artist, venue_id: venue, date: date });
      if (!error) {
        alert("Event saved successfully");
        getEvents();
        setDate(null);
        setArtist(null);
        setVenue(null);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const getEvents = async () => {
    try {
      const { data, error } = await supabase
        .from("artist_events")
        .select(`id,artists(artist_id, name),venues(venue_id, name),date`);

      if (!error) {
        console.log(data, "eventData");
        setEventData(data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const editClicked = (id, artist, venue, date) => {
    console.log(id, artist, venue, date);
    setEditId(id);
    setArtist(artist);
    setVenue(venue);
    setDate(date);
  }
  const handleEditSubmit = async () => {
    if (!artist || !venue || !date) {
      alert("Please fill all the fields properly");
      return;
    }
    console.log(editId, artist, venue, date);
    // try {
    //   const { error } = await supabase
    //     .from("artist_events")
    //     .update({ artist_id: artist, venue_id: venue, date: date })
    //     .eq("id", id);
    //   if (!error) {
    //     alert("Event updated successfully");
    //     getEvents();
    //     setDate(null);
    //     setArtist(null);
    //     setVenue(null);
    //   }
    // } catch (error) {
    //   console.log(error);
    // }
  };

  const deleteEvent = async (id, artist, venue, date) => {
    if (
      window.confirm(
        `Are you sure you want to delete the event of ${artist} at ${venue} on ${date} ?`
      ) == true
    ) {
      try {
        const { error } = await supabase
          .from("artist_events")
          .delete()
          .eq("id", id);
        if (!error) {
          getEvents();
          alert("Event deleted successfully");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  useEffect(() => {
    getArtistNames();
    getVenueNames();
    getEvents();
  }, []);

  return (
    <div>
      <h1>Manage Events</h1>
      <div className="container">
        <form onSubmit={handleSubmit} className="form-control d-flex">
          <input
            onChange={(e) => setDate(e.target.value)}
            className="form-control"
            type="date"
          />
          <select
            onChange={(e) => setArtist(e.target.value)}
            className="form-select"
            name="artist"
            id=""
          >
            <option value="false">Select artist</option>
            {!!artistNames.length &&
              artistNames.map((artist) => {
                return <option value={artist.artist_id}>{artist.name}</option>;
              })}
          </select>
          <select
            onChange={(e) => setVenue(e.target.value)}
            className="form-select"
            name="venue"
            id=""
          >
            <option value="false">Select venue</option>
            {!!venueNames.length &&
              venueNames.map((venue) => {
                return <option value={venue.venue_id}>{venue.name}</option>;
              })}
          </select>
          <button type="submit">Save</button>
        </form>
        <table class="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Date</th>
              <th scope="col">Artist</th>
              <th scope="col">Venue</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {!!eventData.length ? (
              eventData.map((event) => {
                return (
                  <tr>
                    <th scope="row">{event.id}</th>
                    <td>{event.date}</td>
                    <td>{event.artists.name}</td>
                    <td>{event.venues.name}</td>
                    <td>
                      <button
                        type="button"
                        class="btn btn-primary"
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal"
                        onClick={() => editClicked(event.id, event.artists.artist_id, event.venues.venue_id, event.date)}
                        className="btn btn-primary mx-5"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() =>
                          deleteEvent(
                            event.id,
                            event.artists.name,
                            event.venues.name,
                            event.date
                          )
                        }
                        className="btn btn-danger mx-5"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <>Loading...</>
            )}
          </tbody>
        </table>
      </div>

      <div
        class="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">
                Edit Event
              </h1>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <form  className="form-control d-flex">
                <input
                  onChange={(e) => setDate(e.target.value)}
                  className="form-control"
                  type="date"
                  value={date}
                />
                <select
                  onChange={(e) => setArtist(e.target.value)}
                  className="form-select"
                  name="artist"
                  id=""
                >
                  <option value="false">Select artist</option>
                  {!!artistNames.length &&
                    artistNames.map((artist) => {
                      return (
                        <option selected={artist.artist_id === artist} value={artist.artist_id}>{artist.name}</option>
                      );
                    })}
                </select>
                <select
                  onChange={(e) => setVenue(e.target.value)}
                  className="form-select"
                  name="venue"
                  id=""
                >
                  <option value="false">Select venue</option>
                  {!!venueNames.length &&
                    venueNames.map((venue) => {
                      return (
                        <option selected={venue.venue_id === venue}   value={venue.venue_id}>{venue.name}</option>
                      );
                    })}
                </select>
                <button type="submit">Save</button>
              </form>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="button" class="btn btn-primary">
                Edit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageEvents;
