import axios from 'axios';

//Fetch weather data function 
export const fetchWeatherData = async (selectedLocation) => {
  try {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${selectedLocation}&appid=fe4feefa8543e06d4f3c66d92c61b69c`;
    const response = await axios.get(apiUrl);
    const options = {
      method: 'GET',
      url: `https://forecast9.p.rapidapi.com/rapidapi/forecast/${selectedLocation}/summary/`,
      headers: {
        'X-RapidAPI-Key': '9b853f074fmsh98bb34bad75e0d9p169855jsnb522591d1a38',
        'X-RapidAPI-Host': 'forecast9.p.rapidapi.com'
      }
    };
    const response1 = await axios.request(options);
    console.log(response1.data.forecast.items,)
    return {
      day :response1.data.forecast.items,
      day0: response1.data.forecast.items[0].temperature,
      day1: response1.data.forecast.items[1].temperature,
      day2: response1.data.forecast.items[2].temperature,
      day3: response1.data.forecast.items[3].temperature,
      day4: response1.data.forecast.items[4].temperature,
      day5: response1.data.forecast.items[5].temperature,
      day6: response1.data.forecast.items[6].temperature,
      date: response1.data.forecast.items,
      city: response.data.name,
      temperature: response.data.main.temp,
      weatherCondition: response.data.weather[0].main,
      country: response.data.sys.country,
      cordslan: response.data.coord.lon,
      cordslat: response.data.coord.lat,
      mintemp: response.data.main.temp_min,
      maxtemp: response.data.main.temp_max,
    };
   
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;
  }
};




