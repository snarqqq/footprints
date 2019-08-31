$(document).on('turbolinks:load', function() {

  $('.header__leftbox').on('click', function() {
    console.log('You are amazing!');
  });

  $('#search-submit').on('click', function(e) {
    e.preventDefault();
    console.log('hoge');
    findPlace();
  });


});

let map; //この変数はmap.js.erbでも使うのでタイプミスに注意
let service;
let infowindow;


function initMap(){
  map = new google.maps.Map(document.getElementById('map'), {
  center: {lat: 35.6806, lng: 139.769},
  zoom: 1
  });

  // infowindow = new google.maps.InfoWindow();

  // let request = {
  //   query: 'Museum of Contemporary Art Australia',
  //   fields: ['name', 'geometry'],
  // };

  // let service = new google.maps.places.PlacesService(map);

  // service.findPlaceFromQuery(request, function(results, status) {
  //   if (status === google.maps.places.PlacesServiceStatus.OK) {
  //     for (var i = 0; i < results.length; i++) {
  //       createMarker(results[i]);
  //     }
  //     map.setCenter(results[0].geometry.location);

  //     console.log(status);
  //     console.log(results[0]);
  //     console.log(results[0].geometry.location);
  //   }
  // });
}

function findPlace(){
  infowindow = new google.maps.InfoWindow();

  let inputAddress = document.getElementById('address-input').value;

  let request = {
    query: inputAddress,
    fields: ['name', 'geometry'],
  };

  let service = new google.maps.places.PlacesService(map);

  service.findPlaceFromQuery(request, function(results, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      for (var i = 0; i < results.length; i++) {
        createMarker(results[i]);
      }
      map.setCenter(results[0].geometry.location);

      console.log(status);
      console.log(results[0]);
      console.log(results[0].geometry.location);
    }
  });

}

function createMarker(place) {
  let marker = new google.maps.Marker({
    map: map,
    position: place.geometry.location
  });

  google.maps.event.addListener(marker, 'click', function() {
    infowindow.setContent(place.name);
    infowindow.open(map, this);
  });

  infowindow.setContent(place.name);
  infowindow.open(map, marker);

}
