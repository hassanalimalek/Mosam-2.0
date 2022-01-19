import React from "react";
import { useState, useRef, useEffect } from "react";
import styles from "../../css/searchBar.module.scss";
import { BiSearchAlt } from "react-icons/bi";
// import defaultBg from "../../assets/images/bgImg.jpeg";
import iso3311a2 from "iso-3166-1-alpha-2";

function Index(props) {
  let [searchVal, setSearchVal] = useState("");

  // Google Places
  let autoCompleteInput = useRef();
  let autoComplete = null;
  useEffect(() => {
    // eslint-disable-next-line
    autoComplete = new window.google.maps.places.Autocomplete(
      autoCompleteInput.current,
      { types: ["(cities)"] }
    );
    autoComplete.addListener("place_changed", handlePlaceChanged);
  }, []);
  // Places Input Change Listener
  let handlePlaceChanged = () => {
    const place = autoComplete.getPlace();
    setSearchVal(place.formatted_address);
  };

  //   Weather Search
  let search = async () => {
    props.setLoading(true);
    let apiKey = "bfde028c134ffeee204f554bdc89e8a2";

    let city = searchVal.slice(0, searchVal.indexOf(","));
    let country = searchVal
      .slice(searchVal.lastIndexOf(",") + 1, searchVal.length)
      .trim();
    let countryCode = "";
    // Google Places Already Provides Short Notation of Some Countries
    // -- > USA for united states of america
    // That is why checking if length is greater then 3 then get the ISO alpha 2 code.
    if (country.length > 3) {
      countryCode = iso3311a2.getCode(country).toLowerCase();
    } else {
      countryCode = country.toLowerCase();
      if (countryCode === "usa") {
        countryCode = "us";
      }
    }
    console.log(city);
    console.log(countryCode);
    await fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" +
        `${city},${countryCode}` +
        "&appid=" +
        apiKey +
        "&units=metric"
    )
      .then(async (response) => {
        console.log("Response --->", response);
        if (response.status === 404) {
          let dataObj = {
            errH1: "Sorry, we found no match for your location",
            errP: "Try to search for another major city in the same area.",
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
          }, 200);
        }
      })
      .catch((err) => {
        console.log("err --->", err);
        props.setLoading(false);
      });
  };

  // Enter to submit
  let enterSubmit = (event) => {
    // if (event.keyCode === 13) {
    //   search();
    // }
  };

  return (
    <div className={styles.searchBar_wrapper}>
      {/* <style>{`body {background:url(${defaultBg}) no-repeat center/cover fixed }`}</style> */}
      <div className={styles.searchBar}>
        <input
          value={searchVal}
          ref={autoCompleteInput}
          id="autoComplete"
          placeholder="Enter a City Name to get Weather Updates.."
          onChange={(e) => {
            setSearchVal(e.target.value);
          }}
          onKeyDown={(e) => enterSubmit(e)}
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
