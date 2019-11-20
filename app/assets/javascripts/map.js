$(document).on('turbolinks:load', function() {

  $('#search-submit').on('click', function(e) {
    e.preventDefault();
    ($('#address-input').val() === "") ? alert('場所を入力してください') : findPlace();
  });

});

let clickPlace;
let foundPlaceMarkers = [];

function findPlace(){
  deleteMarkers();
  infowindow = new google.maps.InfoWindow();

  let inputAddress = document.getElementById('address-input').value;

  let request = {
    query: inputAddress,
    fields: ['name', 'geometry','place_id','formatted_address', 'icon'],
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
    } else {
      alert(`"${inputAddress}"に対する検索結果は見つかりませんでした。\n他のキーワードで再度お試しください。`)
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
                <h5>${place.name}</h5>
                <p>${place.formatted_address}</p>
                <button class="btn btn-outline-info" id="newWannagoBtn" data-toggle="modal" data-target="#newPostModal">
                  <img src="${window.image_path('wannago_marker.png')}">
                  行きたい
                </button>
                <button class="btn btn-outline-warning" id="newPostBtn" data-toggle="modal" data-target="#newPostModal">
                  <img src="${window.image_path('footprint_marker.png')}">
                  ここに投稿
                </button>
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

let clickedMarker;

function createMarkerFromDB(place) {
  console.log(place.already_visited);
  let position = {lat: Number(place.lat), lng: Number(place.lng)};
  if (markerPositions.indexOf(position) === -1) {
    if (place.user_id === currentUserId) {
      var imageUrl = place.already_visited === true ? window.image_path('footprint_marker.png') : window.image_path('wannago_marker.png');
    } else {
      var imageUrl = window.image_path('someones_marker.png');
    }
    let image = {
      // url: '/assets/footprint_marker.png'
      url: imageUrl
      // size: new google.maps.Size(20, 32),
      // origin: new google.maps.Point(0, 0),
      // anchor: new google.maps.Point(10, 32)
    };
    var marker = new google.maps.Marker({
      map: map,
      icon: image,
      animation: google.maps.Animation.DROP,
      position: position
    });
    markerPositions.push(position);
  }

  let imageHtml = place.images[0] === undefined ? "" : `<img src="${place.images[0].image.url}" class="lower-message__image">`;
  let otherImages = place.images.length > 1 ? `<p>他${place.images.length - 1}枚の写真</p>` : "";
  let content =`<div>
                  <div class="d-flex justify-content-between align-items-center">
                    <h5>${place.place_name}</h5>
                    <span class="">${place.visit_date}</p>
                  </div>
                  <h6>${place.title}</h6>
                  <p>${place.body}</p>
                  <div>${imageHtml}</div>
                  ${otherImages}
                  <div class="mt-2">
                    <button class="btn btn-warning" id="postShowBtn" data-toggle="modal" data-target="#postShowModal">詳細</button>
                    <button class="btn btn-info" id="newPostBtn" data-toggle="modal" data-target="#newPostModal">ここに投稿</button>
                  </div>
                </div>`

  google.maps.event.addListener(marker, 'click', function() {
    clickPlace = place;
    clickedMarker = marker;
    infowindow.setContent(content);
    infowindow.open(map, this);
  });

  // infowindow.setContent(place.name);
  // infowindow.open(map, marker);

}

let markerPositions = [];
function createFootprints() {
  // AjaxでDBから情報取得
  $.ajax({
    url: '/api/posts',
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

    // place_idごとに配列に格納
    // let postsGroupedByPlaceId = [];
    // for (var i = 0, i < posts.length; i++) {
    //   if (postsGroupedByPlaceId.findIndex(function(v,i2,a){
    //     for(key in v){ key === post[i].place_id}
    //   })
    //   )
    //   if (post[i].place_id === )
    //   let objct = {post[i].place_id: [post[i]]};
    //   postsGroupedByPlaceId.push(objct);

    // }



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

      addMarkerWithTimeout(filteredPosts[i], i * 50);
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