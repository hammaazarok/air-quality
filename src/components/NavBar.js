import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BackArrow, Mic, Setting } from './Icons';

function NavBar() {
  const navigate = useNavigate();
  const path = window.location.pathname;

  return (
    <div>
      <nav className="navbar">
        {path === '/' ? (<p />) : (
          <p onClick={() => navigate(-1)} className="back" aria-hidden="true">
            <BackArrow />
            {' '}
            Back
          </p>
        )}
        <p>Air Quality</p>
        <div className="icon-menu">
          <Mic />
          <Setting />
        </div>
      </nav>
    </div>
  );
}

export default NavBar;
