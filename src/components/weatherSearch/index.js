import React from 'react';
import {useState} from 'react';
import styles from '../../css/searchBar.module.scss';
import {BiSearchAlt} from 'react-icons/bi';
import defaultBg from '../../assets/images/bgImg.jpg';

function Index(props) {
  let [searchVal, setSearchVal] = useState('');

  //   Weather Search
  let search = async () => {
    props.setLoading(true);
    let apiKey = '526d6c2fa8f55fc0657ee2a71c2dfc65';
    let cnt = '7';
    await fetch(
      'https://api.openweathermap.org/data/2.5/weather?q=' +
        searchVal +
        '&cnt=' +
        cnt +
        '&appid=' +
        apiKey +
        '&units=metric'
    ).then(async (response) => {
      if (response.status === 404) {
        let dataObj = {
          errH1: 'Sorry, we found no match for your location',
          errP: 'Try to search for another major city in the same area.',
        };
        props.setWeather(dataObj);
        props.setLoading(false);
        return;
      }
      if (response.status === 200) {
        let data = await response.json();
        let lat = data.coord.lat;
        let lon = data.coord.lon;
        let result = await fetch(
          `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude={minutely,hourly,alerts}&units=metric&appid=` +
            apiKey
        );
        let dailyResult = await result.json();
        dailyResult.daily.pop();
        let dataObj = {
          main: data.main,
          sys: data.sys,
          weather: data.weather[0],
          name: data.name,
          wind: data.wind,
          daily: dailyResult.daily,
        };
        setTimeout(() => {
          props.setWeather(dataObj);
          props.setLoading(false);
        }, 1500);
      }
    });
  };

  return (
    <div className={styles.searchBar_wrapper}>
      <style>{`body {background:url(${defaultBg}) no-repeat center/cover fixed }`}</style>
      <div className={styles.searchBar}>
        <input
          value={searchVal}
          placeholder="Enter a City Name to get Weather Updates.."
          onChange={(e) => {
            setSearchVal(e.target.value);
          }}
          className={styles.searchInput}
        />
        <span onClick={search} className={styles.searchI}>
          <BiSearchAlt className={styles.searchIcon} />
        </span>
      </div>
    </div>
  );
}

export default Index;
