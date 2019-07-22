document.addEventListener("DOMContentLoaded", function (event) {

    // find user's location
    var coords;
    navigator.geolocation.getCurrentPosition(callback, error);

    function callback(position) {
        localStorage.setItem("lat", position.coords.latitude);
        localStorage.setItem("lon", position.coords.longitude);
        console.log(position.coords);
    }

    function error() {
        alert('Error occurred. Error code: ' + error.code);
    }

    // store user's location
    var pos = { "latitude": localStorage.getItem("lat"), "longitude": localStorage.getItem("lon") };
    console.log("pos: " + JSON.stringify(pos));

    document.getElementById("loc").innerHTML = JSON.stringify(pos);

});
