
$(document).ready(function(){
  var location;
  var state;
  var lat;
  var long;


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

    // Rounding down the decimal place of the location
    lat = crd.latitude.toFixed(2);
    long= crd.longitude.toFixed(2);
    // Converts to string... the numbers recieved as coordinates 

    //first API and function used to get location and city name.
    var weather = function(long,lat){
      var apiKey ="eefb3de557ed0c0a";
      var api = "http://api.wunderground.com/api/"+apiKey +"/geolookup/q/" +long+ "," + lat +".json";
      // console.log(api); => testing if the api wrks 

      // JSON Call to get location
      $.getJSON(api,function(data){
        location = data.location.city.replace(/ /g,"_");
        state = data.location.state;
        $('#location').html(location+","+state);
        // console.log(location,state); => testing

        // Second API is used to get the weather description based on the location collected from the previous API
        var api2 = "http://api.wunderground.com/api/"+apiKey +"/conditions/q/"+state+"/"+location+".json";
        console.log(api2);
        $.getJSON(api2,function(data){
        //console.log(api2); => testing

          var weatherInfo = data.current_observation.weather;
          $('#weatherInfo').html(weatherInfo);
          // console.log(weatherInfo); => testing

          var weather_icon = data.current_observation.icon_url;
          var security = "https://crossorigin.me/"+weather_icon;
          $("#weather_icon").attr("src",weather_icon);
          // console.log(weather_icon); => testing

       
          var windSpeed = data.current_observation.wind_mph;
          $("#windSpeed").html(windSpeed+" mph");
          // console.log(windSpeed); => testing..... Robin WIlliams made and awesome genie.

          var humidity = data.current_observation.relative_humidity;
          $("#humidity").html(humidity+ " %");
          // console.log(humidity); => testing..... imagine what Samuel L. Jackson would do as genie.

          var pressure = data.current_observation.pressure_mb;
          $("#pressure").html(pressure+ " %");
          // console.log(pressure); => testing

          var cTemp = data.current_observation.temp_c;
          $("#temp").html(cTemp +" &#x2103");
          var tempSwap=true;
        
          var fTemp = data.current_observation.temp_f;
           $("#temp").click(function() {
             console.log(tempSwap);
            if(tempSwap===true){
          console.log(" mej");
          $("#temp").html(cTemp + " &#x2103");
          console.log('tempSwap was true, switching it to false');
          tempSwap=false;
        }
        else {
          $("#temp").html(fTemp + " &#x2109");
          console.log('tempSwap was false, switching it to true');
          tempSwap=true;
        }
      });

          // Clicking the button to do temperature switch between Celcius and Fahrenheit 
               


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

var other = function(sunup, sundown){
          var api3 = "https://fcc-weather-api.glitch.me/api/current?lat="+lat+"&lon="+long;
          console.log(api3); //yes it wrks => testing
          $.getJSON(api3,function(data){

          var sundown;
          var sunup;

          sundown = data.sys.sunset;
          console.log(sundown);
          sunup = data.sys.sunrise;
          console.log(sunup);

            });

          }
          other(sunup,sundown);         

/*Testing Information
googleapis
var apiKey = "AIzaSyAkPcGdzzwW6UzzC2HmOJCf1_HSedXNCvo"
var api = "http://ip-api.com/json/?callback=yourfunction"*/
