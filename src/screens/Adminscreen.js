import React, { useEffect, useState } from "react";
import { Tabs } from "antd";
import axios from "axios";
import Loader from "../components/Loader";
import Error from "../components/Error";
import Swal from "sweetalert2"

const { TabPane } = Tabs;

function Adminscreen() {
  useEffect(() => {
    if (!JSON.parse(localStorage.getItem("currentUser")).isAdmin) {
      window.location.href = "/home";
    }
  }, []);
  return (
    <div className="mt-3 ml-3 mr-3 bs">
      <h2 className="text-center">Admin Panel</h2>
      <Tabs defaultActiveKey="1">
        <TabPane tab="Bookings" key="1">
          <Bookings />
        </TabPane>
        <TabPane tab="Flights" key="2">
          <Planes />
        </TabPane>
        <TabPane tab="Add Flights" key="3">
          <Addplane/>
        </TabPane>
        <TabPane tab="Users" key="4">
          <Users />
        </TabPane>
      </Tabs>
    </div>
  );
}

export default Adminscreen;

//Booking list component

export function Bookings() {
  const [bookings, setbookings] = useState([]);
  const [loading, setloading] = useState(true);
  const [error, seterror] = useState();
  useEffect(async () => {
    try {
      const data = await (await axios.get("/api/bookings/getallbookings")).data;
      setbookings(data);
      setloading(false);
    } catch (error) {
      console.log(error);
      setloading(false);
      seterror(error);
    }
  }, []);
  return (
    <div className="row">
      <div className="col-md-12">
        <h4>Booking..!</h4>
        {loading && <Loader />}
        <table className="table table-bordered table-dark">
          <thead >
            <tr>
              <th>Booking Id</th>
              <th>User Id</th>
              <th>Flight</th>
              <th>Date</th>
              <th>Place</th>
              <th>Time</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {bookings.length &&
              bookings.map((booking) => {
                return (
                  <tr>
                    <td>{booking._id}</td>
                    <td>{booking.userid}</td>
                    <td>{booking.plane}</td>
                    <td>{booking.ondate}</td>
                    <td>{booking.place}</td>
                    <td>{booking.time}</td>
                    <td>{booking.status}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
        {bookings.length && <p>There are total {bookings.length} bookings</p>}
      </div>
    </div>
  );
};

//Flight list component

export function Planes() {
  const [planes, setplanes] = useState([]);
  const [loading, setloading] = useState(true);
  const [error, seterror] = useState();
  useEffect(async () => {
    try {
      const data = await (await axios.get("/api/planes/getallplanes")).data;
      setplanes(data);
      setloading(false);
    } catch (error) {
      console.log(error);
      setloading(false);
      seterror(error);
    }
  }, []);
  return (
    <div className="row">
      <div className="col-md-12">
        <h4>Flights</h4>
        {loading && <Loader />}
        <table className="table table-bordered table-dark">
          <thead >
            <tr>
              <th> Flight Id</th>
              <th>Name</th>
              <th>Place</th>
              <th>Travel Hours</th>
              <th>Ticket Amount</th>
              <th>Time</th>
              <th>stop</th>
            </tr>
          </thead>

          <tbody>
            {planes.length &&
              planes.map((plane) => {
                return (
                  <tr>
                    <td>{plane._id}</td>
                    <td>{plane.name}</td>
                    <td>{plane.place}</td>
                    <td>{plane.travelhours}</td>
                    <td>{plane.amount}</td>
                    <td>{plane.time}</td>
                    <td>{plane.stop}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
}


//Userd list component
export function Users() {
  const [users, setusers] = useState([]);
  const [loading, setloading] = useState(true);
  const [error, seterror] = useState();
  useEffect(async () => {
    try {
      const data = await (await axios.get("/api/users/getallusers")).data;
      setusers(data);
      setloading(false);
    } catch (error) {
      console.log(error);
      setloading(false);
      seterror(error);
    }
  }, []);
  return (
    <div className="row">
      <div className="col-md-12">
        <h4>users</h4>
        {loading && <Loader />}
        <table className="table table-dark table-bordered">
          <thead>
            <tr>
              <th>User Id</th>
              <th>Name</th>
              <th>Email</th>
              <th>Is Admin</th>
            </tr>
          </thead>
          <tbody>
            {users &&
              users.map((user) => {
                return (
                  <tr>
                    <td>{user._id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.isAdmin ? "YES" : "NO"}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
//Add Flight component

export function Addplane(){

    const [loading, setloading] = useState(false);
  const [error, seterror] = useState();
    const[name, setname]=useState('')
    const[place, setplace]=useState('')
    const[time,settime]=useState('')
    const[amount,setamount]=useState('')
    const [travelhours,settravelhours]=useState('')
    const[description,setdescription]=useState('')
    const[stop,setstop]=useState('')
    const[imageurl1,setimageurl1]=useState('')
    const[imageurl2,setimageurl2]=useState('')
    const[imageurl3,setimageurl3]=useState('')

    async function addFlight(){

        const newflight={
            name,
            place,
            time,
            amount,
            travelhours,
            description,
            stop,
            imageurls:[imageurl1,imageurl2,imageurl3]

        }
        
        try {
            setloading(true)
            const result= await (await axios.post('/api/planes/addplane',newflight)).data
            console.log(result)
            setloading(false)
            Swal.fire('Congrats','Your New Flight Added Successfully','success').then(result=>{
                window.location.href="/home"
            })
        } catch (error) {
            console.log(error)
            setloading(false)
            Swal.fire('Oops','Something Went Wrong','error')
            
        }
    }

    return(
        <div className='row'>
            {loading &&<Loader/>}
            <div className='col-md-5'>
            <input type='text' className='from-control' placeholder='Flight Name'
            value={name} onChange={(e)=>{setname(e.target.value)}}
            />
            <input type='text' className='from-control' placeholder='Place'
            value={place} onChange={(e)=>{setplace(e.target.value)}}
            />
            <input type='text' className='from-control' placeholder='Time'
            value={time} onChange={(e)=>{settime(e.target.value)}}
            />
            <input type='text' className='from-control' placeholder='Amount'
            value={amount} onChange={(e)=>{setamount(e.target.value)}}
            />
            <input type='text' className='from-control' placeholder='Travel Hours'
            value={travelhours} onChange={(e)=>{settravelhours(e.target.value)}}
            />
            <input type='text' className='from-control' placeholder='Description'
            value={description} onChange={(e)=>{setdescription(e.target.value)}}
            />
            </div>
            <div className='col-md-5'>
            <input type='text' className='from-control' placeholder='Stop Or Non-Stop'
            value={stop} onChange={(e)=>{setstop(e.target.value)}}
            />
            <input type='text' className='from-control' placeholder='Logo url'
            value={imageurl1} onChange={(e)=>{setimageurl1(e.target.value)}}
            />
            <input type='text' className='from-control' placeholder='Outer flight pic url'
            value={imageurl2} onChange={(e)=>{setimageurl2(e.target.value)}}
            />
            <input type='text' className='from-control' placeholder='Inner flight pic url'
            value={imageurl3} onChange={(e)=>{setimageurl3(e.target.value)}}
            />


            <div className='text-right'>
                <button className='btn btn-primary mt-2'onClick={addFlight}>Add Flight</button>

            </div>

            </div>
            
        </div>
    )
}