import React from 'react'
import {useState} from 'react'
import styles from '../../css/searchBar.module.scss'
import { BiSearchAlt } from 'react-icons/bi'

function Index(props) {

    let [searchVal,setSearchVal] = useState('');
   
    let search = async ()=>{
        console.log(searchVal)
        props.setLoading(true);
        let apiKey = '526d6c2fa8f55fc0657ee2a71c2dfc65';
        let cnt = '7'
        let response = await fetch('https://api.openweathermap.org/data/2.5/weather?q=' + searchVal+ '&cnt='+cnt+'&appid=' + apiKey + '&units=metric') 
        if(response.status!==200){
            let dataObj={
                errH1:"Sorry, we found no match for your location",
                errP:"Try to search for another major city in the same area."
            }
            props.setWeather(dataObj);
            props.setLoading(false);
            return;
        }
        let data = await response.json();
        let lat = data.coord.lat;
        let lon = data.coord.lon;
        let result = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude={minutely,hourly,alerts}&units=metric&appid=`+ apiKey)
        let dailyResult = await result.json();
        dailyResult.daily.pop();
        console.log(dailyResult)
        let dataObj = {
                    main:data.main,
                    sys:data.sys,
                    weather:data.weather[0],
                    name:data.name,
                    wind:data.wind,
                    daily:dailyResult.daily
                }
        console.log("Data Obj ",dataObj)
        props.setWeather(dataObj);
        props.setLoading(false);
        
    }

    return (
        <div className={styles.searchBar_wrapper}>
            <div className={styles.searchBar}>
                <input value={searchVal} placeholder="Enter City Name to get Weather Updates.." onChange={(e)=>{setSearchVal(e.target.value)}} className={styles.searchInput}/>
                <span onClick={search} className={styles.searchI} ><BiSearchAlt className={styles.searchIcon}/></span>
            </div>
           
        </div>
    )
}

export default Index
