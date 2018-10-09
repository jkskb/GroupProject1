// STEPS IN JAVASCRIPT
// 1. Open Wether API
// 2. Current Weather Forecast
// 3. Future Weather forecast (3, 6, and 9 hours out)
// 4. Initialize Firebase for Business information data storage
// 5. Create controls for Busness update form
// 6. Create Firebase event for adding business to the database and html when a user makes an entry
// 7. Create controls for contact form
// 8. Create Firebase event for adding contact info to the database
// 9. Open and close button functions
// 10. function to animate questions and answers on click
// 11. Google Maps API

//_______________________________________________________________________________________

// 1. Open Weather API
var APIKey = "166a433c57516f51dfab1f7edaed8413"; 

//contruct URL Query for current forecast
var queryURL1 = "https://api.openweathermap.org/data/2.5/weather?" + "q=houston,us&units=imperial&appid="+ APIKey;

//contruct URL Query for future forecast
var queryURL2 = "https://api.openweathermap.org/data/2.5/forecast?" + "q=houston,us&units=imperial&appid="+ APIKey;

// 2. Current Weather Forecast
$.ajax({
    url: queryURL1,
    method: "GET"
}).then(function(response) {

    // Use Moment.js to add time and date to weather report
    var now = moment();
    // console.log("DATE:" + moment(now).format("ddd[,] MMM Do") + " CURRENT TIME: " + moment(now).format("hh:mm a"));

    $("#date").text(now.format("ddd[,] MMM Do[ ― ]h:mm a"));

    // Use icon codes supplied in JSON to add weather icons to weather report
    var iconCode = response.weather[0].icon;

    var iconUrl = "http://openweathermap.org/img/w/" + iconCode + ".png";
    
    // Adding current forecast to our weather report
    $(".city").html("<h2> " + response.name + " </h2>");
    $(".current").text("Current ― " + response.weather[0].description);
    $(".icon").html("<img src='" + iconUrl  + "'>");
    $(".currentWind").text("Wind Speed: " + response.wind.speed + " mph");
  
});

// 3. Future Weather forecast (3, 6, and 9 hours out)
$.ajax({
    url: queryURL2,
    method: "GET"
}).then(function(response) {

    // Use Moment.js to add times of future foecasts to weather report
    var three = moment().add(3, 'hours');
    var six = moment().add(6, 'hours');
    var nine = moment().add(9, 'hours');
    // console.log("3 Hours From Now:" + moment(three).format("hh:mm a")); 
    // console.log("6 Hours From Now:" + moment(six).format("hh:mm a")); 
    // console.log("9 Hours From Now:" + moment(nine).format("hh:mm a")); 

    // Use icon codes supplied in JSON to add weather icons to weather report
    var iconCode = response.list[1].weather[0].icon;

    var iconUrl = "http://openweathermap.org/img/w/" + iconCode + ".png";
    
    // Adding current forecast to our weather report
    $(".three").text(three.format("ddd[, ]h:mm a[ ― ]") + response.list[0].weather[0].description);
    $(".threeIcon").html("<img src='http://openweathermap.org/img/w/" + response.list[0].weather[0].icon + ".png' alt='Icon depicting current weather.'>");
    $(".threeWind").text("Wind Speed: " + response.list[0].wind.speed + " mph");
    $(".six").text(six.format("ddd[, ]h:mm a[ ― ]") + response.list[1].weather[0].description);
    $(".sixIcon").html("<img src='http://openweathermap.org/img/w/" + response.list[1].weather[0].icon + ".png' alt='Icon depicting current weather.'>");
    $(".sixWind").text("Wind Speed: " + response.list[1].wind.speed + " mph");
    $(".nine").text(nine.format("ddd[, ]h:mm a[ ― ]") + response.list[2].weather[0].description);
    $(".nineIcon").html("<img src='http://openweathermap.org/img/w/" + response.list[2].weather[0].icon + ".png' alt='Icon depicting current weather.'>");
    $(".nineWind").text("Wind Speed: " + response.list[2].wind.speed + " mph");

});

// 4. Initialize Firebase for Business information data storage
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

// 5. Create controls for Busness update form
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

