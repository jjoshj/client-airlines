import React, { useState, useEffect } from "react";
import axios from "axios";
import Loader from "../components/Loader";
import Error from "../components/Error";
import moment from "moment";
import StripeCheckout from "react-stripe-checkout";
import Swal from "sweetalert2"


function Bookingscreen({ match }) {
  const [loading, setloading] = useState(true);
  const [error, seterror] = useState();

 
  const [plane, setplane] = useState();
  const [totalamount, settotalamount] = useState();
  const [time, settime] = useState();
  const [place, setplace] = useState();

  useEffect(async () => {

    if(!localStorage.getItem('currentUser')){
      window.location.href='/login'
    }
    try {
      setloading(true);
      const data = (
        await axios.post("/api/planes/getplanebyid", {
          planeid: match.params.planeid,
        })
      ).data;
      settotalamount(data.amount + 400);
      settime(data.time);
      setplace(data.place);
      setplane(data);
      setloading(false);
    } catch (error) {
      setloading(false);
      seterror(true);
    }
  }, []);
  const ondate = moment(match.params.ondate, "DD-MM-YYYY");

  async function bookRoom() {
    const bookingDetails = {
      plane,
      userid: JSON.parse(localStorage.getItem("currentUser"))._id,
      ondate,
      time,
      place,
      totalamount,
    };
    try {
      const result = await axios.post(
        "/api/bookings/bookplane",
        bookingDetails
      );
    } catch (error) {}
  }

  async function onToken(token) {
    
    const bookingDetails = {
        plane,
        userid: JSON.parse(localStorage.getItem("currentUser"))._id,
        ondate,
        time,
        place,
        totalamount,
        token
      };
      try {
          setloading(true);
        const result = await axios.post(
          "/api/bookings/bookplane",
          bookingDetails
        );
        setloading(false)
       Swal.fire('Congratulation', 'Your Ticked Booked Successfully','success').then(result=>{
       window.location.href='/profile'
       })
      } catch (error) {
          setloading(false)
          Swal.fire('Oops', 'Something Went Wrong','error')
      }
  };

  return (
    <div className="m-5">
      {loading ? (
        <Loader />
      ) : plane ? (
        <div>
          <div className="row justify-content-center mt-5 bs">
            <div className="col-md-6">
              <h4>{plane.name}</h4>
              <img src={plane.imageurls[0]} className="bigimg" />
            </div>
            <div className="col-md-6">
              <div style={{ textAlign: "right" }}>
                <h3>Booking Details</h3>
                <hr />
                <b>
                  <p>
                    Name : {JSON.parse(localStorage.getItem('currentUser')).name}
                  </p>
                  <p>Date : {match.params.ondate}</p>
                  <p>Time : {time}</p>
                  <p>Place: {place}</p>
                </b>
              </div>
              <div style={{ textAlign: "right" }}>
                <b>
                  <h1>Amount</h1>
                  <hr />
                  <p>Ticket Amount : ₹{plane.amount}</p>
                  <p>Tax : ₹400</p>
                  <p>Total Amount : ₹{totalamount}</p>
                </b>
              </div>

              <div style={{ float: "right" }}>
                <StripeCheckout
                  amount={totalamount * 100}
                  token={onToken}
                  currency="INR"
                  stripeKey="pk_test_51JojkhSH4Nr91unFza0lRjfJklBFLj1CVj1jBYtEbFqqa4pxGBjQFA6KWgG6gbLjPs1cZvbUnCg06qantzk6wdC300Gee7yc2W"
                >
                  <button className="btn btn-primary">Pay Now</button>
                </StripeCheckout>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Error />
      )}
    </div>
  );
}

export default Bookingscreen;
