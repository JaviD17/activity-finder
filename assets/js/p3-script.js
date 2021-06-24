var savebtn = document.querySelector("#save");
let brewMap = document.querySelector(".map")
var eventcontEl = document.querySelector(".container");

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
    var phoneNum = PhoneNumber.split("", 4)
    console.log(phoneNum)
    if (PhoneNumber === null) {
        
    }
    if (phoneNum[4] === ")" || phoneNum[3] === "-") {
        return PhoneNumber
    }
    else {
    var phoneNum = PhoneNumber.split("", 10);
    
    var areaCode = "(" + phoneNum[0] + phoneNum[1] + phoneNum[2] + (")-");
    var restNum = phoneNum[3] + phoneNum[4] + phoneNum[5] + "-" + phoneNum[6] + phoneNum[7] + phoneNum[8] + phoneNum[9];
    return areaCode + restNum;}
}
var saveTasks = function() {
    let queryString = document.location.href;
    let brewId = queryString.split("#")[1];
    let savedIds = localStorage.getItem("brewIds");
    if (!savedIds) {
        brewId = JSON.stringify(brewId)
        localStorage.setItem("brewIds", [brewId]);

    }
    else {
    
    let savedIds = JSON.parse(savedIds);
    console.log(typeof savedIds)
    
    if (typeof savedIds !== "object") {
        savedIds= [savedIds]
        localStorage.setItem("brewIds", JSON.stringify(savedIds));
    
    }
    else {
    savedIds.push(brewId)
    localStorage.setItem("brewIds", JSON.stringify(savedIds));
    console.log("id saved!")}}
    
  };
  
  var loadIds = function() {
    var savedIds = localStorage.getItem("brewIds");
    // if there are no tasks, set tasks to an empty array and return out of the function
    if (!savedIds) {
        console.log("no Ids!")
      localStorage.setItem("brewIds", [])
      
    }
    else {
    console.log("Saved tasks found!");
    // else, load up saved tasks
  
    // parse into array of objects
    savedIds = JSON.parse(savedIds)
    listBreweries(savedIds);
    ;}
    
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

var listBreweries = function (savedIds) {
    for (var i = 0; i < savedIds.length; i++) {
        if (!savedIds === null) {
            break;
        }
        if (typeof savedIds !== "object") {
            brewId = savedIds
            var apiUrl = "https://api.openbrewerydb.org/breweries/" + brewId;
            var brewList = document.createElement("li");
            brewList.className = "result-item-" + [1];

            fetch(apiUrl)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
            var brewName = document.createElement("h3");
            console.log(data)
            
            
            brewName.innerText = data.name;
            brewName.className = "brewery-name";

            var breweryId = data.id

            var brewLink = document.createElement("a")
            brewLink.setAttribute("href", "./index-3.html#" + breweryId)

            var brewAddress = document.createElement("address");
            brewAddress.innerText = data.street + ", " + data.city + ", " + data.state;

            brewLink.appendChild(brewName);
            brewLink.appendChild(brewAddress);
            brewList.appendChild(brewLink)
            eventcontEl.appendChild(brewList);})
            

                }
        })
        break;
    }
        else {
            brewId = savedIds[i]
            var apiUrl = "https://api.openbrewerydb.org/breweries/" + brewId;
            var brewList = document.createElement("li");
            brewList.className = "result-item-" + [i];

            fetch(apiUrl)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
            var brewName = document.createElement("h3");
            console.log(data)
            
            
            brewName.innerText = data.name;
            brewName.className = "brewery-name";

            var breweryId = data.id

            var brewLink = document.createElement("a")
            brewLink.setAttribute("href", "./index-3.html#" + breweryId)

            var brewAddress = document.createElement("address");
            brewAddress.innerText = data.street + ", " + data.city + ", " + data.state;

            brewLink.appendChild(brewName);
            brewLink.appendChild(brewAddress);
            brewList.appendChild(brewLink)
            eventcontEl.appendChild(brewList);})
        }
    })
}
    }};

getSearchTerm();
loadIds();
savebtn.addEventListener("click", saveTasks);
