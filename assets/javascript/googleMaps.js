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

    // Create the places service.
    var service = new google.maps.places.PlacesService(map);
    console.log(service);
    var getNextPage = null;
    var moreButton = document.getElementById('more');
    moreButton.onclick = function() {
      moreButton.disabled = true;
      if (getNextPage) getNextPage();
      console.log(getNextPage);
    };

    // Perform a nearby search.
    service.nearbySearch(
        {location: pyrmont, radius: 500, type: ['store']},
        function(results, status, pagination) {
          if (status !== 'OK') return;
          console.log(nearbySearch);

          createMarkers(results);
          moreButton.disabled = !pagination.hasNextPage;
          getNextPage = pagination.hasNextPage && function() {
            pagination.nextPage();
          };
        });
  },

  function createMarkers(places) {
    var bounds = new google.maps.LatLngBounds();
    var placesList = document.getElementById('places');
    console.log(createMarkers);

    for (var i = 0, place; place = places[i]; i++) {
      var image = {
        url: place.icon,
        size: new google.maps.Size(71, 71),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(17, 34),
        scaledSize: new google.maps.Size(25, 25)
      };

      var marker = new google.maps.Marker({
        map: map,
        icon: image,
        title: place.name,
        position: place.geometry.location
      });
      console.log(marker);

      var li = document.createElement('li');
      li.textContent = place.name;
      placesList.appendChild(li);

      bounds.extend(place.geometry.location);
    }
    map.fitBounds(bounds);
  })
    
    // add "directions-canvas" to the ID's
    var directions = document.getElementById("directions-canvas");

    function initMap() {
        var markerArray = [];

        // Instantiate a directions service.
        var directionsService = new google.maps.DirectionsService;

        // Create a map and center it on Manhattan.
        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 13,
          center: {lat: 40.771, lng: -73.974}
        });

        // Create a renderer for directions and bind it to the map.
        var directionsDisplay = new google.maps.DirectionsRenderer({map: map});

        // Instantiate an info window to hold step text.
        var stepDisplay = new google.maps.InfoWindow;

        // Display the route between the initial start and end selections.
        calculateAndDisplayRoute(
            directionsDisplay, directionsService, markerArray, stepDisplay, map);
        // Listen to change events from the start and end lists.
        var onChangeHandler = function() {
          calculateAndDisplayRoute(
              directionsDisplay, directionsService, markerArray, stepDisplay, map);
        };
        document.getElementById('start').addEventListener('change', onChangeHandler);
        document.getElementById('end').addEventListener('change', onChangeHandler);
      }

      function calculateAndDisplayRoute(directionsDisplay, directionsService,
          markerArray, stepDisplay, map) {
        // First, remove any existing markers from the map.
        for (var i = 0; i < markerArray.length; i++) {
          markerArray[i].setMap(null);
        }

        // Retrieve the start and end locations and create a DirectionsRequest using
        // WALKING directions.
        directionsService.route({
          origin: document.getElementById('start').value,
          destination: document.getElementById('end').value,
          travelMode: 'WALKING'
        }, function(response, status) {
          // Route the directions and pass the response to a function to create
          // markers for each step.
          if (status === 'OK') {
            document.getElementById('warnings-panel').innerHTML =
                '<b>' + response.routes[0].warnings + '</b>';
            directionsDisplay.setDirections(response);
            showSteps(response, markerArray, stepDisplay, map);
          } else {
            window.alert('Directions request failed due to ' + status);
          }
        });
      }

      function showSteps(directionResult, markerArray, stepDisplay, map) {
        // For each step, place a marker, and add the text to the marker's infowindow.
        // Also attach the marker to an array so we can keep track of it and remove it
        // when calculating new routes.
        var myRoute = directionResult.routes[0].legs[0];
        for (var i = 0; i < myRoute.steps.length; i++) {
          var marker = markerArray[i] = markerArray[i] || new google.maps.Marker;
          marker.setMap(map);
          marker.setPosition(myRoute.steps[i].start_location);
          attachInstructionText(
              stepDisplay, marker, myRoute.steps[i].instructions, map);
        }
      }

      function attachInstructionText(stepDisplay, marker, text, map) {
        google.maps.event.addListener(marker, 'click', function() {
          // Open an info window when the marker is clicked on, containing the text
          // of the step.
          stepDisplay.setContent(text);
          stepDisplay.open(map, marker);
        });
      }
    

// Search function example:

// var searchBox = new google.maps.places.SearchBox();

// function initAutocomplete() {
//     var map = new google.maps.Map(document.getElementById('map'), {
//       center: {lat: -33.8688, lng: 151.2195},
//       zoom: 13,
//       mapTypeId: 'roadmap'
//     });

//     // Create the search box and link it to the UI element.
//     var input = document.getElementById('pac-input');
//     var searchBox = new google.maps.places.SearchBox(input);
//     map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

//     // Bias the SearchBox results towards current map's viewport.
//     map.addListener('bounds_changed', function() {
//       searchBox.setBounds(map.getBounds());
//     });

//     var markers = [];
//     // Listen for the event fired when the user selects a prediction and retrieve
//     // more details for that place.
//     searchBox.addListener('places_changed', function() {
//       var places = searchBox.getPlaces();

//       if (places.length == 0) {
//         return;
//       }

//       // Clear out the old markers.
//       markers.forEach(function(marker) {
//         marker.setMap(null);
//       });
//       markers = [];

//       // For each place, get the icon, name and location.
//       var bounds = new google.maps.LatLngBounds();
//       places.forEach(function(place) {
//         if (!place.geometry) {
//           console.log("Returned place contains no geometry");
//           return;
//         }
//         var icon = {
//           url: place.icon,
//           size: new google.maps.Size(71, 71),
//           origin: new google.maps.Point(0, 0),
//           anchor: new google.maps.Point(17, 34),
//           scaledSize: new google.maps.Size(25, 25)
//         };

//         // Create a marker for each place.
//         markers.push(new google.maps.Marker({
//           map: map,
//           icon: icon,
//           title: place.name,
//           position: place.geometry.location
//         }));

//         if (place.geometry.viewport) {
//           // Only geocodes have viewport.
//           bounds.union(place.geometry.viewport);
//         } else {
//           bounds.extend(place.geometry.location);
//         }
//       });
//       map.fitBounds(bounds);
//     });
//   }

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
