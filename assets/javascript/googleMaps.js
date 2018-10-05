$( document ).on( "pageshow", "#directionsPage", function( event ) {
    getDirectionsLocation();
    
    
    var APIKey = "AIzaSyDPwAsU2hCjtgCnieRhfwVk7BvOIi7OW2U";
    
    var queryUrl = "https://maps.googleapis.com/maps/api/js?key=" + APIKey + "&libraries=places,geometry";
    
    
    function displayMapInfo() {
        
        $.ajax({
            url: queryURL,
            method: "GET"
        })
        .then(function(response) {
            
            
            
            
        })
    }
    
    var firebase = new Firebase("<Your Firebase URL here>");
    
    // simple map set up
    
    function myMap() {
        console.log(myMap);
        var simpleMap = {
            center: new google.maps.LatLng(29.761993, -95.366302),
            zoom: 10,
        };
        // add "map-canvas" to ID's
        var mapCanvas = new google.maps.Map(document.getElementById("map-canvas"),simpleMap);
    }
    var infowindow = new google.maps.InfoWindow({
        content: "Hello World!"
    });
    var marker = new google.maps.Marker({position:myCenter});
    marker.setMap(mapCanvas)
    infowindow.open(mapCanvas,marker)
    console.log(marker);
    
    // add "directions-canvas" to the ID's
    var directions = document.getElementById("directions-canvas");
    

// Search function example:

// var searchBox = new google.maps.places.SearchBox();

    // function performSearch() {
    //     $('#artist-search').submit(function (event) {
    //         event.preventDefault();
    //         eventCounter = 0;
    //         setInitialMap();
    //         searchInput = $('.artist-val').val().trim().split(' ').join('+').toLowerCase();
    //         $('.artist-val').val('');
    //         $('.search-results').empty();
    //         console.log(searchInput);

    // $(document).on("click", "#submit-button", function () {

    //     if ($('#state-in').val() == '') {
    //         console.log('must enter state')
    //         $('.alert-container').fadeIn();
    //         setTimeout(() => {
    //             $('.alert-container').fadeOut();
    //         }, 2000);

    //     } else {

    //         localStorage.clear();
    //         //grabs values from input
    //         var address = $("#address-in").val().trim();
    //         var city = $("#city-in").val().trim();
    //         var state = $("#state-in").val().trim();
    //         var zipcode = $("#zip-in").val().trim();
    //         //saves values from input and saves to local storage for us to use
    //         localStorage.setItem("address", address);
    //         localStorage.setItem("city", city);
    //         localStorage.setItem("state", state);
    //         localStorage.setItem("zipcode", zipcode);
    //         console.log(city + " " + state + " " + zipcode);

    //         var newUrl = "search.html";
    //         window.location.replace(newUrl);

    //     }
    // });
});
