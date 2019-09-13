window.addEventListener('load',()=> {

    let long;
    let lat;
    let temperatureDescription = document.querySelector('.temperature-description');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let locationTimezone = document.querySelector('.location-timezone');
    const temperatureSection = document.querySelector('.temperature');
    const temperatureSpan = document.querySelector('.temperature span');
    const uvIndexDescription = document.querySelector ('.uv-index');

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;
            
            const proxy = `https://cors-anywhere.herokuapp.com/`;
            const api = `${proxy}https://api.darksky.net/forecast/adad5dc02bf7b9fe63984c6fd953deff/${lat},${long}`;

            fetch(api)
            .then(response => {
                return response.json();
            })
            .then(data => {
                console.log(data);
                const {temperature, summary, icon, uvIndex} = data.currently;
                const timeZone = data.timezone;
                

                //set Dom Elements from The Api

                const celsius = (temperature-32) * (5/9);

                temperatureDegree.textContent =Math.floor(celsius);
                temperatureDescription.textContent ="How is the Weather : " + summary;
                locationTimezone.textContent = timeZone;
                uvIndexDescription.textContent = "UV Index : " + uvIndex;

                //FORMULA
                
                //setIcon
                setIcons(icon, document.querySelector('.icon'));

                //ChangeTempToFarenheit





        
            });
        });

     

    }

    function setIcons(icon, iconID) {
        const skycons = new Skycons({color: "white"});
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);
    }
    
});