$(document).ready(function(){
  var lat;
  var long;
  var location;
  var state;
  var city;
  // Documentation from Mdn geolocation for html5
  var options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
  };
  function success(pos) {
    var crd = pos.coords;
    /*console.log('Your current position is:');
    console.log(`Latitude : ${crd.latitude}`);
    console.log(`Longitude: ${crd.longitude}`);
    console.log(`More or less ${crd.accuracy} meters.`);
    console.log(crd.latitude + "1");*/
    lat = crd.latitude.toFixed(2);
    long= crd.longitude.toFixed(2);
    // console.log(lat,long);
    // testing weather function
    var weather = function(long,lat){
      var apiKey ="eefb3de557ed0c0a";
      var api = "http://api.wunderground.com/api/"+apiKey +"/geolookup/q/" +long+ "," + lat +".json";
      // var state = "";
      console.log(api);

      // JSON Call to get location
      $.getJSON(api,function(data){
        location = data.location.city.replace(/ /g, "_");
        state = data.location.state;
        console.log(location,state);

        var api2 = "http://api.wunderground.com/api/"+apiKey +"/conditions/q/"+state+"/"+location+".json";
        $.getJSON(api2,function(data){
          current_observation

        });
        console.log(api2);
      });




    };
    weather(lat,long,state,city)

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
