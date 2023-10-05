import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { fetchWeatherData } from './fetch.js';
import axios from "axios"
//Cities for select option
const cities = [
  {
    city: "Chennai",
  },
  {
    city: "Kolkata",
  },
  {
    city: "Hyderabad",
  },
  {
    city: "Jaipur",
  },
  {
    city: "Pune",
  },
  {
    city: "Ahmedabad",
  },
  {
    city: "Lucknow",
  },
  {
    city: "Goa",
  },
  {
    city: "Kochi",
  },
  {
    city: "Bhubaneswar",
  },
  {
    city: "Agra",
  },
  {
    city: "Varanasi",
  },
  {
    city: "Amritsar",
  },
  {
    city: "Mysore",
  },
  {
    city: "Chandigarh",
  },
  {
    city: "Nagpur",
  },
  {
    city: "Indore",
  },
  {
    city: "Surat",
  },
  {
    city: "Vizag",
  },
  {
    city: "Rajkot",
  }]

const Weather = () => {
  const [weatherData, setWeatherData] = useState();
  const [celsius, setCelsius] = useState(true)
  const [selectedLocation, setSelectedLocation] = useState("");
  const [loading, setLoading] = useState(false);

  console.log(selectedLocation)
  const fetchWeatherForGeolocation = async (position) => {
    try {
      setLoading(true);
      let latitude = position.coords.latitude;
      let longitude = position.coords.longitude;
      const options = {
        method: 'GET',
        url: 'https://weatherapi-com.p.rapidapi.com/current.json',
        params: { q: `${latitude},${longitude}` },
        headers: {
          'X-RapidAPI-Key': '9b853f074fmsh98bb34bad75e0d9p169855jsnb522591d1a38',
          'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
        }
      };
      const response = await axios.request(options);

      setSelectedLocation(response.data.location.name)
      
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };
  //to fetch data related to the state of location called to an other file
  useEffect(() => {

    if (selectedLocation) {
      setLoading(true);
      fetchWeatherData(selectedLocation)
        .then(data => {
          console.log("The data is", data);
          setWeatherData(data);
          setLoading(false);
        })
        .catch(error => {
          setLoading(false);
          console.error('Error fetching weather data:', error);
        });
    }
    else {
      if (navigator.geolocation) {

        navigator.geolocation.getCurrentPosition(
          fetchWeatherForGeolocation,
          () => {
            console.log('Unable to retrieve your location.');
          }
        );
      } else {
        console.log('Geolocation is not supported by this browser.');
      }
    }

  }, [selectedLocation]);
  const locationOptions = cities.map(cityData => ({
    value: cityData.city,
    label: cityData.city
  }));


  //handle the change in the location
  const handleLocationChange = (event) => {
    setSelectedLocation(event.target.value);
  };
  const toggleTemperatureUnit = () => {
    setCelsius(!celsius);
  };

  let count = 0
  function add(){
   for(let i=0;i<=6;i++){
     count = count + weatherData.day[i].temperature.min
   }
  }
  add()

  return (
    <div className="container mt-5">{
      loading?(
        <><p>Loading</p></>
      ):
      (<div className="row">
        <div className="col-md-6 col-lg-6">
          <h5 className="text-primary">Weather Application</h5>
          <div className="form-group">
            <label htmlFor="location" className="text-white">Select Location:</label>
            <select
              id="location"
              className="form-control"
              value={selectedLocation}
              onChange={handleLocationChange}
            >
              <option value="">Select a location</option>
              {locationOptions.map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
          </div>
          <div className="mt-4">
            <table className="table">
              <thead>
                <tr>
                  <th>Day</th>
                  <th>MIN</th>
                  <th>Max</th>
                  <th>Avg</th>
                </tr>
              </thead>
          {weatherData&&( 
            <tbody>
                <tr>
                  <td>{weatherData.date[0].date}</td>
                  <td>{weatherData.day0.min}</td>
                  <td>{weatherData.day0.max}</td>
                  
                </tr>
                <tr>
                  <td>{weatherData.date[1].date}</td>
                  <td>{weatherData.day1.min}</td>
                  <td>{weatherData.day1.max}</td>
                  
                </tr>
                <tr>
                  <td>{weatherData.date[2].date}</td>
                  <td>{weatherData.day2.min}</td>
                  <td>{weatherData.day2.max}</td>
                  
                </tr>
                <tr>
                  <td>{weatherData.date[3].date}</td>
                  <td>{weatherData.day3.min}</td>
                  <td>{weatherData.day3.max}</td>
                  
                </tr>
                <tr>
                  <td>{weatherData.date[4].date}</td>
                  <td>{weatherData.day4.min}</td>
                  <td>{weatherData.day4.max}</td>
                 
                </tr>
                <tr>
                  <td>{weatherData.date[5].date}</td>
                  <td>{weatherData.day5.min}</td>
                  <td>{weatherData.day5.max}</td>
                  
                </tr>
                <tr>
                  <td>{weatherData.date[6].date}</td>
                  <td>{weatherData.day6.min}</td>
                  <td>{weatherData.day6.max}</td>
                  
                </tr>
              </tbody>
              
              
              )} 
            </table>
          </div>
        </div>
        <div className="col-md-6 col-lg-6 p-2">
          <div className="card bg-danger text-white">
            <div className="card-body">
              <h4 className="card-title">Weather Details</h4>
              {weatherData && (
                <div>
                  <p><strong>Location:</strong> {weatherData.city},{weatherData.country}</p>
                  <p><strong>Temperature:</strong> {celsius ? (`${parseInt(weatherData.temperature - 273.15).toFixed(2)} °C`) : (`${parseInt(weatherData.temperature).toFixed(2)} °K`)}</p>
                  <button className="btn btn-primary mt-1 p-1" onClick={toggleTemperatureUnit}>
                    {celsius ? ("Convert to K") : ("Convert to C")}
                  </button>
                  
                   {/* <p><strong> Min Temperature:</strong> {celsius ? (`${weatherData.day0.min} °C`) : (`${weatherData.day0.min + 273.15}  °K`)}</p>
                  <p><strong> Max Temperature:</strong> {celsius ? (`${weatherData.day0.max} °C`) : (`${weatherData.day0.max + 273.15}  °K`)}</p> */}
                  <p><strong>Weather Condition:</strong>{weatherData.weatherCondition}</p>
                  <p><strong>Country:</strong> {weatherData.country}</p>
                  <p>Average:{count}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>)}
    </div>

  );
};

export default Weather;
