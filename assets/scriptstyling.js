// slider 
var slider = document.querySelector(".slider");
M.Slider.init(slider, {
    indicators: false,
    height: 500,
    transition: 500,
    interval: 2000
});

// autocomplete
var autoComp = document.querySelector(".autocomplete");
M.Autocomplete.init(autoComp, {
    data: {
        "Austin": null,
        "Houston": null,
        "RoundRock": null,
        "Los Angeles": null,
        "Miami": null,
        "Dallas": null,
        "Atlanta": null,
    }
});