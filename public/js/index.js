const submitBtn = document.getElementById("submitButton");
const day = document.getElementById("day");
const today_data = document.getElementById("today_data");
const city_name = document.getElementById("city_name");
const temp = document.getElementById("temp");
const tempStatus = document.getElementById("tempStatus");
const hideData = document.querySelector(".middleLayer");
const title =  document.getElementById("title");
const cityName = document.getElementById("cityName");
let cityValue = "";


const getCurrentDay = () =>{
    let weekDay = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let monthName = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    let getCurrentTime = new Date();
    let today = weekDay[getCurrentTime.getDay()];
    let date = getCurrentTime.getDate();
    let month = monthName[getCurrentTime.getMonth()];
    let year = getCurrentTime.getFullYear();
    day.innerText=today;
    today_data.innerText=date +" "+ month+" " + year;

}
  
const getInfo = async(event) =>{
    event.preventDefault();
     cityValue = cityName.value;
    if(cityValue === ""){
        city_name.innerText = "Plz write the Name before search";
        hideData.classList.add("dataHide");
    }else{
        try{
            const apiLink = `https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&units=metric&appid=a079c81e513a59a4b2ad06c74aa11565`;
            const response = await fetch(apiLink);
            const data = await response.json();
            city_name.innerText = `${data.name},${data.sys.country}`;
            temp.innerText = data.main.temp;
            getCurrentDay();
            const tempMod= data.weather[0].main;

            // condition for temprature status 
            if(tempMod == "Clear"){
                tempStatus.innerHTML = "<i class='fas fa-sun' style='color:#eccc68;'></i>";
            }else if(tempMod == "Clouds"){
                tempStatus.innerHTML = `<i class="fas fa-cloud" style="color:#f1f2f6;"></i>`;
            }else if(tempMod =="Rain"){
                tempStatus.innerHTML =  `<i class="fas fa-cloud-rain" style="color:#a4b0be;"></i>`;
            }else{
                tempStatus.innerHTML = `<i class="fas fa-sun" style="color:#eccc68;"></i>`;
            }
            hideData.classList.remove("dataHide");

        }catch{
            city_name.innerText = "Plz write the name properly";
            hideData.classList.add("dataHide");
        }
    }
}

if (submitBtn) {
    submitBtn.addEventListener("click", getInfo);
}

// Fetching Forecast Data with help of API 
const forecast = document.getElementById("forecast");
const hideWeatherInfo = document.querySelector(".weather");
const showData = document.querySelector(".FData");
getForecast = async (event) => {
    cityValue = cityName.value;
      if(!cityValue){
          alert('Could not find the location'+cityName.value);
      }else{
          try {
              const url = `https://api.openweathermap.org/data/2.5/forecast?q=${cityValue}&units=metric&appid=a079c81e513a59a4b2ad06c74aa11565`;
              const response = await fetch(url);
              const cityData = await response.json();
            hideWeatherInfo.classList.add("dataHide");
              showForcast(cityData);
            showData.classList.remove("dataHide");
            }catch(error){
              console.error(error);
              alert('Could not find the location');
            }
      }            
    }
 
    
//   Function for Display Forcast Info
    const forecastTitle = document.getElementById("fTitle");
    const forecastDisplay = document.getElementById("Fdata");

    const showForcast = (data) =>{
        forecastTitle.innerHTML = `${data.city.name}, ${data.city.country}`;       
        
        
        for(let i=0; i<40; i=i+8){
            
            let today = [];
            if(i===0){
                today = ["Today"]
            }else if(i===8){
                today = ["Tomorrow"];
            }else{
                today = data.list[i].dt_txt.split(" ");
            }
                
            forecastDisplay.innerHTML+=
            `
        <div class="card">
            <h2 class="card-footer cardHead">${today[0]}</h2>
        <div class="d-flex flex-row justify-content-around">
            <ul class="list-group list-group-flush">
                <li class="list-group-item" id="temprature">
                <i class="fas fa-thermometer-half text-warning my-2"></i> Temp: ${data.list[i].main.temp} Celsius
                </li>
                <li class="list-group-item" id="feel">
                <i class="fas fa-meteor text-warning my-2"></i>&nbsp&nbsp Feel: ${data.list[i].main.feels_like} Celsius
                </li>
                <li class="list-group-item" id="desc">
                <i class="fas fa-cloud-sun-rain text-warning my-2"></i>&nbsp&nbsp ${data.list[i].weather[0].main}
                </li>
                <li class="list-group-item" id="pressure">
                <i class="fas fa-compress-arrows-alt text-warning my-2"></i>&nbsp&nbsp Pressure: ${data.list[i].main.pressure} hPa
                </li>
                <li class="list-group-item" id="humidity">
                <i class="fas fa-percent text-warning my-2"></i>&nbsp&nbsp Humidity: ${data.list[i].main.humidity}%
                </li>
            </ul>
            <ul class="list-group list-group-flush">
                <li class="list-group-item" id="minTemp">
                <i class="fas fa-temperature-low text-warning my-2"></i>&nbsp&nbsp Min: ${data.list[i].main.temp_min} Celsius
                </li>
                <li class="list-group-item" id="maxTemp">
                <i class="fas fa-temperature-high text-warning my-2"></i>&nbsp&nbsp Max: ${data.list[i].main.temp_max} Celsius
                </li>
                <li class="list-group-item" id="wind">
                <i class="fas fa-wind text-warning my-2"></i>&nbsp&nbsp ${data.list[i].wind.speed} meter/sec
                </li>
                <li class="list-group-item" id="windDir">
                <i class="fas fa-compass text-warning my-2"></i>&nbsp&nbsp ${data.list[i].wind.deg} degrees
                 </li>
                <li class="list-group-item" id="clouds">
                <i class="fas fa-cloud text-warning my-2"></i>&nbsp&nbsp Clouds: ${data.list[i].clouds.all}%
                </li>
            </ul>
        </div>
        </div>
            `
        }
    // sunrise.innerHTML = `<i class="fas fa-sun text-warning my-2"></i> Sunrise: ${new Date((data.sys.sunrise + data.timezone) * 1000).toUTCString().slice(-11, -7)} AM`;
    // sunset.innerHTML = `<i class="fas fa-sun text-warning my-2"></i> Sunset: ${new Date((data.sys.sunset + data.timezone) * 1000).toUTCString().slice(-11, -7)} PM`;
}


if (forecast) {
  forecast.addEventListener("click", getForecast);
}


