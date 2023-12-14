// This example creates a simple polygon representing the Bermuda Triangle.
let drawRadius = 0

function databaseQuery() {

  let searchAddress = document.getElementById("address").value;
  let searchRadius = document.getElementById("radiusSearch").value;
  drawRadius = document.getElementById("radiusDraw").value;
  let address = searchAddress
  let responseData = {}



  fetch("https://faas-tor1-70ca848e.doserverless.co/api/v1/web/fn-b65c37e3-e9f6-4073-ba91-2c92088a85bd/rest-sor/location.json", {
  method: "POST",
  body: JSON.stringify({
    "location": address,
    "radius": searchRadius
}),
headers: {
  "Content-type": "application/json; charset=UTF-8"
}
})
  .then((response) => response.json())
  .then((json) => prosData(json));
  
}

function prosData(databaseJSON) {
 
  let exclusionArray = []

  for (const e in databaseJSON["data"])
    if (databaseJSON["data"][parseInt(e)]["type"] == "exclusion") {

      exclusionArraySingle = []
      if (databaseJSON["data"][parseInt(e)]["geometry"]["type"] == "MultiPolygon") {     
      for (const f in databaseJSON["data"][parseInt(e)]["geometry"]["coordinates"][0][0]) {
        exclusionArraySingle.push({lat: databaseJSON["data"][parseInt(e)]["geometry"]["coordinates"][0][0][parseInt(f)][1], lng: databaseJSON["data"][parseInt(e)]["geometry"]["coordinates"][0][0][parseInt(f)][0]})
      }
      exclusionArray.push(exclusionArraySingle)
    }

    if (databaseJSON["data"][parseInt(e)]["geometry"]["type"] == "Polygon") {     
      for (const f in databaseJSON["data"][parseInt(e)]["geometry"]["coordinates"][0]) {
        exclusionArraySingle.push({lat: databaseJSON["data"][parseInt(e)]["geometry"]["coordinates"][0][parseInt(f)][1], lng: databaseJSON["data"][parseInt(e)]["geometry"]["coordinates"][0][parseInt(f)][0]})
      }
      exclusionArray.push(exclusionArraySingle)
    }
    }


    initMap(databaseJSON["data"][0]["input_data"]["lat"], databaseJSON["data"][0]["input_data"]["lon"], 153, exclusionArray)
}


function initMap(userLat, userLon, userRadius, polyData) {

    console.log(polyData)
    const map = new google.maps.Map(document.getElementById("map"), {
      zoom: 16,
      center: { lat: userLat, lng: userLon},
      mapTypeId: "hybrid",
    });


  
    // Construct the polygon.
    const radiusOfUser = new google.maps.Circle({
      strokeColor: "#FF0000",
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: "#FF0000",
      fillOpacity: 0.35,
      map,
      center: { lat: userLat, lng: userLon},
      radius: parseInt(drawRadius),
    });
  
    for (const point in polyData) {
      console.log(polyData[parseInt(point)])
      const pointChart = new google.maps.Polygon({
        paths: polyData[parseInt(point)],
        strokeColor: "#FF0000",
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: "#FF0000",
        fillOpacity: 0.35,
        map
      });    

    }

  }
  
  window.initMap = initMap;
