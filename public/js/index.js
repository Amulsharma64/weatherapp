const cityName = document.getElementById("cityName");
const submitBtn = document.getElementById("submitButton");
const day = document.getElementById("day");
const today_data = document.getElementById("today_data");
const city_name = document.getElementById("city_name");
const temp = document.getElementById("temp");
const tempStatus = document.getElementById("tempStatus");
const hideData = document.querySelector(".middleLayer");

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
    let cityValue = cityName.value;
    if(cityValue === ""){
        city_name.innerText = "Plz write the Name before search";
        hideData.classList.add("dataHide");
    }else{
        try{
            const apiLink = `https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&units=metric&appid=a079c81e513a59a4b2ad06c74aa11565`;
            const response = await fetch(apiLink);
            const data = await response.json();
            city_name.innerText = `${data.name},${data.sys.country}`;
            // day.innerText = "";
            // today_data.innerText = "";
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

submitBtn.addEventListener("click", getInfo);