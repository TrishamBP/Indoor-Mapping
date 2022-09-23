// Web Socket Connection
const socket = io();
//Opening the default leaflet map
L.Map = L.Map.extend({
  openPopup: function (popup) {
    //        this.closePopup();  // just comment this
    this._popup = popup;

    return this.addLayer(popup).fire("popupopen", {
      popup: this._popup,
    });
  },
});
//CRS-Coordinate Reference System
var map = L.map("map", {
  crs: L.CRS.Simple,
  minZoom: -0.35,
  maxZoom: -0.35,
});
// Setting Bounds
var bounds = [
  [0, 0],
  [1000, 1000],
];
var image = L.imageOverlay("images/fp2.png", bounds, {
  interactive: true,
}).addTo(map);
map.fitBounds(bounds);
//
socket.on("connection");
//
var form = document.getElementById("form");
form.addEventListener("submit", function (e) {
  e.preventDefault();
  let xdata = document.getElementById("fname").value;
  let xdataFinal = document.getElementById("fnamef").value;
  let ydata = document.getElementById("lname").value;
  let ydataFinal = document.getElementById("lnamef").value;
  var value = document.getElementById("bots");
  var getvalue = value.options[value.selectedIndex].value;
  var status = document.getElementById("botsstatus");
  var statusValue = status.options[status.selectedIndex].value;
  socket.emit(
    "coordinateUpdate",
    xdata,
    ydata,
    xdataFinal,
    ydataFinal,
    getvalue,
    statusValue
  );
});

//
socket.on("coordinateUpdate", (value, args, status) => {
  console.log(value);
  console.log(args);
  console.log(status);
  if (value === "bot1") {
    if (status === "red") {
      var botIcon1 = L.icon({
        iconUrl: "images/red-cart.png",
        iconSize: [38, 38],
        popupAnchor: [-1, -10], // point from which the popup should open relative to the iconAnchor
      });
      var path1 = args;

      var marker1 = L.Marker.movingMarker(path1, [4000], {
        autostart: true,
        icon: botIcon1,
      })
        .addTo(map)
        .bindPopup("Bot 1", { closeButton: false, closeOnClick: false })
        .openPopup();
    } else if (status === "green") {
      var botIcon1 = L.icon({
        iconUrl: "images/luggage-cart.png",
        iconSize: [38, 38],
        popupAnchor: [-1, -10], // point from which the popup should open relative to the iconAnchor
      });
      var path1 = args;
      var marker1 = L.Marker.movingMarker(path1, [4000], {
        autostart: true,
        icon: botIcon1,
      })
        .addTo(map)
        .bindPopup("Bot 1", { closeButton: false, closeOnClick: false })
        .openPopup();
    }
  } else if (value === "bot2") {
    if (status === "green") {
      var botIcon2 = L.icon({
        iconUrl: "images/luggage-cart.png",
        iconSize: [38, 38],
        popupAnchor: [-1, -10], // point from which the popup should open relative to the iconAnchor
      });
      var path = args;
      var marker2 = L.Marker.movingMarker(path, [4000], {
        autostart: true,
        icon: botIcon2,
      })
        .addTo(map)
        .bindPopup("Bot 2", { closeButton: false, closeOnClick: false })
        .openPopup();
    } else if (status === "red") {
      var botIcon2 = L.icon({
        iconUrl: "images/red-cart.png",
        iconSize: [38, 38],
        popupAnchor: [-1, -10], // point from which the popup should open relative to the iconAnchor
      });
      var path = args;
      var marker2 = L.Marker.movingMarker(path, [4000], {
        autostart: true,
        icon: botIcon2,
      })
        .addTo(map)
        .bindPopup("Bot 2", { closeButton: false, closeOnClick: false })
        .openPopup();
    }
  } else {
    alert("Enter Valid Status");
  }
});
