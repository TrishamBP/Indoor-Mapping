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

var bounds = [
  [0, 0],
  [1000, 1000],
];
var image = L.imageOverlay("images/fp.png", bounds, {
  interactive: true,
}).addTo(map);
map.fitBounds(bounds);
// Adding Markers to the map
var bot1 = L.latLng([441, 175.2]);
L.marker(bot1)
  .addTo(map)
  .bindPopup("Bot 1", { closeButton: false, closeOnClick: false })
  .openPopup();
var bot2 = L.latLng([441, 571.35]);
L.marker(bot2)
  .addTo(map)
  .bindPopup("Bot 2", { closeButton: false, closeOnClick: false })
  .openPopup();
var bot3 = L.latLng([911.71, 392.81]);
L.marker(bot3)
  .addTo(map)
  .bindPopup("Bot 3", { closeButton: false, closeOnClick: false })
  .openPopup();
