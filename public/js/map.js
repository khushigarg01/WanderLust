const { coords, title, maptilerKey } = window.listingData || { coords: null };

if (coords && coords.length === 2) {
  const listingCoords = [coords[0], coords[1]]; // [lng, lat]

  // Initialize MapTiler SDK map
  const map = new maptilersdk.Map({
    container: 'map',
    style: maptilersdk.MapStyle.STREETS,
    center: listingCoords,
    zoom: 12,
    apiKey: maptilerKey
  });

  // Add marker
  new maptilersdk.Marker().setLngLat(listingCoords).addTo(map);
} else {
  document.getElementById('map').innerHTML = "<p>Map not available</p>";
}
