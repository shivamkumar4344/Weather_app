import apiKey from "../config";

// function that makes an api call
const getWeather = async(city) =>{
    
    return await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey.API_KEY}&units=metric`
    )
    .then((res) => res.json())
    .then ((json)=>{
        return json;
    })
}
export default getWeather;