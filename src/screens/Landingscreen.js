import React from 'react'
import {Link} from "react-router-dom"
import AOS from 'aos';
import 'aos/dist/aos.css'; // You can also use <link> for styles
// ..
AOS.init({
    duration:2000
});
function Landingscreen(){
    return(
        <div className="row landing justify-content-center mr-15px ml-15px">
            <div className='col-md-11 my-auto text-center' >
                <h3 data-aos='zoom-in' style={{color:'white', fontSize:'90px'}}>Josh AirLines</h3>
                <p data-aos='zoom-out' style={{color:'white'}}>Book Flights With In India</p>
                <Link to="/home">
                <button className='btn landingbtn 'style={{color:'black'}}>Fly With Us</button>
                </Link>

            </div>

        </div>
    )
};

export default Landingscreen