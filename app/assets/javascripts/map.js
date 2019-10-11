$(document).on('turbolinks:load', function() {

  $('#search-submit').on('click', function(e) {
    e.preventDefault();
    ($('#address-input').val() === "") ? alert('場所を入力してください') : findPlace();
    // findPlace();
  });

});

let map; //この変数はmap.js.erbでも使うのでタイプミスに注意
let service;
let infowindow;

function initMap(){
// Create a new StyledMapType object, passing it an array of styles,
// and the name to be displayed on the map type control.
const styledMapType = new google.maps.StyledMapType(
  [
    {elementType: 'geometry', stylers: [{color: '#ebe3cd'}]},
    {elementType: 'labels.text.fill', stylers: [{color: '#523735'}]},
    {elementType: 'labels.text.stroke', stylers: [{color: '#f5f1e6'}]},
    {
      featureType: 'administrative',
      elementType: 'geometry.stroke',
      stylers: [{color: '#c9b2a6'}]
    },
    {
      featureType: 'administrative.land_parcel',
      elementType: 'geometry.stroke',
      stylers: [{color: '#dcd2be'}]
    },
    {
      featureType: 'administrative.land_parcel',
      elementType: 'labels.text.fill',
      stylers: [{color: '#ae9e90'}]
    },
    {
      featureType: 'landscape.natural',
      elementType: 'geometry',
      stylers: [{color: '#dfd2ae'}]
    },
    {
      featureType: 'poi',
      elementType: 'geometry',
      stylers: [{color: '#dfd2ae'}]
    },
    {
      featureType: 'poi',
      elementType: 'labels.text.fill',
      stylers: [{color: '#93817c'}]
    },
    {
      featureType: 'poi.park',
      elementType: 'geometry.fill',
      stylers: [{color: '#a5b076'}]
    },
    {
      featureType: 'poi.park',
      elementType: 'labels.text.fill',
      stylers: [{color: '#447530'}]
    },
    {
      featureType: 'road',
      elementType: 'geometry',
      stylers: [{color: '#f5f1e6'}]
    },
    {
      featureType: 'road.arterial',
      elementType: 'geometry',
      stylers: [{color: '#fdfcf8'}]
    },
    {
      featureType: 'road.highway',
      elementType: 'geometry',
      stylers: [{color: '#f8c967'}]
    },
    {
      featureType: 'road.highway',
      elementType: 'geometry.stroke',
      stylers: [{color: '#e9bc62'}]
    },
    {
      featureType: 'road.highway.controlled_access',
      elementType: 'geometry',
      stylers: [{color: '#e98d58'}]
    },
    {
      featureType: 'road.highway.controlled_access',
      elementType: 'geometry.stroke',
      stylers: [{color: '#db8555'}]
    },
    {
      featureType: 'road.local',
      elementType: 'labels.text.fill',
      stylers: [{color: '#806b63'}]
    },
    {
      featureType: 'transit.line',
      elementType: 'geometry',
      stylers: [{color: '#dfd2ae'}]
    },
    {
      featureType: 'transit.line',
      elementType: 'labels.text.fill',
      stylers: [{color: '#8f7d77'}]
    },
    {
      featureType: 'transit.line',
      elementType: 'labels.text.stroke',
      stylers: [{color: '#ebe3cd'}]
    },
    {
      featureType: 'transit.station',
      elementType: 'geometry',
      stylers: [{color: '#dfd2ae'}]
    },
    {
      featureType: 'water',
      elementType: 'geometry.fill',
      stylers: [{color: '#b9d3c2'}]
    },
    {
      featureType: 'water',
      elementType: 'labels.text.fill',
      stylers: [{color: '#92998d'}]
    }
  ],
  {name: 'Styled Map'});


  map = new google.maps.Map(document.getElementById('map'), {
  center: {lat: 35.6806, lng: 139.769},
  zoom: 1.6,
  mapTypeControlOptions: {
    mapTypeIds: ['roadmap', 'satellite', 'hybrid', 'terrain',
            'styled_map']
  }
  });

  //Associate the styled map with the MapTypeId and set it to display.
  map.mapTypes.set('styled_map', styledMapType);
  map.setMapTypeId('styled_map');

  infowindow = new google.maps.InfoWindow();
  createFootprints();
}



let clickPlace;
// let foundPlaceName;
// let foundGeometry;
// let foundPlaceId;
// let foundIcon;
let foundPlaceMarkers = [];


