$(document).ready(function () {


    // Weather API ajax calls


    $("#submit-btn").on("click", function () {

        event.preventDefault();

        var fahrenheit = "&units=imperial";

        var city = $("#city").val();
        var apiKey = "c7ff544129cc1648ae3d73196115dbe7";
        var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + fahrenheit + "&APPID=" + apiKey;

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            console.log(response);

            //Logs Country Code
            console.log(response.sys.country);

            //Logs Weather
            console.log(response.weather[0].description);

            console.log(response.main.humidity);

            console.log(response.main.temp);
            console.log(response.main.temp_min);
            console.log(response.main.temp_max);


            //Logs UNIX timestamp
            console.log(response.dt);


            //converts UNIX timestamp to Date and Time
            





            //Weather Icons
            var iconcode = response.weather[0].icon;
            var iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";
            $('#weather-icon').attr('src', iconurl);
        

        });

    })


});