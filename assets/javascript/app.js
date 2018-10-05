


    // Here we grab the text from the input box
    //var place = $("#weather-input").val(); - COULD BE USED IF WE WANT TO ADD A BOX TO ADD ADDRESSf
    // var place = "29.7604,95.3698";
    var APIKey = "166a433c57516f51dfab1f7edaed8413"; 

    
    var queryURL1 = "https://api.openweathermap.org/data/2.5/weather?" + "q=houston,us&units=imperial&appid="+ APIKey;

    $.ajax({
        url: queryURL1,
        method: "GET"
    }).then(function(response) {

        console.log(queryURL1);

        console.log(response);

        var iconCode = response.weather[0].icon;

        var iconUrl = "http://openweathermap.org/img/w/" + iconCode + ".png";
        
        $(".city").html("<h1> " + response.name + " </h1>");
        $(".current").text("Current: " + response.weather[0].description);
        $(".icon").html("<img src='" + iconUrl  + "'>");
        $(".currentWind").text("Wind Speed: " + response.wind.speed + " mph");

        // console.log("Current: " + response.weather[0].description);
        // console.log$("<img src='" + iconUrl  + "'>");
        // console.log("Wind Speed: " + response.wind.speed);


    });

    // Here we construct our URL fot future forecast
    var queryURL2 = "https://api.openweathermap.org/data/2.5/forecast?" + "q=houston,us&units=imperial&appid="+ APIKey;

    $.ajax({
      url: queryURL2,
      method: "GET"
    }).then(function(response) {

        console.log(queryURL1);

        console.log(response);

        var iconCode = response.list[1].weather[0].icon;

        var iconUrl = "http://openweathermap.org/img/w/" + iconCode + ".png";
        
        $(".three").text("3 Hours: " + response.list[0].weather[0].description);
        $(".threeIcon").html("<img src='http://openweathermap.org/img/w/" + response.list[0].weather[0].icon + ".png' alt='Icon depicting current weather.'>");
        $(".threeWind").text("3 hrs Wind Speed: " + response.list[0].wind.speed + " mph");
        $(".six").text("6 Hours: " + response.list[1].weather[0].description);
        $(".sixIcon").html("<img src='http://openweathermap.org/img/w/" + response.list[1].weather[0].icon + ".png' alt='Icon depicting current weather.'>");
        $(".sixWind").text("6 hrs Wind Speed: " + response.list[1].wind.speed + " mph");
        $(".nine").text("9 Hours: " + response.list[2].weather[0].description);
        $(".nineIcon").html("<img src='http://openweathermap.org/img/w/" + response.list[2].weather[0].icon + ".png' alt='Icon depicting current weather.'>");
        $(".nineWind").text("9 hrs Wind Speed: " + response.list[2].wind.speed + " mph");


        // console.log("3 Hours: " + response.list[0].weather[0].description);
        // console.log("<img src='http://openweathermap.org/img/w/" + response.list[0].weather[0].icon + ".png' alt='Icon depicting current weather.'>");
        // console.log("3 hrs Wind Speed: " + response.list[0].wind.speed);
        // console.log("6 Hours: " + response.list[1].weather[0].description);
        // console.log("<img src='http://openweathermap.org/img/w/" + response.list[1].weather[0].icon + ".png' alt='Icon depicting current weather.'>");
        // console.log("6 hrs Wind Speed: " + response.list[1].wind.speed);
        // console.log("9 Hours: " + response.list[2].weather[0].description);
        // console.log("<img src='http://openweathermap.org/img/w/" + response.list[2].weather[0].icon + ".png' alt='Icon depicting current weather.'>");
        // console.log("9 hrs Wind Speed: " + response.list[2].wind.speed);

    });



    // ----------------------------------------------------------------------