let brewMap = document.querySelector(".map")

var getSearchTerm = function() {
    var queryString = document.location.href
    var brewId = queryString.split("#")[1]
generateBreweries(brewId)
};

var generateBreweries = function(brewId) {
    var apiUrl = "https://api.openbrewerydb.org/breweries/" + brewId;
    fetch(apiUrl)
    .then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                brewCall = document.querySelector(".brew-name")
                brewCall.textContent = data.name;
                var brewAddress = document.querySelector(".brew-address");
                brewAddress.textContent = data.street + " " + data.city + ", " + data.state;
                var brewPhone = document.querySelector(".phone");
                brewPhone.textContent = data.phone;
                getMap(data)
                }
            )}
    }
)};



var getMap = function(data){
    var mapScript = document.createElement("script");
    mapScript.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyBx_ugx7N5JSWJucIpYrHoPwoiEOrMOYNU&callback=initMap"
    mapScript.async = true;

    var latitude = data.latitude-0;
    var longitude = data.longitude-0;
    console.log(latitude, longitude)
    window.initMap = function() {
        map = new google.maps.Map(document.getElementById("map"), {
          center: { lat: latitude, lng: longitude },
          zoom: 10,
        });
        marker = new google.maps.Marker({
            position: { lat: latitude, lng: longitude},
            map: map
        })
    }

    brewMap.appendChild(mapScript)
}

getSearchTerm();