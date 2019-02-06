$(document).ready(function () {

    /*
    =======================================
    Global Variables
    =======================================
    */

    var currencyCode;
    var currencyName;
    var langCode;
    var langName;


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

            //Logs Weather

            $("#description").text(response.weather[0].description)


            //logs humidity
            $("#humidity").text(response.main.humidity)


            //logs temperature
            $("#temperature").text(response.main.temp + " °F");

            //Weather Icons
            var iconcode = response.weather[0].icon;
            var iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";
            var image = $("<img>").attr("src", iconurl)
            $('#icon').empty();
            $('#icon').append(image);




            /*
            =======================================
            Exchange Rate API Call
            =======================================
            */
            var exchangeURL = "https://openexchangerates.org/api/latest.json?app_id=d598f2604826443ebf4e5fef59e51d90";

            // Get currency code and name
            getCodes(countryCode, countryToCode);

            console.log("Lang code: " + langCode);
            console.log("Lang name: " + langName);
            console.log("Currency code: " + currencyCode);
            console.log("Currency name: " + currencyName);

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
    function getCodes(countryCode, countryToCode) {
        for (i in countryToCode) {
            if (i === countryCode) {
                currencyCode = countryToCode[i].CurrencyCode;
                currencyName = countryToCode[i].CurrencyName;
                langCode = countryToCode[i].LangCode;
                langName = countryToCode[i].LangName;
            }
        }
    }

});