document.addEventListener("DOMContentLoaded", function (event) {

    // find user's location
    navigator.geolocation.getCurrentPosition(callback, error);
    function callback(position) {
        localStorage.setItem("lat", position.coords.latitude);
        localStorage.setItem("lon", position.coords.longitude);
    }
    function error() {
        alert('Error occurred. Error code: ' + error.code);
    }

    
    // store user's location
    const lat = localStorage.getItem("lat");
    const lon = localStorage.getItem("lon");
    const pos = { "lat": parseFloat(lat), "lng": parseFloat(lon) };
    console.log("pos: " + JSON.stringify(pos));


    // retrieve weather forecast for location
    function getWeatherByCoords() {
       
        const OPEN_WEATHER_API_KEY = "b9f348e72127c9857ab6c279058b97fa";
        var query = "https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&appid=" + OPEN_WEATHER_API_KEY;
        console.log("Query: " + query);
        fetch(query)
            .then(function (resp) { return resp.json() }) // Convert data to json
            .then(function (data) {
                console.log(data);
                document.getElementById('loc').innerHTML = data.name;
                var celcius = Math.round(parseFloat(data.main.temp) - 273.15);
                document.getElementById('temp').innerHTML = celcius + '&deg;';
                document.getElementById('weather-desc').innerHTML = data.weather[0].description;
                document.getElementById('weather-image').src = "http://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png";
            })
            .catch(function () {
                alert("error " + error.code);
            });
    }

    getWeatherByCoords();


    document.getElementById('toggleTemp').addEventListener("click", toggleTemp);

    function toggleTemp() {
        let t = document.getElementById("cOrF");
        let temp = (document.getElementById('temp').innerHTML).match(/\d+/)[0];
        if (t.innerHTML == "C") {
            t.innerHTML = "F";
            document.getElementById('temp').innerHTML = convertToFahrenheit(temp) + '&deg;';
        } else {
            t.innerHTML = "C";
            document.getElementById('temp').innerHTML = convertToCelsius(temp) + '&deg;';
        }
    }

    function convertToFahrenheit(c) {
        let f = Math.round((c*1.8)+32);
        return f;
    }

    function convertToCelsius(f) {
        let c = Math.round(5/9*(f-32));
        return c;
    }

    

    
    /*
    //convert coordinates to city/town/location name
    function getLocationName() {
        var geocoder = new google.maps.Geocoder;

        geocoder.geocode({ 'location': pos }, function (results, status) {
            if (status === 'OK') {
                if (results) {
                    console.log("results qty: " + results.length);

                    for (let i = 0; i < results.length; i++) {
                        //console.log("result " + i + JSON.stringify(results[i]));
                        //console.log(results[i].types);
                        //console.log(results[i].formatted_address);

                        if (results[i].types[0] == 'locality') {
                            var city = results[i].formatted_address;
                            console.log(city);
                            document.getElementById('loc').innerHTML = city;
                        }
                    }
                }
            }
        })
    }

    getLocationName();
    */
});
