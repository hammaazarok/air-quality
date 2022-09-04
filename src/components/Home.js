import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { API_URL } from '../api/cities';
import { Arrow } from './Icons';

function Home() {
  const [countries, getCountries] = useState(null);
  const [filterd, filterCountries] = useState(null);
  const [tokenExpired, setValue] = useState(false);

  useEffect(() => {
    fetch(`${API_URL}/countries/iso`).then((res) => res.json()).then((json) => {
      if (json.error !== undefined) {
        if (json.error.message === 'jwt expired') {
          setValue(true);
        }
      }
      getCountries(json.data);
      filterCountries(json.data);
    });
  }, []);

  const handleSearch = (e) => {
    const filterd = countries.filter(
      (c) => c.name.toLowerCase().includes(e.target.value.toLowerCase()),
    );
    filterCountries(filterd);
  };

  const Header = (
    <header className="header-container">
      <div className="header">
        <p className="h-title">World Air Quality</p>
        <p className="h-subtitle">Select your Country</p>
      </div>
    </header>
  );
  if (tokenExpired) {
    return (
      <>
        {Header}
        <div className="cities">
          <p className="message">Sorry! looks like the Access Token for used Api is expired</p>
          <p className="message">I will build my API Soon I promise</p>
          <p className="message">Until then if you want to use the app contact me to renew it for you.</p>
        </div>
      </>
    );
  }
  return (
    <>
      {Header}
      <div className="title">
        <p>STATES BY COUNTRY</p>
        {' '}
        <input className="filter" onChange={handleSearch} type="search" name="search" id="search" placeholder="TYPE YOUR COUNTRY NAME" />
      </div>
      <div className="countries">
        {filterd !== null ? filterd.map((c) => (
          <Link className="country-card" key={c.name} to={`/cities/${c.name}`}>
            <div className="card-up">
              <img src={`./images/countries/${c.Iso2.toLowerCase()}/512.png`} alt="" />
              <div className="forward-icon"><Arrow /></div>
            </div>
            <p className="country-name">{c.name}</p>
          </Link>

        )) : ''}
      </div>
    </>
  );
}

export default Home;
