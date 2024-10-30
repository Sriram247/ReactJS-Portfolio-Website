import './App.css';
import './Body.css';
import React, { useState, useEffect, useRef } from 'react';


function App() {

    const [position, setPosition] = useState({ x: 0, y: 0, body:0 }); //Body-0 means its a circle, Body-1 means its on an image
    const [isHoveredSocialMedia, setIsHoveredSocialMedia] = useState(false);
    const [hoveredIndex, setHoveredIndex] = useState(null); 
    const [cursorEdit, setCursorEdit] = useState(true); //true is small,false is big
    const [cursorVisible, setCursorVisible] = useState(true); 
    const [positionOfImage, setPositionofImage] = useState({ top: 0, left: 0,bottom:0, right:0}); 
    const relativeImageRef = useRef(null);
    
    //Change to about:
    const[page,setPage] = useState("Home");

    useEffect(() => {
      const element = relativeImageRef.current;
      const rect = element.getBoundingClientRect();
      setPositionofImage({top: rect.top, left: rect.left, bottom:rect.bottom, right: rect.right})
      
      console.log("Top:", rect.top); // Position relative to the viewport
      console.log("Left:", rect.left); // Position relative to the viewport
    },[position]);
    

    useEffect(() => {
      // Function to update the state with the mouse position
      const handleMouseMove = (e) => {
        setPosition({ x: e.pageX, y: e.pageY });

        console.log(positionOfImage.left);
        const { clientX, clientY } = e;
        if (
          clientX >= positionOfImage.left &&
          clientX <= positionOfImage.right &&
          clientY >= positionOfImage.top &&
          clientY <= positionOfImage.bottom
        ){
          setCursorVisible(false);  // Hide cursor
          console.log("Cursor visible is false");
        }
        else{
          console.log("Cursor visible is released");
          setCursorVisible(true); 

        }
          console.log(e.pageX, e.pageY);
        };
        
      window.addEventListener('mousemove', handleMouseMove);
  
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
      };
    }, []);


    

      // Style object to position the follower div
    const followerStyle = {
      position: 'absolute',
      left: `${position.x}px`,
      top: `${position.y}px`,
      width: '60px',
      height: '60px',
      backgroundColor: 'transparent',
      borderRadius: '50%',
      pointerEvents: 'none', 
      transform: 'translate(-50%, -50%)', 
      zIndex:100,
      transition: 'opacity 0.2s ease ,width 0.3s ease, height 0.3s ease, transform 0.3s ease', 

      
    };
    const linkStyle = {
      position: 'absolute',
      left: `${position.x}px`,
      top: `${position.y}px`,
      width: '90px',
      height: '90px',
      backgroundColor: 'White',
      borderRadius: '50%',
      pointerEvents: 'none', 
      transform: 'translate(-50%, -50%)', 
      zIndex:100,
      //add smoother transition
      transition: 'width 0.5s ease, height 0.5s ease, transform 0.5s ease', 

    };
    const cursorGone = {
      position: 'absolute',
      left: `${position.x}px`,
      top: `${position.y}px`,
      width: '200px',
      height: '200px',
      backgroundColor: 'transparent',
      borderRadius: '50%',
      pointerEvents: 'none', 
      transform: 'translate(-50%, -50%)', 
      zIndex:100,
      opacity: '0',
      //add smoother transition
      transition: 'opacity 0.3s ease, width 0.2s ease, height 0.2s ease', 
    };

  const none = {};
    



    
    // Array of items
    const items = ['Home', 'About', 'Say Hello'];
    
    // Handle when mouse enters a list item
    const handleMouseEnter = (index) => {
        setHoveredIndex(index); // Set the hovered index to the current item
        setCursorEdit(false); // Set the hovered index to the current item

    };
    
    // Handle when mouse leaves a list item
    const handleMouseLeave = () => {
        setHoveredIndex(null); // Reset the hovered index when the mouse leaves
        console.log("Mouse became small");
        setCursorEdit(true); // Set the hovered index to the current item
    };

    const handleMouseEnterLogo = () => {
      setCursorEdit(false);
      console.log("Mouse entered logo")
    }

    const handleMouseLeaveLogo = () => {
      setCursorEdit(true);
      console.log("Mouse became small");

    }

    const handleMouseEnterSocialMedia = () => {
      setCursorEdit(false);
      setIsHoveredSocialMedia(true);
    };
  
    const handleMouseLeaveSocialMedia = () => {
      setCursorEdit(true);
      console.log("Mouse became small");

      setIsHoveredSocialMedia(false);
    };

  return (
    <>
    <div id="cursor" style={cursorEdit === false ? linkStyle : (cursorVisible === false ? cursorGone : followerStyle)}>
    </div>

    
        <div className="navbar-container">
            <div className="logo">
                <a href="#"
                onMouseEnter={() => handleMouseEnterLogo()}
                onMouseLeave={handleMouseLeaveLogo}>SR</a>
            </div>

            <div>
            <ul className="nav-links">
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
           

            <div className="social-media" >
                
                <a className={`socialMedia ${isHoveredSocialMedia ? "hovered" : ""}`}
                onMouseEnter={() => handleMouseEnterSocialMedia()}
                onMouseLeave={handleMouseLeaveSocialMedia}
                href="https://github.com/Sriram247">Github</a>

                <a className={`socialMedia ${isHoveredSocialMedia ? "hovered" : ""}`}
                onMouseEnter={() => handleMouseEnterSocialMedia()}
                onMouseLeave={handleMouseLeaveSocialMedia}
                href="https://www.linkedin.com/in/sriramramesh28/">LinkedIn</a>

            </div>
        </div>

    
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
        
        <img ref={relativeImageRef} className="background-image" src={`${process.env.PUBLIC_URL}/hero-pic.png`} alt="My Portfolio Screenshot" />
        <img 
          className="foreground-image" 
          src={`${process.env.PUBLIC_URL}/hero-pic-bw.png`} 
          alt="My Portfolio Screenshot" 
          style= {{clipPath: `circle(100px at ${position.x - positionOfImage.left}px ${position.y - positionOfImage.top}px)`}}/>
         

        </div>
        </div>
  


    
    </>
  );

}

export default App;
