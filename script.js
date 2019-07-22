document.addEventListener("DOMContentLoaded", function (event) {

    // find user's location
    var coords;
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

    document.getElementById("loc").innerHTML = getLocationName();

});
