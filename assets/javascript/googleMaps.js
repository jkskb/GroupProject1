    var APIKey = "AIzaSyDPwAsU2hCjtgCnieRhfwVk7BvOIi7OW2U";
    var queryUrl = "https://maps.googleapis.com/maps/api/js?key=" + APIKey + "&libraries=visualization&callback=initMap";
    var map;
    var directions;
    var displayDirections;
    var latitude;
    var longitude;
    var directionsLatLng;
   


    function initMap() {
        console.log("initMap");
        map = new google.maps.Map(document.getElementById('map'), {
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
        }


            
            
            