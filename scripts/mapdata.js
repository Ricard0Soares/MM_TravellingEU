function myMap() {
  var europeBounds = {
      north: 71.0,
      south: 34.5,
      west: -25.0,
      east: 45.0
  };

  var mapProp = {
      center: new google.maps.LatLng(51.508742, -0.120850),
      zoom: 5,
      restriction: {
          latLngBounds: europeBounds,
          strictBounds: true
      }
  };

  var map = new google.maps.Map(document.getElementById("googleMap"), mapProp);

  var lisbon = new google.maps.Marker({
      position: new google.maps.LatLng(38.71667, -9.139),
      map: map,
      title: 'Lisbon'
  });

  var paris = new google.maps.Marker({
      position: new google.maps.LatLng(48.8566, 2.3522),
      map: map,
      title: 'Paris'
  });

  var madrid = new google.maps.Marker({
      position: new google.maps.LatLng(40.416775, -3.703790),
      map: map,
      title: 'Madrid'
  });

  var athens = new google.maps.Marker({
      position: new google.maps.LatLng(37.983810, 23.727539),
      map: map,
      title: 'Athens'
  });

  var rome = new google.maps.Marker({
      position: new google.maps.LatLng(41.902782, 12.496366),
      map: map,
      title: 'Rome'
  });

  google.maps.event.addListener(lisbon, 'click', function(){
      window.location.href = 'home_lisboa.html';
  });

  google.maps.event.addListener(paris, 'click', function(){
      window.location.href = 'home_paris.html';
  });

  google.maps.event.addListener(madrid, 'click', function(){
      window.location.href = 'home_madrid.html';
  });

  google.maps.event.addListener(rome, 'click', function(){
      window.location.href = 'home_roma.html';
  });

  google.maps.event.addListener(athens, 'click', function(){
      window.location.href = 'home_atenas.html';
  });
}
