    var APIKey = "AIzaSyDPwAsU2hCjtgCnieRhfwVk7BvOIi7OW2U";
    var queryUrl = "https://maps.googleapis.com/maps/api/js?key=" + APIKey + "&callback=initMap";
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
              var marker = new google.maps.Marker({
        position: { lat: 29.7604, lng: -95.3698},
        map: map
      });
    }


