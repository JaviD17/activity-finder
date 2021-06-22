var eventcontEl = document.querySelector(".results-list");

var getSearchTerm = function () {
    var queryString = document.location.href;
    // listing entire search term
    var searchTerm = queryString.split("#")[1];
    // listing split search term
    searchBreweries(searchTerm);
};

var searchBreweries = function (searchTerm) {
    var apiUrl = "https://api.openbrewerydb.org/breweries?by_city=" + searchTerm;
    fetch(apiUrl)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    // call listBreweries function
                    listBreweries(data);
                })
            } else {
                alert("Error: " + response.statusText);
            }

        })
        .catch(function (error) {
            alert("Unable to connect to OpenBreweries");
        })
};

var listBreweries = function (data) {
    for (var i = 0; i < data.length; i++) {
        if (data[i].city === null) {
            i++;
            break;
        }
        else {
            var brewList = document.createElement("li");
            brewList.className = "result-item-" + [i];
            
            var brewName = document.createElement("h3");
            brewName.innerText = data[i].name;
            brewName.className = "brewery-name";
            
            var brewLink = document.createElement("a")
            brewLink.setAttribute("href", "./index-3.html#" + brewName.textContent)
            
            var brewAddress = document.createElement("address");
            brewAddress.innerText = data[i].street + ", " + data[i].city + ", " + data[i].state;

            brewLink.appendChild(brewName);
            brewLink.appendChild(brewAddress);
            brewList.appendChild(brewLink)
            eventcontEl.appendChild(brewList);
        }
    }
};

getSearchTerm();