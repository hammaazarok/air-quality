import React, { useEffect } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { API_TOKEN, API_URL } from '../api/cities';
import { LoadCities, loadStates, ResetStates } from '../redux/cities/cities';

function Cities() {
  const { country } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(LoadCities(['init']));
    dispatch(ResetStates([
      { state_name: 'loading states ...' },
    ]));
    dispatch(loadStates(country));
  }, []);
  const handleSelect = (e) => {
    const state = e.target.options[e.target.selectedIndex].text;
    fetch(`${API_URL}/cities/${state}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${API_TOKEN}`,
      },
    }).then((res) => res.json()).then((json) => {
      const citiess = [];
      json.map(async (e) => {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${e.city_name},${country}&appid=daa552ce23205ff48e971f0523fe9102`)
          .then((res) => res.json())
          .then(async (json) => {
            if (json.cod !== '404') {
              citiess.push({
                name: json.name,
                coord: json.coord,
                weather: json.weather[0].description,
                temp: Math.round(json.main.temp - 273.15),
                feel: Math.round(json.main.feels_like - 273.25),
              });
            }
          });
      });
      return citiess;
    }).then((b) => {
      setTimeout(() => {
        dispatch(LoadCities(b));
      }, 2000);
    });
    // dispatch(LoadCities(state, country));
  };
  const { states, cities } = useSelector((state) => state.cities, shallowEqual);
  return (
    <>
      <header className="header-container">
        <div className="header">
          <p className="h-title">{country.toUpperCase()}</p>
          <p className="h-subtitle">Select your City</p>
        </div>
      </header>
      <div className="title">
        <p>CITIES BY STATE</p>
        <select onChange={handleSelect} className="filter">
          {states.map((s) => (
            <option Key={s.state_name} value={s.state_name}>{s.state_name}</option>
          ))}
          ;
        </select>
      </div>
      <div className="cities">
        {cities.length > 0 ? cities.map((c) => (c === 'init' ? <p Key="m" className="message">Select Your State</p> : (
          <Link key={c.id} className="city-card" to={`/Details/${c.coord.lat}/${c.coord.lon}`} state={c}>
            <p className="city-name">{c.name}</p>
            <div className="city-info">
              <p>
                weather :
                {` ${c.weather}`}
              </p>
              <p>
                temperature :
                {` ${c.temp} C°`}
              </p>
              <p>
                feels like :
                {` ${c.feel} C°`}
              </p>
            </div>
          </Link>
        ))) : (
          <p className="message">Sorry! no cities found</p>
        )}
      </div>
    </>
  );
}

export default Cities;
