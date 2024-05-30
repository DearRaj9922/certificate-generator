import React from 'react'
import certimg from "../../assets/participation.png";
import name from "../Home/home.js";
import "./certificate.css"

export default function Certificate() {
  return (
    <div className='certificate-body'>
        <img src={certimg}className="certificate-img"alt="certificate" />
        <div className="name-div">Divya Raj</div>
        <div className="event-div">Footloose</div>
      
    </div>
    
  )
}