// 6. Create Firebase event for adding business to the database and html when a user makes an entry
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

    // Create the business info entry on marquee
    var addBus = $("marquee").append(
        $("<tj>").text(busName),
        $("<li>").text(busAdd),
        $("<li>").text(busComm)
    );
    
    // Append the new business info to marquee
    $("#business-feed > tbody").append(addBus);
});

// 7. Create controls for contact form
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

// 8. Create Firebase event for adding contact info to the database
database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());
});

// 9. Open and close button functions
function openForm() {
    document.getElementById("myForm").style.display = "block";
}
function submitForm() {
    document.getElementById("mySubmit").newslist.toggle("show");
}
function closeForm() {
    document.getElementById("myForm").style.display = "none";
}

// 10. function to animate questions and answers on click
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

// 11. Google Maps API
var APIKey = "AIzaSyDPwAsU2hCjtgCnieRhfwVk7BvOIi7OW2U";

var queryUrl = "https://maps.googleapis.com/maps/api/js?key=" + APIKey + "&libraries=places&callback=initMap";

var map;
var directions;
var displayDirections;
var latitude;
var longitude;
var directionsLatLng;

function initMap() {

    console.log("initMap");

    map = new google.maps.Map(document.getElementById("map"), {
            center: { lat: 29.7604, lng: -95.3698},
            zoom: 8
    });

    var simpleMarker = new google.maps.Marker({
        position: { lat: 29.7604, lng: -95.3698},
        map: map,
    });
      
    //geolocation
    infoWindow = new google.maps.InfoWindow;
    console.log("infoWindow");
    
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            
            infoWindow.setPosition(pos);
            infoWindow.setContent('Location found.');
            infoWindow.open(map);
            map.setCenter(pos);
        }, function() {
            handleLocationError(true, infoWindow, map.getCenter());
        });
    } else {
        // if Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
    }
    
    function handleLocationError(browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ?
            'Error: The Geolocation service failed.' :
            'Error: Your browser doesn\'t support geolocation.');
            infoWindow.open(map);
    }

    var input = document.getElementById('pac-input');
        
    var autocomplete = new google.maps.places.Autocomplete(
        input, {placeIdOnly: true});

    autocomplete.bindTo('bounds', map);
    
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
    
    var infowindow = new google.maps.InfoWindow();
    var infowindowContent = document.getElementById('infowindow-content');

    infowindow.setContent(infowindowContent);
    
    var geocoder = new google.maps.Geocoder;
    var marker = new google.maps.Marker({
        map: map
    });
    
    marker.addListener('click', function() {
        infowindow.open(map, marker);
    });
        
    autocomplete.addListener('place_changed', function() {
        infowindow.close();
        var place = autocomplete.getPlace();
        
        if (!place.place_id) {
            return;
        }

        geocoder.geocode({'placeId': place.place_id}, function(results, status) {
            
            if (status !== 'OK') {
                window.alert('Geocoder failed due to: ' + status);
                return;
            }

            map.setZoom(11);
            map.setCenter(results[0].geometry.location);

            // Set the position of the marker using the place ID and location.
            marker.setPlace({
                placeId: place.place_id,
                location: results[0].geometry.location
            });

            marker.setVisible(true);

            infowindowContent.children['place-name'].textContent = place.name;
            infowindowContent.children['place-id'].textContent = place.place_id;
            infowindowContent.children['place-address'].textContent =
            results[0].formatted_address;
            infowindow.open(map, marker);
        });
    });

    var infowindow = new google.maps.InfoWindow();
    var service = new google.maps.places.PlacesService(map);

    service.getDetails({
    placeId: place.place_id,
    }, function(place, status) {

        if (status === google.maps.places.PlacesServiceStatus.OK) {
            var marker = new google.maps.Marker({
            map: map,
            position: place.geometry.location
            });

            google.maps.event.addListener(marker, 'click', function() {
            infowindow.setContent('<div><strong>' + place.name + '</strong><br>' +
                'Place ID: ' + place.place_id + '<br>' +
                place.formatted_address + '</div>');
                infowindow.open(map, this);
            });
        }

    });
}
