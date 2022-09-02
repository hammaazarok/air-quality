import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { LoadDetails } from '../redux/cities/cities';

Chart.register(...registerables);
Chart.defaults.color = '#fff';
Chart.defaults.scale.grid.display = false;

function Details() {
  const { lat, lon } = useParams();
  const city = useLocation().state;
  const [airQuality, setValue] = useState('...');
  const dispatch = useDispatch();

  const airQtoWords = (n) => {
    switch (n) {
      case 1:
        return 'Good';
      case 2:
        return 'Fair';
      case 3:
        return 'Moderate';
      case 4:
        return 'Poor';
      case 5:
        return 'Very Poor';
      default:
        return '...';
    }
  };

  useEffect(() => {
    fetch(`https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=daa552ce23205ff48e971f0523fe9102`)
      .then((res) => res.json())
      .then((json) => {
        dispatch(LoadDetails({
          labels: Object.keys(json.list[0].components),
          datasets: [
            {
              label: 'Air Gases Сoncentration',
              data: Object.values(json.list[0].components),
              fill: true,
              backgroundColor: 'rgba(241, 197, 40, 0)',
              borderColor: 'rgba(241, 197, 40, 1)',
            },
          ],
        }));
        setValue(airQtoWords(json.list[0].main.aqi));
      });
  }, []);

  const { data } = useSelector((state) => state.cities, shallowEqual);
  return (
    <>
      <header className="header-container">
        <div className="header">
          <p className="h-title">{city.name}</p>
          <p className="a-subtitle">
            Air Quality :
            {' '}
            {airQuality}
          </p>
        </div>
      </header>
      <div>
        <Line className="airData" data={data} />
      </div>

    </>
  );
}

export default Details;
