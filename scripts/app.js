function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var lat = position.coords.latitude;
      var long = position.coords.longitude;
      getWeather(lat, long);
      //console.log(getWeather(lat, long));
      //console.log(position.coords.latitude, position.coords.longitude);
    });
  } else {
    alert('Geolocation not supported. Please enable it');
  }
}

function getWeather(lat, long) {
  $.ajax({
    url: 'https://fcc-weather-api.glitch.me/api/current?',
    data: {
      lat: lat,
      lon: long
    },
    type: 'GET',
    dataType: 'json',
    success: function(weatherData) {
      //create setWeather function that contains all this
      var $city = $('#city');
      var $temp = $('#temperature');
      var $icon = $('#icon');
      var $desc = $('#description');
      var $convertBtn = $('.convert-btn');
      var isMetric = false;

      // United States, Libera, and Myanmar use the Imperial Unit system
      if (weatherData.sys.country === 'US' ||
         weatherData.sys.country === 'MM' ||
         weatherData.sys.country === 'LR') {
          $temp.text('').append(celToFah(weatherData.main.temp) +  ' &deg;' + 'F');
          $convertBtn.text('Convert to Celsius');
          isMetric = false;
      }

      $city.append(weatherData.name);
      $icon.append('<img src=' + weatherData.weather[0].icon + '>');
      $desc.append(weatherData.weather[0].description);
      
      getReading(weatherData.main.temp, isMetric);
    }
  });
}

function celToFah(cel) {
  return Math.floor((cel * 9 / 5) + 32);
}

function fahToCel(fah) {
  return Math.floor((fah - 32) * (5 / 9));
}

function getReading(temp, metric) {
  let $conBtn = $('button');
  let $conBtnTxt = $('button').text();
  let $temp = $('#temperature');

  $conBtn.on('click', function(e) {
    if (metric) {
      $temp.text('').append(celToFah(temp) + ' &deg;' + 'F');
      $conBtn.text('').text('Convert to Celsius');
      metric = false;
    } else {
      $temp.text('').append(Math.floor(temp) + ' &deg;' + 'C');
      $conBtn.text('').text('Convert to Fahrenheit');
      metric = true;
    }
  });
}

//Main Program
$(document).ready(function() {
  getLocation();
});