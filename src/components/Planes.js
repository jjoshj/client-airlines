import React,{useState} from "react";
import {Modal, Button, Carousel} from "react-bootstrap"
import {Link} from 'react-router-dom'
import AOS from 'aos';
import 'aos/dist/aos.css'; // You can also use <link> for styles
// ..
AOS.init({
    duration:1000
});

function Plane({ plane ,ondate}) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true);
  return (
    <div className="row bs" data-aos='fade-up'>
      <div className="col-md-2">
        <img src={plane.imageurls[0]} className="smallimg" />
      </div>
      <div className="col-md-2">
        <h3>{plane.name}</h3>
      </div>
      <div className="col-md-2">
        <p>{plane.place}</p>
      </div>
      <div className="col-md-2">
        <p>{plane.time}</p>
      </div>
      <div className="col-md-1">
        <p>₹{plane.amount}</p>
      </div>
      <div className="col-md-3">
          <div style={{ float: "right" }}>

            {ondate && (
  <Link to={`/book/${plane._id}/${ondate}`}>
  <button className="btn btn-primary mr-2  mt-1 " > Book Ticket</button>
  </Link>
            )}
            
        <button className="btn btn-primary mt-1"  onClick={handleShow} >
          View Details
        </button></div>
      </div>
      

      <Modal show={show} onHide={handleClose} size='lg' >
        <Modal.Header >
          <Modal.Title>{plane.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>


        <Carousel prevLabel="" nextLabel="">
 <Carousel.Item>
 <img
                  className="d-block w-100 bigimg"
                  src={plane.imageurls[1]}
                 
                />
            
              </Carousel.Item>
              <Carousel.Item>
 <img
                  className="d-block w-100 bigimg"
                  src={plane.imageurls[2]}
                 
                />
            
              </Carousel.Item>
           
  
</Carousel>
<h4>{plane.description}</h4>
<p><b>From - To    : </b>{plane.place}</p>
<p><b>Time         : </b>{plane.time}</p>
<p><b>Amount       : </b>₹ {plane.amount}</p>
<p><b>Travel Hours :</b> {plane.travelhours} Hours</p>
<h3>{plane.stop}</h3>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
         
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Plane;
