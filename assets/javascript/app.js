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

            /*
            =======================================
            Translation API Call
            =======================================
            */
            var translateKey = "trnsl.1.1.20190201T052022Z.ae090add23877f52.1b85d9520f4a032cb3316ad3fde315f2aad06966";
            var translateURL;
            var $engPhrase;
            var $translatedPhrase;

            for (var i = 0; i < phrases.length; i++) {
                translateText = phrases[i];
                translateURL =
                    "https://translate.yandex.net/api/v1.5/tr.json/translate?key=" +
                    translateKey +
                    "&text=" +
                    translateText +
                    "&lang=" +
                    langCode;

                $engPhrase = $("<p>").text(translateText).attr("id", i);
                $translatedPhrase = $("<p>").attr("data-id", i);

                $("#phrases").append($engPhrase).append($translatedPhrase);
            

                $.ajax({
                    url: translateURL,
                    method: "GET"
                }).then(function (response) {
                    // var $translatedPhrase = $("<p>").text(response.text).attr("data-id", i);

                    $("#phrases").attr();

                });

            }






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