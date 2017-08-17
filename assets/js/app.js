$(document).ready(function(){

  var lat;
  var long;

// Documentation from Mdn geolocation for html5

var options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0
};
function success(pos) {
  var crd = pos.coords;
  console.log('Your current position is:');
  console.log(`Latitude : ${crd.latitude}`);
  console.log(`Longitude: ${crd.longitude}`);
  console.log(`More or less ${crd.accuracy} meters.`);
  // console.log(crd.latitude + "1");
  lat = crd.latitude;
  console.log(lat);
};
function error(err) {
  console.warn(`ERROR(${err.code}): ${err.message}`);
};
navigator.geolocation.getCurrentPosition(success, error, options);
});

//googleapis
// var apiKey = "AIzaSyAkPcGdzzwW6UzzC2HmOJCf1_HSedXNCvo"
// var api = "http://ip-api.com/json/?callback=yourfunction";
// var red = "blue";
