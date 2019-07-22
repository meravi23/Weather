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
    var lat = localStorage.getItem("lat");
    var lon = localStorage.getItem("lon");
    var pos = { "lat": parseFloat(lat), "lng": parseFloat(lon) };
    console.log("pos: " + JSON.stringify(pos));


    //convert coordinates to city/town/location name
    function getLocationName() {
        var geocoder = new google.maps.Geocoder;

        geocoder.geocode({ 'location': pos }, function (results, status) {
            if (status === 'OK') {
                if (results) {
                    console.log("results qty: " + results.length);

                    for (let i = 0; i < results.length; i++) {
                        //console.log("result " + i + JSON.stringify(results[i]));
                        console.log(results[i].types);
                        console.log(results[i].formatted_address);

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



    // retrieve weather forecast for location
    function getWeatherByCoords(lat, lon) {
        var cityName = getLocationName();

        //api.openweathermap.org/data/2.5/weather?q={city name},{country code}
        //api.openweathermap.org/data/2.5/weather?q=London,uk
        const OPEN_WEATHER_API_KEY = "b9f348e72127c9857ab6c279058b97fa";
        var query = "https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&appid=" + OPEN_WEATHER_API_KEY;

        fetch(query)
            .then(function (resp) { return resp.json() }) // Convert data to json
            .then(function (data) {
                console.log(data);
            })
            .catch(function () {
                // catch any errors
            });
    }

    var forecast = getWeatherByCoords(lat, lon);
    console.log(JSON.stringify(forecast));
    
});
