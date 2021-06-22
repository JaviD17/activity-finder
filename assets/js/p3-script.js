var getSearchTerm = function() {
    var queryString = document.location.href
    var brewName = queryString.split("#")[1]
    console.log(brewID)
generateBreweries(brewName)
}

var generateBreweries = function() {
    var apiUrl = "https://api.openbrewerydb.org/breweries?by_name" + brewName;
    fetch(apiUrl)
    .then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                
                brewCall.textContent = brewName
                var brewAddress = document.querySelector(".brew-address");
                brewAddress.textContent = data.street + " " + data.city + ", " + data.state;
                }
            )}
    }
    )}
