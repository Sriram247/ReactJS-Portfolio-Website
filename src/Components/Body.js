import {useState} from 'react';
import './Body.css';

export function Body(){

    const [currentHeader,setCurrentHeader] = useState("Home");

    return(
        <>

        <style>

        </style>
        <div className="body">
        <div className='text'>

        <h3>
            Hi, I'm Sriram Ramesh
        </h3>
        <h2>
            An Aspiring Entrepreneur trying react!<br></br>
            Based in Halifax, Canada.
        </h2>
        
        </div>
        <div className="image">
            <img src={`${process.env.PUBLIC_URL}/hero-pic.png`} alt="My Portfolio Screenshot" />

        </div>
        </div>
        </>

    )

}