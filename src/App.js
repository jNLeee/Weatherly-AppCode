import React, { useState } from 'react';

/* Background Image Legend
  Cold: <= 32°F
  Chilly: 32°F - 59°F
  Breezy: 60°F - 74°F
  Warm: 75°F - 89°F
  Hot: >= 90°F
*/

const api = { //weather api 
  key: "cc5e83649583f94fb5c91a09d5548f28",
  base: "https://api.openweathermap.org/data/2.5/"
}

function App() {

  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});
  
  const search = evt => { //main func calls the weather api & finds weather forecast of a city upon clicking the "Enter" key
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=imperial&appid=${api.key}`) 
        .then(res => res.json()) //get the json from the response
        .then(result => {
          setWeather(result);
          setQuery('');
          console.log(result);
        });
    }
  }
  
  var options = { weekday: "long", month: "short", day: "numeric", year: "numeric" };
  
  return (
    <div className={
      (typeof weather.main != "undefined") ? //if no search query is done yet then go to default app background
        (weather.main.temp >= 90) ? 'app hot' 
        : (weather.main.temp >= 75 && weather.main.temp < 90) ? 'app warm'
        : (weather.main.temp >= 60 && weather.main.temp < 75) ? 'app'
        : (weather.main.temp > 32 && weather.main.temp < 60) ? 'app chilly'
        : 'app cold'
      : 'app'}>
      <main>
        <div className="search-box">
          <input 
            type="text"
            className="search-bar"
            placeholder="Find a City..."
            onChange={e => setQuery(e.target.value)} 
            value={query}
            onKeyPress={search}
          />
        </div>
        {(typeof weather.main != "undefined") ? (
          <div>
            <div className="location-box">
              <div className="location">{weather.name}, {weather.sys.country}</div>
              <div className="date">{new Date().toLocaleDateString("en-US", options)}</div>
            </div>
            <div className="weather-box">
              <div className="temp">{Math.round(weather.main.temp)}°F</div>
              <div className="weather">{weather.weather[0].main}</div>
            </div>
          </div>
        ) : ('')}
      </main>
    </div>
  );
}

export default App;

