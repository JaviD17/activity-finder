var getSearchTerm = function() {
    var queryString = document.location.href
    var brewID = queryString.split("#")[1]
    console.log(brewID)
generateBreweries(brewID)
}

var generateBreweries = function() {
    var apiUrl = "https://api.openbrewerydb.org/breweries/" + brewID;
    fetch(apiUrl)
    .then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                var brewName = document.querySelector(".brew-name");
                brewName.textContent = data.brew;
                var brewAddress = document.querySelector(".brew-address");
                brewAddress.textContent = data.street + " " + data.city + ", " + data.state;
                }
            )}
    }
    )}
getSearchTerm();
