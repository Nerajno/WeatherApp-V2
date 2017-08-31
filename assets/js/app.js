$(document).ready(function(){
  var lat;
  var long;
  var location;
  var state;
  var city;

  // Documentation from Mdn geolocation for html5 and its accuracy
  var options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
  };

  function success(pos){
    var crd = pos.coords;

    /* => Previous Code
    console.log('Your current position is:');
    console.log(`Latitude : ${crd.latitude}`);
    console.log(`Longitude: ${crd.longitude}`);
    console.log(`More or less ${crd.accuracy} meters.`);
    console.log(crd.latitude + "1");*/




    // Rounding down the deciamal place of the location
    lat = crd.latitude.toFixed(2);
    long= crd.longitude.toFixed(2);

    var weather = function(long,lat){
      var apiKey ="eefb3de557ed0c0a";
      var api = "http://api.wunderground.com/api/"+apiKey +"/geolookup/q/" +long+ "," + lat +".json";

      // console.log(api);

      // JSON Call to get location
      $.getJSON(api,function(data){
        location = data.location.city.replace(/ /g,"_");
        state = data.location.state
        $('#location').html(location+","+state);
        // console.log(location,state);

        var api2 = "http://api.wunderground.com/api/"+apiKey +"/conditions/q/"+state+"/"+location+".json";
        console.log(api2);
        $.getJSON(api2,function(data){
        //console...... other stuff

          var weatherInfo = data.current_observation.weather;
          $('#weatherInfo').html(weatherInfo);
          // console.log(weatherInfo);

          var weather_icon = data.current_observation.icon_url;
          var security = "https://crossorigin.me/"+weather_icon;
          $("#weather_icon").attr("src",weather_icon);
          // console.log(weather_icon);

         // // CHAnge me
         // https://sunrise-sunset.org/api
          var api3 = "https://api.sunrise-sunset.org/json?lat=" +lat+'&lon=' +long;
          // "https://fcc-weather-api.glitch.me/api/current?lat=" +lat+'&lon=' +long;
          console.log(api3);

          var windSpeed = data.current_observation.wind_mph;
          $("#windSpeed").html(windSpeed+" mph");
          // console.log(windSpeed);

          var humidity = data.current_observation.relative_humidity;
          $("#humidity").html(humidity+ " %");
          // console.log(humidity);

          var pressure = data.current_observation.pressure_mb;
          $("#pressure").html(pressure+ " %");
          // console.log(pressure);

          // var marco = data.current_observation.temperature_string;
          // console.log(marco);


          //DATE AND TIME//
          //Converted into days, months, hours, day-name, AM/PM
          //Understood it but it took too long to code.
          var dt = new Date();
          var days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
          $('#day').html(days[dt.getDay()]);
          var months = ["January","February","March","April","May","June","July","August","September","October","November","December"]
          $('#date').html(months[dt.getMonth()] + " " + dt.getDate() + ", " + dt.getFullYear());
          $('#time').html((dt.getHours()>12?(dt.getHours()-12):dt.getHours()).toString() + ":" + ((dt.getMinutes() < 10 ? '0' : '').toString() + dt.getMinutes().toString()) + (dt.getHours() < 12 ? ' AM' : ' PM').toString());

        });
      });
    };
    weather(lat,long);
    };

  function error(err) {
  console.warn(`ERROR(${err.code}): ${err.message}`);
  };

  navigator.geolocation.getCurrentPosition(success, error, options);

});







/*Testing Information
googleapis
var apiKey = "AIzaSyAkPcGdzzwW6UzzC2HmOJCf1_HSedXNCvo"
var api = "http://ip-api.com/json/?callback=yourfunction"*/
