import React, { useState } from "react";
import axios from "axios";

export default function Search() {
  let [city, setCity] = useState("");
  let [temperature, setTemperature] = useState(null);
  let [description, setDescription] = useState(null);
  let [humidity, setHumidity] = useState(null);
  let [wind, setWind] = useState(null);
  let [icon, setIcon] = useState(null);

  function handleSubmit(event) {
    event.preventDefault();
    let apiKey = "c8a77112b2faf6684bb4b21a0aa778ae";
    let units = "metric";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;

    axios.get(apiUrl).then(showTemperature);
  }

  function updateCity(event) {
    setCity(event.target.value);
  }

  function showTemperature(response) {
    setTemperature(response.data.main.temp);
    setDescription(response.data.weather[0].description);
    setHumidity(response.data.main.humidity);
    setWind(response.data.wind.speed);
    setIcon(
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
  }

  let form = (
    <form className="Form" onSubmit={handleSubmit}>
      <input type="text" placeholder="Enter a city..." onChange={updateCity} />
      <input type="submit" value="Search" />
    </form>
  );

  if (temperature) {
    return (
      <div className="Weather">
        {form}
        The weather in {city} currently is:
        <ul>
          <li>Temperature: {Math.round(temperature)}°C</li>
          <li>Description: {description}</li>
          <li>Humidity: {humidity} %</li>
          <li>Wind: {wind} km/h </li>
          <li>
            {" "}
            <img src={icon} alt={description} />
          </li>
        </ul>
      </div>
    );
  } else {
    return form;
  }
}
