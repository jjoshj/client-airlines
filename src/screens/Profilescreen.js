import React, { useEffect, useState } from "react";
import { Tabs } from "antd";
import Loader from "../components/Loader";
import Error from "../components/Error";
import axios from "axios";
import Swal from "sweetalert2";
import { Tag, Divider } from 'antd';
const { TabPane } = Tabs;

function Profilescreen() {
  const user = JSON.parse(localStorage.getItem("currentUser"));

  useEffect(() => {
    if (!user) {
      window.location.href = "/login";
    }
  }, []);

  return (
    <div className="ml-3 mt-3">
      <Tabs defaultActiveKey="1">
        <TabPane tab="profile" key="1">
          <h1>My profile</h1>
          <br />
          <h3>Name :{user.name} </h3>
          <h3>Email :{user.email}</h3>
          <h3>isAdmin :{user.isAdmin ? "YES" : "NO"}</h3>
        </TabPane>
        <TabPane tab="Bookings" key="2">
          <Mybookings />
        </TabPane>
      </Tabs>
    </div>
  );
}

export default Profilescreen;

export function Mybookings() {
  const user = JSON.parse(localStorage.getItem("currentUser"));
  const [bookings, setbookings] = useState([]);
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState();

  useEffect(async () => {
    try {
      setloading(true);
      const data = await (
        await axios.post("/api/bookings/getbookingsbyuserid", {
          userid: user._id,
        })
      ).data;
      console.log(data);
      setbookings(data);
      setloading(false);
    } catch (error) {
      console.log(error);
      setloading(false);
      seterror(error);
    }
  }, []);

  async function cancelBooking(bookingid, planeid) {
    try {
      setloading(true);
      const result = await (
        await axios.post("/api/bookings/cancelbooking", { bookingid, planeid })
      ).data;
      console.log(result);
      setloading(false);
      Swal.fire("Congrats", "Your Booking has been Cancelled", "success").then(
        (result) => {
          window.location.reload();
        }
      );
    } catch (error) {
      console.log(error);
      setloading(false);
      Swal.fire("Oops", "Something Went Wrong", "error");
    }
  }
  return (
    <div>
      <div className="row">
        <div className="col-md-6">
          {loading && <loading />}
          {bookings &&
            bookings.map((booking) => {
              return (
                <div className="bs">
                  <h1>{booking.plane}</h1>
                  <p>
                    <b>BookingId :</b>
                    {booking._id}
                  </p>
                  <p>
                    <b>Time :</b>
                    {booking.time}
                  </p>
                  <p>
                    <b>Place :</b>
                    {booking.place}
                  </p>
                  <p>
                    <b>Amount :</b> {booking.totalamount}
                  </p>
                  <p>
                    <b>Status :</b>
                    {booking.status == 'cancelled' ? (<Tag color="red">CANCELLED</Tag>) : (<Tag color="green">CONFIRMED</Tag>)}
                  </p>

                  {booking.status !== "cancelled" && (
                    <div className="text-right">
                      <button
                        className="btn btn-primary"
                        onClick={() => {
                          cancelBooking(booking._id, booking.planeid);
                        }}
                      >
                        CANCEL BOOKING
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}
