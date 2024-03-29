import React, { useEffect, useRef, useState } from "react";
import { supabase } from "../components/supabaseClient";
import AddNewVenue from "../components/AddNewVenue";
import Select from "react-select";
import AsyncSelect from "react-select/async";
import { RiDeleteBinFill, RiEditFill } from "react-icons/ri";
import AddNewArtist from "../components/AddNewArtist";
const ManageEvents = () => {
  const [artist, setArtist] = useState(null);
  const [venue, setVenue] = useState(null);
  const [date, setDate] = useState(null);
  const [artistNames, setArtistNames] = useState([]);
  const [venueNames, setVenueNames] = useState([]);
  const [eventData, setEventData] = useState([]);
  const [selectDropdownSearch, setSelectDropdownSearch] = useState(null);
  const [editId, setEditId] = useState(null);
  const [searchDate, setSearchDate] = useState(null);
  const [searchArtist, setSearchArtist] = useState(null);
  const [searchVenue, setSearchVenue] = useState(null);
  const [searchData, setSearchData] = useState([]);
  const [openVenue, setOpenVenue] = useState(false);
  const [openArtist, setOpenArtist] = useState(false);
  const [reset, setReset] = useState(false);
  const closeModalRef = useRef();
  const searchFormRef = useRef();
  const formRef = useRef();
  const selectRef = useRef();
  let artistData = [];
  let venueData = [];
  const getArtistNames = async () => {
    try {
      const { data, error } = await supabase
        .from("artists")
        .select("*")
        .order("name", { ascending: true });
      if (!error) {
        // setArtistNames(data);
        for (let i = 0; i < data.length; i++) {
          artistData.push({ value: data[i].artist_id, label: data[i].name });
        }
        setArtistNames(artistData);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const getVenueNames = async () => {
    try {
      const { data, error } = await supabase
        .from("venues")
        .select("*")
        .order("name", { ascending: true });
      if (!error) {
        for (let i = 0; i < data.length; i++) {
          venueData.push({ value: data[i].venue_id, label: data[i].name });
        }
        setVenueNames(venueData);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(artist, venue, date);
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
        formRef.current.reset();
        // selectRef.clearValue();
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
  };
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    if (!artist || !venue || !date) {
      alert("Please fill all the fields properly");
      return;
    }
    console.log(editId, artist, venue, date);
    try {
      const { error } = await supabase
        .from("artist_events")
        .update({ artist_id: artist, venue_id: venue, date: date })
        .eq("id", editId);
      if (!error) {
        getEvents();
        alert("Event updated successfully");
        setDate(null);
        setArtist(null);
        setVenue(null);
        setEditId(null);
      }
    } catch (error) {
      console.log(error);
    }
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
  const handleSearch = async (e) => {
    e.preventDefault();

    if (!searchArtist && !searchDate && !searchVenue) {
      alert("Please select values to search");
      return;
    }
    console.log(searchArtist, searchDate, searchVenue);
    try {
      let query = supabase
        .from("artist_events")
        .select(`id, artists(artist_id, name), venues(venue_id, name), date`);

      if (searchDate) {
        query = query.eq("date", searchDate);
      }

      if (searchArtist) {
        query = query.eq("artist_id", searchArtist);
      }

      if (searchVenue) {
        query = query.eq("venue_id", searchVenue);
      }

      const { data, error } = await query;
      if (!error) {
        console.log(data, "eventData");
        setSearchData(data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const resetSearch = () => {
    console.log("reset");
    searchFormRef.current.reset();
    setReset(true);
    setSearchArtist(null);
    setSearchDate(null);
    setSearchVenue(null);
    setSearchData([]);
  };
  useEffect(() => {
    getArtistNames();
    getVenueNames();
    getEvents();
  }, []);

  return (
    <>
      <div>
        <h1>Manage Events</h1>
        <div className="container">
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="form-control d-flex flex-column"
          >
            <h3 className="align-self-start">Add Events</h3>
            <div className="d-flex flex-row">
            <input
              onChange={(e) => setDate(e.target.value)}
              className="form-control"
              type="date"
            />
            <Select
              placeholder="Select Artist"
              ref={selectRef}
              options={artistNames}
              className="form-control"
              onChange={(e) => {
                setArtist(e.value);
              }}
            />
            <Select
              placeholder="Select Venue"
              options={venueNames}
              className="form-control"
              onChange={(e) => {
                setVenue(e.value);
              }}
            />

            <button className="btn btn-sm btn-info" type="submit">
              Save
            </button>
            </div>
          </form>
          <div className="d-flex align-items-center justify-content-between p-2 ">
            <button
              onClick={() => setOpenVenue(true)}
              type="button"
              className="btn btn-sm btn-outline-warning"
            >
              Add New Venue
            </button>
            <button
              onClick={() => setOpenArtist(true)}
              type="button"
              className="btn btn-sm btn-outline-danger"
            >
              Add New Artist
            </button>
          </div>

          <form
            ref={searchFormRef}
            onSubmit={handleSearch}
            className="form-control d-flex flex-column"
          >
               <h3 className="align-self-start">Search Events</h3>
               <div className="d-flex flex-row">
            <input
              onChange={(e) => setSearchDate(e.target.value)}
              className="form-control"
              type="date"
              value={searchDate}
            />
            <Select
              placeholder="Select Venue"
              options={venueNames}
              className="form-control"
              onChange={(e) => {
                setSearchVenue(e.value);
              }}
            />

            <Select
              placeholder="Search Artist"
              options={artistNames}
              className="form-control"
              onChange={(e) => {
                setSearchArtist(e.value);
              }}
            />

            <button type="submit" className="btn btn-sm btn-info">
              Search
            </button>
            <button
              type="button"
              onClick={resetSearch}
              className="btn btn-sm btn-danger"
            >
              Reset
            </button>
            </div>
          </form>

          {openVenue && (
            <AddNewVenue
              getVenueNames={getVenueNames}
              setOpenVenue={setOpenVenue}
            />
          )}
          {openArtist && (
            <AddNewArtist
              getArtistNames={getArtistNames}
              setOpenArtist={setOpenArtist}
            />
          )}
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
              {(searchData.length ? searchData : eventData).map((event) => (
                <tr key={event.id}>
                  <th scope="row">{event.id}</th>
                  <td>{event.date}</td>
                  <td>{event.artists.name}</td>
                  <td>{event.venues.name}</td>
                  <td>
                    <RiEditFill
                      size={25}
                      type="button"
                      className=" mx-5 text-warning"
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal"
                      onClick={() =>
                        editClicked(
                          event.id,
                          event.artists.artist_id,
                          event.venues.venue_id,
                          event.date
                        )
                      }
                    >
                      Edit
                    </RiEditFill>
                    <RiDeleteBinFill
                      size={25}
                      className="mx-5 text-danger"
                      onClick={() =>
                        deleteEvent(
                          event.id,
                          event.artists.name,
                          event.venues.name,
                          event.date
                        )
                      }
                      // className="btn btn-danger mx-5"
                    >
                      Delete
                    </RiDeleteBinFill>
                  </td>
                </tr>
              ))}
              {!searchData.length && !eventData.length && (
                <tr>
                  <td colSpan="5">Loading...</td>
                </tr>
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
                  ref={closeModalRef}
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={() => {
                    setDate(null);
                    setArtist(null);
                    setVenue(null);
                    setEditId(null);
                  }}
                ></button>
              </div>
              <div class="modal-body">
                <form
                  onSubmit={handleEditSubmit}
                  className="form-control d-flex"
                >
                  <input
                    onChange={(e) => setDate(e.target.value)}
                    className="form-control"
                    type="date"
                    value={date}
                  />
                  <Select
                    placeholder="Select Artist"
                    options={artistNames}
                    className="form-control"
                    onChange={(e) => {
                      setArtist(e.value);
                    }}
                  />

                  <Select
                    placeholder="Select Venue"
                    options={venueNames}
                    className="form-control"
                    onChange={(e) => {
                      setVenue(e.value);
                    }}
                  />

                  <button type="submit">Save</button>
                </form>
              </div>
              <div class="modal-footer"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ManageEvents;
