$(document).ready(function () {

    /*
    =======================================
    Global Variables
    =======================================
    */

    var currencyCode;
    var currencyName;


    /*
    =======================================
    OpenWeather API Call
    =======================================
    */

    $("#search").on("click", function () {

        event.preventDefault();

        var fahrenheit = "&units=imperial";

        var city = $("#city").val();
        var apiKey = "c7ff544129cc1648ae3d73196115dbe7";
        var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + fahrenheit + "&APPID=" + apiKey;

        // Clear input field
        $("#city").val("");

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            // Gets country code
            var countryCode = response.sys.country;

            //Logs Country Code
            console.log(response.sys.country);

            //Logs Weather
            console.log(response.weather[0].description);

            console.log(response.main.humidity);

            console.log(response.main.temp);
            console.log(response.main.temp_min);
            console.log(response.main.temp_max);


            //Logs UNIX Date and Time
            console.log(response.dt);

            //Weather Icons
            var iconcode = response.weather[0].icon;
            var iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";
            $('#weather-icon').attr('src', iconurl);


            /*
            =======================================
            Exchange Rate API Call
            =======================================
            */
            var exchangeURL = "https://openexchangerates.org/api/latest.json?app_id=d598f2604826443ebf4e5fef59e51d90";

            // Get currency code and name
            getCurrency(countryCode, countryToCurrency);

            $.ajax({
                url: exchangeURL,
                method: "GET"
            }).then(function (response) {
                for (i in response.rates) {
                    if (i === currencyCode) {
                        // Empties old calculation
                        $("#currency").empty();

                        // Stores new rate
                        var $currentRate = $("<p>").text(response.rates[i] + " " + currencyName);

                        // Appends rate to the DOM
                        $("#currency").append($currentRate);
                    }
                }
            });
        });
    });

    /*
    =======================================
    Function Declarations
    =======================================
    */

    // Find Currency Code from Country Code
    function getCurrency(countryCode, countryToCurrency) {
        for (i in countryToCurrency) {
            if (i === countryCode) {
                currencyCode = countryToCurrency[i].Code;
                currencyName = countryToCurrency[i].Currency;
            }
        }
    }

});