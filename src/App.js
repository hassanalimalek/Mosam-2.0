import './App.css';
import { useState } from 'react'
import Header from './components/header'
import WeatherSearch from './components/weatherSearch'
import WeatherDetails from './components/weatherDetails'


function App() {
  let [weatherDetails,setWeatherDetails] = useState('');
  let [loading,setLoading] = useState(false);

  let setWeather = (details)=>{
    setWeatherDetails(details);
  }


  return (
    <>
     <Header/>
     <WeatherSearch setWeather={setWeather} setLoading={setLoading}/>
     <WeatherDetails weatherDetails={weatherDetails} loading={loading} />
    </>
   
  );
}

export default App;