function findPlace(){
  deleteMarkers();
  infowindow = new google.maps.InfoWindow();

  let inputAddress = document.getElementById('address-input').value;

  let request = {
    query: inputAddress,
    fields: ['name', 'geometry','place_id','icon'],
  };

  let service = new google.maps.places.PlacesService(map);

  service.findPlaceFromQuery(request, function(results, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      console.log(results.length);
      console.log(results);
      for (let i = 0; i < results.length; i++) {
        createMarker(results[i]);
      }
      map.setCenter(results[0].geometry.location);
      map.fitBounds(results[0].geometry.viewport);
      // foundPlaceName = results[0].name;
      // foundGeometry = results[0].geometry.location;
      // foundPlaceId = results[0].place_id;
      // foundIcon = results[0].icon;
    }
  });

}

function createMarker(place) {
  let marker = new google.maps.Marker({
    map: map,
    draggable: true,
    animation: google.maps.Animation.DROP,
    position: place.geometry.location,
    zIndex: 10000
  });

  let content =`<div>
                ${place.name}
                <a class="newpost-link" href=''>ここに投稿</a>
                </div>`

  google.maps.event.addListener(marker, 'click', function() {
    clickPlace = place;
    infowindow.setContent(content);
    infowindow.open(map, this);
  });

  // infowindow.setContent(place.name);
  // infowindow.open(map, marker);

  foundPlaceMarkers.push(marker);

}

function createMarkerFromDB(place) {
  let position = {lat: Number(place.lat), lng: Number(place.lng)};
  let imageUrl = window.image_path('footprint_marker.png');
  let image = {
    // url: '/assets/footprint_marker.png'
    url: imageUrl
    // size: new google.maps.Size(20, 32),
    // origin: new google.maps.Point(0, 0),
    // anchor: new google.maps.Point(10, 32)
  };
  let marker = new google.maps.Marker({
    map: map,
    icon: image,
    animation: google.maps.Animation.DROP,
    position: position
  });

  let content =`<div>
                ${place.place_name}
                <h2>ここを訪れました。</h2>
                <a class="newpost-link" href=''>ここに投稿</a>
                </div>`

  google.maps.event.addListener(marker, 'click', function() {
    clickPlace = place;
    infowindow.setContent(content);
    infowindow.open(map, this);
  });

  // infowindow.setContent(place.name);
  // infowindow.open(map, marker);

}


function createFootprints() {
  // AjaxでDBから情報取得
  $.ajax({
    url: '/posts',
    type: "GET",
    dataType: 'json',
  })
  .done(function(posts){
    // 同じ場所にマーカーをつくらないような処理？
    console.log('ajax-done');
    console.log(posts);

    // place_idの重複を排除し、iの若いもののみ残した配列
    let filteredPosts = posts.filter(function(v,i,a){ 
      return (a.findIndex(function(v2){ 
        return (v.place_id === v2.place_id)
      }) === i);
    });
    console.log(filteredPosts);

    // // 重複しているものの重複を取り除いた配列
    // let reversedPosts = posts.slice().reverse();
    // console.log(reversedPosts);
    // let placesMultiple = posts.filter(function(v,i,a){
    //   return (a.findIndex(function(v2){ 
    //     return (v.place_id === v2.place_id)
    //   }) === i
    //   && reversedPosts.findIndex(function(v3){
    //     return(v.place_id === v3.place_id)
    //   }) !== (a.length - i - 1)
    //   );
    // });

    for (var i = 0; i < filteredPosts.length; i++) {
      addMarkerWithTimeout(filteredPosts[i], i * 100);
    }

  })
  .fail(function(){
    alert('error_createFootprints');
  })
  .always(function(){
  })

}


function setMapOnAll(map) {
  for (var i = 0; i < foundPlaceMarkers.length; i++) {
    foundPlaceMarkers[i].setMap(map);
  }
}

function clearMarkers() {
  setMapOnAll(null);
}

function deleteMarkers() {
  clearMarkers();
  foundPlaceMarkers = [];
}


// function drop() {
//   // clearMarkers();
//   for (var i = 0; i < neighborhoods.length; i++) {
    // addMarkerWithTimeout(neighborhoods[i], i * 200);
//   }
// }

function addMarkerWithTimeout(position, timeout) {
  window.setTimeout(function() {
    // markers.push(new google.maps.Marker({
    //   position: position,
    //   map: map,
    //   animation: google.maps.Animation.DROP
    // }));
    createMarkerFromDB(position);
  }, timeout);
}