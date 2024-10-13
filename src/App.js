import './App.css';
import {Body} from'.//Components/Body.js';
import React, { useState, useEffect } from 'react';


function App() {

    // State to store the current mouse position
    const [position, setPosition] = useState({ x: 0, y: 0 });


    useEffect(() => {
      // Function to update the state with the mouse position
      const handleMouseMove = (e) => {
        setPosition({ x: e.pageX, y: e.pageY });
      };
  
      // Add the event listener to track mouse movement
      window.addEventListener('mousemove', handleMouseMove);
  
      // Cleanup the event listener when the component unmounts
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
      };
    }, []);


      // Style object to position the follower div
    const followerStyle = {
      position: 'absolute',
      left: `${position.x}px`,
      top: `${position.y}px`,
      width: '40px',
      height: '40px',
      backgroundColor: 'transparent',
      borderRadius: '50%',
      pointerEvents: 'none', 
      transform: 'translate(-50%, -50%)', 
      zIndex:100,
      transition: 'width 0.3s ease, height 0.3s ease, transform 0.3s ease', 

      
    };
    const linkStyle = {
      position: 'absolute',
      left: `${position.x}px`,
      top: `${position.y}px`,
      width: '70px',
      height: '70px',
      backgroundColor: 'White',
      borderRadius: '50%',
      pointerEvents: 'none', 
      transform: 'translate(-50%, -50%)', 
      zIndex:100,
      //add smoother transition
      transition: 'width 0.5s ease, height 0.5s ease, transform 0.5s ease', 

    };



    
    const [hoveredIndex, setHoveredIndex] = useState(null); // To track which item is hovered
    const [cursorEdit, setCursorEdit] = useState("False"); // To track which item is hovered
    
    // Array of items
    const items = ['Home', 'About', 'Say Hello'];
    
    // Handle when mouse enters a list item
    const handleMouseEnter = (index) => {
        setHoveredIndex(index); // Set the hovered index to the current item
        setCursorEdit("True"); // Set the hovered index to the current item

    };
    
    // Handle when mouse leaves a list item
    const handleMouseLeave = () => {
        setHoveredIndex(null); // Reset the hovered index when the mouse leaves
        setCursorEdit("False"); // Set the hovered index to the current item

    };

  return (
    <>
    <div id="cursor" style={cursorEdit === "True" ? linkStyle : followerStyle}>
    </div>

    
        <div class="navbar-container">
            <div class="logo">
                <a href="#">SR</a>
            </div>

            <div>
            <ul class="nav-links">
                {items.map((item, index) => (
                  <li
                  key={index}
                  className={hoveredIndex === index ? 'link-grow' : ''}
                  onMouseEnter={() => handleMouseEnter(index)} 
                  onMouseLeave={handleMouseLeave}   
                  >
                    <a>
                        {item}
                    </a>
                    </li>
                ))}
            </ul>
                </div>
           

            <div class="social-media">
                <a href="#">Github</a>
                <a href="#">LinkedIn</a>

            </div>
        </div>

    <Body/>
  


    
    </>
  );

}

export default App;
