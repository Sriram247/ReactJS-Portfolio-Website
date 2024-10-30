import React, { useState, useEffect } from 'react';

const Weather = () => {
    const [weatherData, setWeatherData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isCelsius, setIsCelsius] = useState(true); // State to track if temperature is in Celsius or Fahrenheit
    const units = isCelsius ? 'metric' : 'imperial';
    const [hover, setHover] = useState(false);

    const apiKey = '4570dc19e354854bbc203bdfc809add5';
    const city = 'Halifax';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    useEffect(() => {
        const fetchWeather = async () => {
            try {
                const response = await fetch(apiUrl);
                if (!response.ok) {
                    throw new Error(`Error: ${response.statusText}`);
                }
                const data = await response.json();
                setWeatherData(data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchWeather();
    }, [apiUrl]);

    const toggleUnits = () => {
        setIsCelsius(!isCelsius);
    };

    if (loading) return <p>Loading weather data...</p>;
    if (error) return <p>Error loading weather data: {error}</p>;


    const buttonStyle = {
        backgroundColor: hover ? '#333' : 'black',
        color: 'white',
        border: 'none',
        padding: '10px 20px',
        fontSize: '16px',
        fontWeight: 'bold',
        
        borderRadius: '5px',
        cursor: 'pointer',
        transform: hover ? 'scale(1.05)' : 'scale(1)',
        transition: 'background-color 0.3s ease, transform 0.2s ease',
    };


    return (
        <div className="weather-container">
           <h4>
                Temperature: {isCelsius 
                    ? weatherData.main.temp 
                    : ((weatherData.main.temp * 9) / 5 + 32).toFixed(2)}°{isCelsius ? 'C' : 'F'}
            </h4>
            <button
        style={buttonStyle}
        onClick={toggleUnits}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        >
                Switch to {isCelsius ? 'Fahrenheit' : 'Celsius'}
            </button>
        </div>
    );
};

export default Weather;
