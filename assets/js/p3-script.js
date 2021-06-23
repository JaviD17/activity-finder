var getSearchTerm = function() {
    var queryString = document.location.href
    var brewId = queryString.split("#")[1]
generateBreweries(brewId)
}
var saveTasks = function() {
                    localStorage.setItem("tasks", JSON.stringify(tasks));
                  }
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

                var brewURL= document.createElement("a");
                brewURL.setAttribute("href", data.website_url)
                URLEl = document.querySelector(".url");
                brewURL.textContent = data.website_url;
                URLEl.appendChild(brewURL);
                }
            )}
    }
    )}
    
    getSearchTerm();
