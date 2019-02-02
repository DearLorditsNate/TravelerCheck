$(document).ready(function() {
    
    var exchangeURL = "http://data.fixer.io/api/latest?access_key=98edce21485991d44325a63f98401c19"

    var currencyCode = "USD";

    $.ajax({
        url: exchangeURL,
        method: "GET"
    }).then(function(response) {
        for (i in response) {
            if (i === currencyCode) {
                console.log(response.rates[i]);
            }
        }
    });

})