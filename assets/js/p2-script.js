var eventcontEl = document.querySelector(".results-list");
var listItemEl = document.querySelector(".result-item");

var getSearchTerm = function() {
    var queryString = document.location.href
    var searchTerm = queryString.split("#")[1]
    searchBreweries(searchTerm)
}

var searchBreweries = function(searchTerm) {
    var apiUrl = "https://api.openbrewerydb.org/breweries/search?query=" + searchTerm;
    fetch(apiUrl)
        .then(function(response) {
            if (response.ok) {
                response.json().then(function(data) {
                    for (i = 0; i < data.length ; i++) {
                        if (data[i].street === null) {
                            i++;
                            break;
                        } else {
                            var brewList = document.createElement("li");
                            brewList.className = "result-item-" + [i];
                            var brewName = document.createElement("h3");
                            brewName.innerText = data[i].name;
                            brewName.className = "brewery-name";
                            var brewAddress = document.createElement("address");
                            brewAddress.innerText = data[i].street + ", " + data[i].city + ", " + data[i].state;

                            brewList.appendChild(brewName);
                            brewList.appendChild(brewAddress);
                            eventcontEl.appendChild(brewList);
                        }
                    }
                   
                })
            } else {
                
            }
            
        })
}

getSearchTerm()