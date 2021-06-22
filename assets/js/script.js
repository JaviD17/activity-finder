var searchContainerEl = document.getElementById("search-form-container");
var searchEl = document.getElementById("search");

var getSearch = function(event) {
    // prevent page refresh
    event.preventDefault();

    // get value from input element
    var searchTopic = searchEl.value.trim();

    // console log may be deleted later
    console.log(searchTopic);

    var search = function() {
        window.location.href = "./index-2.html#" + searchTopic; 
    }

    if(searchTopic){
        // clear old content
        search()
        searchEl.value = "";
    }
    else {
        alert("Please enter a topic to search");
    }
};

searchContainerEl.addEventListener("submit", getSearch);