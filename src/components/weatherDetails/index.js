import React from 'react';
// Date fns
import {format} from 'date-fns';
import styles from '../../css/weather.module.scss';
import cx from 'classnames';
import '../../css/weather-icons.css';
import windmillImg from '../../assets/images/windmill.gif';
import rainDropImg from '../../assets/images/rainDrop.png';
// Importing Background images
import hazeImg from '../../assets/images/haze.jpg';
import rainImg from '../../assets/images/rain.jpg';
import cloudImg from '../../assets/images/clouds.jpg';
import snowImg from '../../assets/images/snow.jpg';
import nightSkyImg from '../../assets/images/nightSky.jpg';
import sunnyImg from '../../assets/images/sunny.jpg';
import defaultImg from '../../assets/images/bgImg.jpg';

// React Loader
import {css} from '@emotion/core';
import ScaleLoader from 'react-spinners/ScaleLoader';
// React Carousel
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: {max: 2000, min: 1280},
    items: 5,
  },
  LargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: {max: 1280, min: 1000},
    items: 4,
  },
  desktop: {
    breakpoint: {max: 1000, min: 768},
    items: 3,
  },
  tablet: {
    breakpoint: {max: 768, min: 520},
    items: 2,
  },
  mobile: {
    breakpoint: {max: 520, min: 0},
    items: 2,
  },
};

function Index(props) {
  // Loader Styles
  let color = '#111';
  let bgImg = defaultImg;
  const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
  `;
  if (props.loading === true) {
    return (
      <div className={styles.loaderWrapper}>
        <style>{`body {background:url(${bgImg}) no-repeat center/cover fixed !important;}`}</style>
        <ScaleLoader
          color={color}
          loading={props}
          css={override}
          width={10}
          radius={2}
          height={45}
          margin={5}
        />
      </div>
    );
  }
  if (props.weatherDetails.errH1) {
    return (
      <div className={styles.errorWrapper}>
        <div className={styles.errMsgWrapper}>
          <h1 className={styles.errMsgTitle}>{props.weatherDetails.errH1}</h1>
          <h3>{props.weatherDetails.errP}</h3>
        </div>
      </div>
    );
  }
  if (props.weatherDetails) {
    let wObj = props.weatherDetails;
    let city = `${wObj.name},${wObj.sys.country}`;
    let date = format(new Date(), 'EEEE do MMMM');
    let temp = `${Math.floor(wObj.main.temp)} ${'\u00b0'}`;
    let weather_details =
      wObj.weather.description[0].toUpperCase() +
      wObj.weather.description.slice(1);
    let minTemp = `${Math.floor(wObj.main.temp_min)} ${'\u00b0'}`;
    let maxTemp = `${Math.floor(wObj.main.temp_max)} ${'\u00b0'}`;
    let sunrise = format(new Date(wObj.sys.sunrise * 1000), 'K:mm a');
    let sunset = format(new Date(wObj.sys.sunset * 1000), 'K:mm a');
    let humidity = wObj.main.humidity;
    let wind = wObj.wind.speed;
    if (weather_details.includes('Clear')) {
      bgImg = sunnyImg;
      if (new Date().getTime() > new Date(wObj.sys.sunset * 1000).getTime()) {
        bgImg = nightSkyImg;
      }
    }
    if (weather_details.includes('clouds')) {
      bgImg = cloudImg;
    }
    if (weather_details.includes('rain')) {
      bgImg = rainImg;
    }
    if (weather_details.includes('Haze')) {
      bgImg = hazeImg;
    }
    if (weather_details.includes('snow')) {
      bgImg = snowImg;
    }

    let forecast_jsx = () => {
      let week = props.weatherDetails.daily;
      return week.map((day, index) => {
        let date = format(new Date(day.dt * 1000), 'do MMMM');
        let temp = `${Math.floor(day.temp.day)} ${'\u00b0'}`;
        let rain_chance = Math.round(day.pop * 100);
        return (
          <div key={index} className={styles.forecast_single}>
            <style>{`body {background:linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
                                 url(${bgImg}) no-repeat center/cover fixed !important;}`}</style>
            <h4 className={styles.forecast_date}>{date}</h4>
            <h4 className={styles.forecast_weatherTemp}>{temp}</h4>
            <i
              className={cx(
                `wi wi-owm-${day.weather[0].id}`,
                styles.weather_icon_2
              )}
            />
            <div>
              <span>
                <img
                  alt="rain drop img"
                  className={styles.rainDropImg}
                  src={rainDropImg}
                />{' '}
                <span className={styles.forecast_weatherChance}>
                  {rain_chance} %
                </span>
              </span>
            </div>
          </div>
        );
      });
    };

    return (
      <div className={styles.weather}>
        <div className={styles.weather_wrapper}>
          <div className={styles.weather_basic}>
            <h1 className={styles.weather_city}>{city}</h1>
            <h2 className={styles.weather_date}>{date}</h2>
            <div className={styles.iconTemp_wrapper}>
              <i
                className={cx(
                  `wi wi-owm-${wObj.weather.id}`,
                  styles.weather_icon
                )}
              />
              <div className={styles.weather_detailsContainer}>
                <h3 className={styles.weather_temperature}>{temp}</h3>
                <p className={styles.weather_description}>{weather_details}</p>
              </div>
            </div>
          </div>
          <div className={styles.weather_details}>
            <div className={styles.weather_details_firstDiv}>
              <div>
                <h3 className={styles.mb_halfRem}>{minTemp}</h3>
                <h3>Low</h3>
              </div>
              <div>
                <h3 className={styles.mb_halfRem}>{humidity} %</h3>
                <h3>Humidity</h3>
              </div>
              <div>
                <h3 className={styles.mb_halfRem}>{sunrise}</h3>
                <h3>Sunrise</h3>
              </div>
            </div>
            <div className={styles.weather_details_secondDiv}>
              <div>
                <h3 className={styles.mb_halfRem}>{maxTemp}</h3>
                <h3>High</h3>
              </div>
              <div>
                <h3 className={styles.mb_halfRem}>{wind} mph</h3>
                <h3 className={styles.windmillImgWrapper}>
                  <img
                    alt="weather img"
                    className={styles.windmillImg}
                    src={windmillImg}
                  ></img>
                </h3>
              </div>
              <div>
                <h3 className={styles.mb_halfRem}>{sunset}</h3>
                <h3>Sunset</h3>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.forecast_wrapper}>
          <h2 className={styles.forecast_sevenDayTitle}>7 Day Forecast</h2>
          <Carousel
            swipeable={true}
            draggable={true}
            showDots={false}
            responsive={responsive}
            ssr={true} // means to render carousel on server-side.
            infinite={true}
            autoPlaySpeed={1000}
            keyBoardControl={true}
            customTransition="all .6"
            renderButtonGroupOutside={true}
            // centerMode={true}
            transitionDuration={500}
            containerClass="carousel-container"
            dotListClass="custom-dot-list-style"
            itemClass="carousel-item-padding-80-px"
          >
            {forecast_jsx()}
          </Carousel>
        </div>
      </div>
    );
  } else {
    return null;
  }
}

export default Index;
