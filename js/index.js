$(function(){
  
  var C = false; 
  var apiData;
  
  backgroundImg = [
    ''
  ]




function displayTemp (F,C){
  if(C) return Math.round((F-32)*(5/9)) + '&deg; C';
  return Math.round(F) + '&deg; F';
}

function render (data, C) {
  var currentWeather = data.weather[0];
  var currentTemp = displayTemp(data.main.temp,C);
  var icon = data.weather[0].icon;
  
  $('#currentTemp').html(currentTemp);
  $('#currentWeather').prepend(currentWeather);
  
  var apiIcon = 'https://openweathermap.org/img/w/' + icon + '.png';
  $('#currentTemp').prepend('<img src=' + apiIcon + '>');
   
}

$.getJSON('https://freegeoip.net/json/').done(function(location){
  console.log(location); // success!!
  $('#country').html(location.country_name);
  $('#city').html(location.city);
  $('#longitude').html(location.longitude);
  $('#latitude').html(location.latitude);                    
  $.getJSON('https://api.openweathermap.org/data/2.5/weather?lat='+location.latitude+ '&lon='+location.longitude+'&units=imperial&appid=eec87e483c77c875258b8c5ec9416a19', function(data){
    apiData=data;
    console.log(apiData); 
    render(apiData,C);
  
    $('#toggle').click(function(){
     C = !C
     render(data,C);                 
                      })
  })
})
})