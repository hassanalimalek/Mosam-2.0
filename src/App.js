import './App.css';
import {useState} from 'react';
import Header from './components/header';
import WeatherSearch from './components/weatherSearch';
import WeatherDetails from './components/weatherDetails';

import {css} from '@emotion/core';
import BarLoader from 'react-spinners/BarLoader';

function App() {
  let [weatherDetails, setWeatherDetails] = useState('');
  let [loading, setLoading] = useState(false);

  // Initial Loader
  let [initialloader, setInitialLoader] = useState(true);
  let color = '#111';
  const override = css`
    display: block;
    color: black;
    margin: 0 auto;
  `;
  setTimeout(() => {
    setInitialLoader(false);
  }, 3000);

  let setWeather = (details) => {
    setWeatherDetails(details);
  };

  if (initialloader) {
    return (
      <div className="loaderContainer">
        <BarLoader
          color={color}
          loading={initialloader}
          css={override}
          height={6}
          width={180}
        />
      </div>
    );
  } else {
    return (
      <>
        <Header />
        <WeatherSearch setWeather={setWeather} setLoading={setLoading} />
        <WeatherDetails weatherDetails={weatherDetails} loading={loading} />
      </>
    );
  }
}

export default App;
