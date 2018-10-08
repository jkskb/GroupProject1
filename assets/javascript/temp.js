  
    // Here we grab the text from the input box
    //var place = $("#weather-input").val(); - COULD BE USED IF WE WANT TO ADD A BOX TO ADD ADDRESSf
    // var place = "29.7604,95.3698";
var APIKey = "166a433c57516f51dfab1f7edaed8413"; 


var queryURL1 = "https://api.openweathermap.org/data/2.5/weather?" + "q=houston,us&units=imperial&appid="+ APIKey;

$.ajax({
    url: queryURL1,
    method: "GET"
}).then(function(response) {

    var now = moment();
    console.log("DATE:" + moment(now).format("ddd[,] MMM Do") + " CURRENT TIME: " + moment(now).format("hh:mm a"));

    $("#date").text(now.format("ddd[,] MMM Do[ ― ]h:mm a"));

    var iconCode = response.weather[0].icon;

    var iconUrl = "http://openweathermap.org/img/w/" + iconCode + ".png";
    
    $(".city").html("<h2> " + response.name + " </h2>");
    $(".current").text("Current ― " + response.weather[0].description);
    $(".icon").html("<img src='" + iconUrl  + "'>");
    $(".currentWind").text("Wind Speed: " + response.wind.speed + " mph");

    // console.log("Current: " + response.weather[0].description);
    // console.log$("<img src='" + iconUrl  + "'>");
    // console.log("Wind Speed: " + response.wind.speed);


});

// Here we construct our URL for future forecast
var queryURL2 = "https://api.openweathermap.org/data/2.5/forecast?" + "q=houston,us&units=imperial&appid="+ APIKey;

$.ajax({
    url: queryURL2,
    method: "GET"
}).then(function(response) {

    var three = moment().add(3, 'hours');
    var six = moment().add(6, 'hours');
    var nine = moment().add(9, 'hours');
    console.log("3 Hours From Now:" + moment(three).format("hh:mm a")); 
    console.log("6 Hours From Now:" + moment(six).format("hh:mm a")); 
    console.log("9 Hours From Now:" + moment(nine).format("hh:mm a")); 

    var iconCode = response.list[1].weather[0].icon;

    var iconUrl = "http://openweathermap.org/img/w/" + iconCode + ".png";
    
    $(".three").text(three.format("ddd[, ]h:mm a[ ― ]") + response.list[0].weather[0].description);
    $(".threeIcon").html("<img src='http://openweathermap.org/img/w/" + response.list[0].weather[0].icon + ".png' alt='Icon depicting current weather.'>");
    $(".threeWind").text("Wind Speed: " + response.list[0].wind.speed + " mph");
    $(".six").text(six.format("ddd[, ]h:mm a[ ― ]") + response.list[1].weather[0].description);
    $(".sixIcon").html("<img src='http://openweathermap.org/img/w/" + response.list[1].weather[0].icon + ".png' alt='Icon depicting current weather.'>");
    $(".sixWind").text("Wind Speed: " + response.list[1].wind.speed + " mph");
    $(".nine").text(nine.format("ddd[, ]h:mm a[ ― ]") + response.list[2].weather[0].description);
    $(".nineIcon").html("<img src='http://openweathermap.org/img/w/" + response.list[2].weather[0].icon + ".png' alt='Icon depicting current weather.'>");
    $(".nineWind").text("Wind Speed: " + response.list[2].wind.speed + " mph");


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

// Initialize Firebase for Business information data storage
var config = {
    apiKey: "AIzaSyB5nrNRrvIK7EtU8khc4JJb4vs9kJ_huHI",
    authDomain: "dsbusupdates.firebaseapp.com",
    databaseURL: "https://dsbusupdates.firebaseio.com",
    projectId: "dsbusupdates",
    storageBucket: "dsbusupdates.appspot.com",
    messagingSenderId: "640603408577"
};

firebase.initializeApp(config);

var database = firebase.database();

// Button for adding business update
$("#add-news-btn").on("click", function(event) {
    event.preventDefault();

  // Grabs user input
  var busName = $("#business-name-input").val().trim();
  var busAdd = $("#business-address-input").val().trim();
  var busComm = $("#user-comment-input").val().trim();

  // Creates local "temporary" object for holding business data
  var newBus = {
    name: busName,
    address: busAdd,
    comment: busComm
  };

  // Uploads business data to the database
  database.ref().push(newBus);

  // Logs everything to console
  console.log(busName.name);
  console.log(busAdd.address); 
  console.log(busComm.comment);

  // Clears all of the text-boxes
  $("#business-name-input").val("");
  $("#business-address-input").val("");
  $("#user-comment-input").val("");
});

//Create Firebase event for adding business to the database and add to the html when a user makes an entry
database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());
  
    // Store into a variable.
    var busName = childSnapshot.val().name;
    var busAdd = childSnapshot.val().address;
    var busComm = childSnapshot.val().comment;
  
    // console log business info
    console.log(busName);
    console.log(busAdd);
    console.log(busComm);

    // Create the business info entry
    var newRow = $("marquee").append(
      $("<tj>").text(busName),
      $("<p>").text(busAdd),
      $("<p>").text("[ ― ]" + busComm)
    );
  
    // Append the new row to the table
    $("#business-feed > tbody").append(newRow);
});

// Button for adding contact form information to Firebase
$("#add-contact-btn").on("click", function(event) {
    event.preventDefault();

    // Grabs user input
    var conName = $("#contact-name-input").val().trim();
    var conZip = $("#contact-zip-input").val().trim();
    var conEmail = $("#contact-email-input").val().trim();
    var conComm = $("#contact-comment-input").val().trim();

    // Creates local "temporary" object for holding contact data
    var newCon = {
        contact: conName,
        zip: conZip,
        email: conEmail,
        feedback: conComm
    };

    // Uploads cantact data to the database
    database.ref().push(newCon);

    // Logs everything to console
    console.log(conName.contact);
    console.log(conZip.zip); 
    console.log(conEmail.email); 
    console.log(conComm.feedback);

    // Clears all of the text-boxes
    $("#contact-name-input").val("");
    $("#contact-zip-input").val("");
    $("#contact-email-input").val("");
    $("#contact-comment-input").val("");
});

//Create Firebase event for adding contact form information to the database when a user adds an entry
database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());
});

// open and close button functions
function openForm() {
    document.getElementById("myForm").style.display = "block";
}
function submitForm() {
    document.getElementById("mySubmit").newslist.toggle("show");
}
function closeForm() {
    document.getElementById("myForm").style.display = "none";
}

// function to animate questions and answers on click
$(document).ready(function() {
 
    $('.faq_question').click(function() {
 
        if ($(this).parent().is('.open')){
            $(this).closest('.faq').find('.faq_answer_container').animate({'height':'0'},500);
            $(this).closest('.faq').removeClass('open');
 
        }else{
            var newHeight =$(this).closest('.faq').find('.faq_answer').height() +'px';
            $(this).closest('.faq').find('.faq_answer_container').animate({'height':newHeight},500);
            $(this).closest('.faq').addClass('open');
        }
 
    });
 
});