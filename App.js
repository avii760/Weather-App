import React, { useState } from 'react';
import './App.css';

const API_KEY = 'bcd0bcafa51a232d589e36199a2d8001'; 

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');

  const getWeather = async () => {
    if (!city) return;

    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      const data = await res.json();

      if (data.cod !== 200) {
        setError(data.message);
        setWeather(null);
      } else {
        setWeather(data);
        setError('');
      }
    } catch (err) {
      setError('Failed to fetch data');
      setWeather(null);
    }
  };

  return (
    <div className="App" style={{ padding: '2rem' }}>
      <h1>🌤️ Weather App</h1>

      <input
        type="text"
        placeholder="Enter city..."
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button onClick={getWeather}>Get Weather</button>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {weather && (
        <div style={{ marginTop: '1rem' }}>
          <h2>{weather.name}, {weather.sys.country}</h2>
          <p>🌡️ {weather.main.temp}°C</p>
          <p>🌬️ {weather.wind.speed} m/s</p>
          <p>☁️ {weather.weather[0].description}</p>
        </div>
      )}
    </div>
  );
}

export default App;
