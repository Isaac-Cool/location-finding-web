// This example creates a simple polygon representing the Bermuda Triangle.
function initMap(userLat, userLon, userRadius) {

    const map = new google.maps.Map(document.getElementById("map"), {
      zoom: 16,
      center: { lat: userLat, lng: userLon},
      mapTypeId: "terrain",
    });

    const userLocation = [{lat: userLat, lng: userLon}, userRadius]

    // Define the LatLng coordinates for the polygon's path.
    const triangleCoords = [
      { lat: 25.774, lng: -80.19 },
      { lat: 18.466, lng: -66.118 },
      { lat: 32.321, lng: -64.757 },
      { lat: 25.774, lng: -80.19 },
    ];
    // Construct the polygon.
    const radiusOfUser = new google.maps.Circle({
      strokeColor: "#FF0000",
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: "#FF0000",
      fillOpacity: 0.35,
      map,
      center: { lat: userLat, lng: userLon},
      radius: userRadius,
    });
  
  }
  
  window.initMap = initMap;
