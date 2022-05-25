// https://api.darksky.net/forecast/fd9d9c6418c23d94745b836767721ad1/36,-122


window,addEventListener('load',()=>{
    let long;
    let lat;
    const temperatureDescription = document.querySelector(".temperature-description");
    const temperatureDegree = document.querySelector(".temperature-degree");
    const locationTimezone = document.querySelector(".location-timezone")
    const h1 = document.querySelector('h1'); 
    let temperatureSection = document.querySelector(".temperature-section");
    const temperatureSpan = document.querySelector(".temperature-section span");

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position =>{
            console.log(position);
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const proxy = "https://cors-anywhere.herokuapp.com/" // Darksky does not allow local host calls, first open the website click allow access to server
            const api = `${proxy}https://api.darksky.net/forecast/fd9d9c6418c23d94745b836767721ad1/${lat},${long}`;

            fetch(api)
                .then(response =>{
                    return response.json();
                })
                .then(data =>{
                    console.log(data);
                    const {temperature,summary,icon} = data.currently
                    // Set DOM elements
                    temperatureDegree.textContent = temperature;
                    temperatureDescription.textContent = summary;
                    locationTimezone.textContent = data.timezone;
                    // Set icon
                    setIcons(icon,document.querySelector('.icon'))

                    // Formula for C converstion
                    let celsius = (temperature - 32) * (5/9)
                    
                    // Change Temperature to Celcsius/Far
                    temperatureSection.addEventListener('click',()=>{
                        if(temperatureSpan.textContent ==="F"){
                            temperatureSpan.textContent = "C";
                            temperatureDegree.textContent=Math.floor(celsius);

                        }else{
                            temperatureSpan.textContent = "F";
                            temperatureDegree.textContent = temperature;
                        }
                    });
                });
        });

      

    }else{
        h1.textContent = "Please refresh and allow location"
    }

    function setIcons(icon, iconID){
        const skycons = new Skycons({"color": "white"});
        const currentIcon = icon.replace(/-/g,"_").toUpperCase(); // replace - with _
        skycons.play();
        skycons.add(document.getElementById("icon2"),currentIcon);
        return skycons.set(iconID,skycons[currentIcon]);
    }
});