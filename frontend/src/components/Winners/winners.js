import React from 'react';
import img from "../../assets/winner.png";
import "./winners.css";

export default function winners() {
  return (
    <div>
        <div className='winner-body'>
        <img src={img}className="winner-img"alt="certificate" />
        <div className="winner-name-div">Divya Raj</div>
        <div className="position-div">1st</div>
        <div className="event-name-div">Footloose</div>
      
        </div>
      
    </div>
  )
}
