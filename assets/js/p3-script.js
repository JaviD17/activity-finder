let brewMap = document.querySelector(".map")

var getSearchTerm = function () {
    var queryString = document.location.href;
    var brewId = queryString.split("#")[1];
    generateBreweries(brewId);
};

var generateBreweries = function (brewId) {
    var apiUrl = "https://api.openbrewerydb.org/breweries/" + brewId;
    fetch(apiUrl)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                
                var brewCall = document.querySelector(".brew-name")
                brewCall.textContent = data.name;
                
                var brewAddress = document.querySelector(".brew-address");
                brewAddress.textContent = data.street + " " + data.city + ", " + data.state;
                
                // get formatted phone number
                var phoneNumFormatted = formatPhoneNum(data.phone);
                console.log(phoneNumFormatted);
                
                var brewPhone = document.querySelector(".phone");
                brewPhone.textContent = phoneNumFormatted;
                
                var brewURL= document.createElement("a");
                brewURL.setAttribute("href", data.website_url)
                var URLEl = document.querySelector(".url");
                brewURL.textContent = data.website_url;
                URLEl.appendChild(brewURL);
                getMap(data)
            })
        }
    })
};

var formatPhoneNum = function (PhoneNumber) {
    var phoneNum = PhoneNumber.split("", 10);
    
    var areaCode = "(" + phoneNum[0] + phoneNum[1] + phoneNum[2] + (")-");
    var restNum = phoneNum[3] + phoneNum[4] + phoneNum[5] + "-" + phoneNum[6] + phoneNum[7] + phoneNum[8] + phoneNum[9];
    return areaCode + restNum;
}

var getMap = function(data){
    var mapScript = document.createElement("script");
    mapScript.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyBx_ugx7N5JSWJucIpYrHoPwoiEOrMOYNU&callback=initMap"
    mapScript.async = true;

    var latitude = data.latitude-0;
    var longitude = data.longitude-0;
    console.log(latitude, longitude)
    if (latitude === 0 || longitude === 0) {
        return;
    } else {
    window.initMap = function() {
        map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: latitude, lng: longitude },
        zoom: 10,
    });console.log("this")
        marker = new google.maps.Marker({
            position: { lat: latitude, lng: longitude},
        map: map
    })
}
}
    brewMap.appendChild(mapScript)
}



getSearchTerm();
