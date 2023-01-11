var light = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id:'mapbox/light-v10',
    accessToken: 'pk.eyJ1Ijoic3FuZ3V5ZW4iLCJhIjoiY2w5eXd1YXc0MDk3MjNucDg2cDhyN3JrbyJ9.aMzoD2AZBPUtaVP2yV5N-A',
    tileSize: 512,
    zoomOffset: -1,
});

var dark = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id:'mapbox/dark-v10',
    accessToken: 'pk.eyJ1Ijoic3FuZ3V5ZW4iLCJhIjoiY2w5eXd1YXc0MDk3MjNucDg2cDhyN3JrbyJ9.aMzoD2AZBPUtaVP2yV5N-A',
    tileSize: 512,
    zoomOffset: -1,
});

var map = L.map('map', {layers:[light, dark]}).fitWorld();

var baseMaps = {
    "Light" : light,
    "Dark" : dark
};

var layerControl = L.control.layers(baseMaps).addTo(map);

function onLocationFound(e) {
    var radius = e.accuracy; //this defines a variable radius as the accuracy value returned by the locate method. The unit is meters.

    L.marker(e.latlng).addTo(map)  //this adds a marker at the lat and long returned by the locate function.
        .bindPopup("You are within " + Math.round(radius * 3.28084) + " feet of this point").openPopup(); //this binds a popup to the marker. The text of the popup is defined here as well. Note that we multiply the radius by 3.28084 to convert the radius from meters to feet and that we use Math.round to round the conversion to the nearest whole number.

    if (radius <= 100) {
        L.circle(e.latlng, radius, {color: 'green'}).addTo(map);
    }
    else{
        L.circle(e.latlng, radius, {color: 'red'}).addTo(map);
    }

    var times = SunCalc.getTimes(new Date(), e.latitude, e.longitude);
    var sunrise = times.sunrise.getHours() + times.sunrise.getMinutes();
    var sunset = times.sunset.getHours() + time.sunset.getMinutes();
        
    var currentTime = new Date().getHours() + newDate().getMinutes();
        if (sunrise < currentTime && currentTime < sunset){
            map.removeLayer(dark);
            map.addLayer(light);
        }
        else {
            map.removeLayer(light);
            map.addLayer(dark);
        }
}

map.on('locationfound', onLocationFound); //this is the event listener

function onLocationError(e) {
    alert(e.message);
  }
  
map.on('locationerror', onLocationError);  

document.getElementById("lp").addEventListener("click", mylp);

function mylp() {
    map.locate({setView: true, maxZoom: 16});
}

var directions = [
	"To get started, please allow your device to share its location, allowing for the map to access your current location information. Your device location information will not be stored or shared with any outside resources. Please understand that in order for this map to function accordingly, your location information is necessary.\nAccess and accept your location permissions by clicking the Location Permissions button at the top of your page. Thank you."
	];
	window.alert(directions);
	document.getElementById("demo").innerHTML = directions;
