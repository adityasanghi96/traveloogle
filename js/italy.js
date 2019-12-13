window.addEventListener("load", () => {
    let long;
    let lat;
    let temperatureDescription = document.querySelector(".temperature-description");
    let temperatureDegree = document.querySelector(".temperature-degree");
    let locationTimezone = document.querySelector(".location-timezone");
    let temperatureSection = document.querySelector(".temperature");
    const temperatureSpan = document.querySelector(".temperature span");
    
    document.querySelector(".location").setAttribute('style','display: none');
    document.querySelector(".temperature").setAttribute('style','display: none');

    
    lat=41.871941;
    long=12.567380;
    
    const proxy = "https://cors-anywhere.herokuapp.com/";
    const api = `${proxy}https://api.darksky.net/forecast/a7ae011056f3b2d78fbb8a3bfaa156c9/${lat},${long}`;
    
    fetch(api)
    .then(response => {
        return response.json();
    })
    .then(data =>{
        document.querySelector(".loader").setAttribute('style','display: none');
        document.querySelector(".location").setAttribute('style','display: flex');
        document.querySelector(".temperature").setAttribute('style','display: flex');
        
        console.log(data);
        
        const{ temperature, summary, icon } = data.currently;
        //Set  DOM Elements from the API
        temperatureDegree.textContent = temperature;
        temperatureDescription.textContent = summary;
        locationTimezone.textContent = data.timezone;
        
        //FORMULA FOR CELSIUS
        let celsius = (temperature - 32) * (5 / 9);
        // Set Icons
        setIcons(icon, document.querySelector(".icon"));
        // Change temperature to Celsius/Farenheit
        temperatureSection.addEventListener("click", () =>{
            if (temperatureSpan.textContent==="F"){
                temperatureSpan.textContent = "C";
                temperatureDegree.textContent = Math.floor(celsius);
            }
            else{
                temperatureSpan.textContent = "F";
                temperatureDegree.textContent = temperature;
            }
        });
    });
    
    function setIcons(icon, iconID){
        const skycons = new Skycons({color: "white"});
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);
    }
    
});