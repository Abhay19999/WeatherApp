import React, {useState, useEffect} from 'react'
import "./style.css";
import Weathercard from './weathercard';

const Temp = () => {
    const[searchValue, setSearchValue] = useState("ahmedabad");
    const[tempInfo, setTempInfo] = useState({});
    const getWeatherInfo = async () => {
        try {
            let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=metric&appid=931e8c3d0f41dd3f7427af46954323ce`;
            
            let res = await fetch(url);
            let data = await res.json();
            
            const {temp, humidity, pressure} = data.main;
            const {main: weathermood} = data.weather[0];
            const {name} = data;
            const{speed} = data.wind;
            const {country,sunset} = data.sys

            const myNewWeatherInfo = {
                temp,
                humidity,
                pressure,
                weathermood,
                name,
                speed,
                country,
                sunset,

            };
            setTempInfo(myNewWeatherInfo);
        } catch (error) {
            console.log(error)
        }
    };
    
    useEffect(() => {
        getWeatherInfo();
    }, []);
    return (
        <div>
            <div className = "wrap">
                <div className = "search">
                    <input type = "search"
                        placeholder="search here"
                        autoFocus
                        id = "search"
                        className="searchTerm"
                        value = {searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                    />
                <button className = "searchButton" type="button"
                    onClick = {getWeatherInfo}>
                    Search
                </button>
                </div>
            </div>
            <Weathercard tempInfo = {tempInfo}/>
            
        </div>
    )
}

export default Temp
