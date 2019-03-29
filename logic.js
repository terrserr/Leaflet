
  var myMap = L.map("map", {
    center: [
      39, -99.71
    ],
    zoom: 5
  });

  var streetmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.streets",
    accessToken: API_KEY
  }).addTo(myMap);

// Store our API endpoint inside queryUrl
var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/1.0_week.geojson";

// Perform a GET request to the query URL
d3.json(queryUrl, function(data) {
  var earthquakeData = data.features;

  for (var i = 0; i< earthquakeData.length; i++){
    var color = "";
    if (earthquakeData[i].properties.mag >5){
      color = "purple";
    }
    else if (earthquakeData[i].properties.mag > 4){
      color = "red";
    }
    else if (earthquakeData[i].properties.mag > 3){
      color = "gold";
    }
    else if (earthquakeData[i].properties.mag > 2){
      color = "yellow";
    }
    else if (earthquakeData[i].properties.mag > 1){
      color = "greenyellow";
    }
    else{
      color = "white";
    }
  
    var earthquakes = L.circle([earthquakeData[i].geometry.coordinates[1], earthquakeData[i].geometry.coordinates[0]],{
      fillOpacity : .75,
      color: "white",
      fillColor: color,
      radius: earthquakeData[i].properties.mag*13000}).bindPopup("<h3>" + earthquakeData[i].properties.place +
      "</h3><hr><p>" + new Date(earthquakeData[i].properties.time) + "</p>");
    
    earthquakes.addTo(myMap);

    console.log(earthquakes);
    };
  });

var legend = L.control({ position: "bottomright" });

legend.onAdd = function(myMap) {
  var div = L.DomUtil.create("div", "legend");
  div.innerHTML += "<h4>Magnitude</h4>";
  div.innerHTML += '<i style="background: white"></i><span>0-1</span><br>';
  div.innerHTML += '<i style="background: greenyellow"></i><span>1-2</span><br>';
  div.innerHTML += '<i style="background: yellow"></i><span>2-3</span><br>';
  div.innerHTML += '<i style="background: gold"></i><span>3-4</span><br>';
  div.innerHTML += '<i style="background: red"></i><span>4-5</span><br>';
  div.innerHTML += '<i style="background: purple"></i><span>5+</span><br>';
   

  return div;
};

legend.addTo(myMap);