import React, { useState, useEffect } from "react";
import axios from "axios";
import Error from "../components/Error";
import Plane from "../components/Planes";
import Loader from "../components/Loader";
import { DatePicker } from "antd";
import moment from "moment";
import "antd/dist/antd.css";

function Homescreen() {
  const [planes, setplanes] = useState([]);
  const [loading, setloading] = useState();
  const [error, seterror] = useState();

  const [ondate, setondate] = useState();
  const [duplicateplanes, setduplicateplanes] = useState();

  const [searchkey, setsearchkey] = useState("");
  const [places, setplaces] = useState("all");

  useEffect(async () => {
    try {
      setloading(true);
      const data = (await axios.get("/api/planes/getallplanes")).data;
      setplanes(data);
      setduplicateplanes(data);

      setloading(false);
    } catch (error) {
      seterror(true);
      console.log(error);
      setloading(false);
    }
  }, []);

  function filterByDate(dates) {
    setondate(moment(dates).format("DD-MM-YYYY"));

    var tempplanes = [];
    var availability = false;
    for (const plane of duplicateplanes) {
      if (plane.currentbookings.length > 0) {
        for (const booking of plane.currentbookings){
          if(!moment(moment(dates[0]).format('DD-MM-YYYY')).isBetween( booking.ondate))
          {
          if (moment(dates).format("DD-MM-YYYY") === booking.ondate) {
            availability = true;
          }
        }
      }
      }
      if(availability=true || plane.currentbookings.length==0)
      {
        tempplanes.push(plane)
      }
    }
  }

  function filterBySearch() {
    const tempplanes = duplicateplanes.filter((plane) =>
      plane.name.toLowerCase().includes(searchkey.toLowerCase())
    );
    setplanes(tempplanes);
  }

  function filterByPlace(e) {
    setplaces(e);
    if (e !== "all") {
      const tempplanes = duplicateplanes.filter(
        (plane) => plane.place.toLowerCase() == e.toLowerCase()
      );
      setplanes(tempplanes);
    } else {
      setplanes(duplicateplanes);
    }
  }
  function refreshFilter() {
    window.location.reload(false);
  }

  return (
    <div className="container">
      <div className="row mt-5 bs">
        <div className="col-md-3">
          <DatePicker format="DD-MM-YYYY" onChange={filterByDate} />
        </div>
        <div className="col-md-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search Flights"
            value={searchkey}
            onChange={(e) => {
              setsearchkey(e.target.value);
            }}
            onKeyUp={filterBySearch}
          />
        </div>
        <div className="col-md-3">
          <select
            className="form-control"
            value={places}
            onChange={(e) => {
              filterByPlace(e.target.value);
            }}
          >
            <option>All</option>
            {!loading && planes.map((plane) => {
              return (
                <>
                  <option>{plane.place}</option>
                </>
              );
            })}
          </select>
        </div>
        <div className="col-md-3">
          <button className='refresh' onClick={refreshFilter}>Refresh Filters</button>
        </div>
      </div>
      <div className="row justify-content-center mt-3">
        {loading ? (
          <Loader />
        ) : (
          planes.map((plane) => {
            return (
              <div className="col-md-12 mt-2">
                <Plane plane={plane} ondate={ondate} />
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Homescreen;
