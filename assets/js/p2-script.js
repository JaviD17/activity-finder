var eventcontEl = document.querySelector(".results-list");

var getSearchTerm = function() {
    var queryString = document.location.href
    var searchTerm = queryString.split("#")[1]
    getSearchResults(searchTerm)
}

var getSearchResults = function(searchTerm) {
    var apiUrl = "https://api.yelp.com/v3/businesses/search?term=";
    $.ajax({
        url: apiUrl,
        Headers: {
            'Authorization' : "Bearer er0ZXFHh6nYx9FXwkH6h4Rn8k0Ijiyzc4S-41yN09MFenzXQHm5mDuy96C7_P9gB5hG3H2WF9Q0dxYzEneomJ3rqOrXVxHVsU0X6OCfM-t6aiCnWH7jGpqnIPJPPYHYx",
        },
        dataType: "jsonp",
        method: "GET",
        success: function(data){
            console.log(data)
        }
    })
}

getSearchTerm()