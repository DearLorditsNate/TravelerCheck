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
    var translateText;
    var currentRate;

    var phrases = [
        "Where can I find an ATM?",
        "Can you tell me where the bank is?",
        "How much does a taxi cost?",
        "Do you accept credit cards?"
    ];

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

            // Gets city name
            var cityName = response.name;

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

            // Clears location
            $("#location").empty();

            // Prints Location
            $("#location").append(cityName + ", " + countryCode);

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

                        // Stores new rate in global variable for rate calculation
                        currentRate = response.rates[i];

                        // Creates element to hold rate info
                        var $currentRate = $("<p>").text(currentRate + " " + currencyName);

                        // Appends rate to the DOM
                        $("#currency").append($currentRate);
                    }
                }
            });

            /*
            =======================================
            Translation API Call
            =======================================
            */
            var translateKey = "trnsl.1.1.20190201T052022Z.ae090add23877f52.1b85d9520f4a032cb3316ad3fde315f2aad06966";
            var translateURL;

            $("#phrases").empty();

            for (var i = 0; i < phrases.length; i++) {
                translateText = phrases[i];
                translateURL =
                    "https://translate.yandex.net/api/v1.5/tr.json/translate?key=" +
                    translateKey +
                    "&text=" +
                    translateText +
                    "&lang=" +
                    langCode;
            
                getTranslation(i, translateURL);
            }
        });
    });

    /*
    =======================================
    Rate Calculation | Click Handler
    =======================================
    */

    $("#convert").on("click", function() {
        event.preventDefault();

        // Get user input
        var USD = $("#money").val();

        // Calculate amount in local currency
        var $amountToBring = $("<p>").text(USD * currentRate);

        // Print to DOM
        $("#currency").append($amountToBring);

        // Clear user input
        $("#money").val("");

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

    function getTranslation(index, translateURL) {
        $.ajax({
            url: translateURL,
            method: "GET"
        }).then(function (response) {
            var $engPhrase = $("<p>").text(phrases[index]);
            var $translatedPhrase = $("<p>").text(response.text);
            
            $("#phrases").append($engPhrase).append($translatedPhrase);

        });
    }
});