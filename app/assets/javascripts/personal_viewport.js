$(document).on('turbolinks:load', function() {
  $('.save-this-view').on('click', function() {
    // centerResult = map.getCenter();
    let boundsResult = map.getBounds();
    let sw_lat = boundsResult.pa.g;
    let sw_lng = boundsResult.ka.g;
    let ne_lat = boundsResult.pa.h;
    let ne_lng = boundsResult.ka.h;
    let csrfToken = $('input[name="authenticity_token"]').val();

    $.ajax({
      url: '/save_viewport',
      type: "POST",
      data: {
        sw_lat: sw_lat,
        sw_lng: sw_lng,
        ne_lat: ne_lat,
        ne_lng: ne_lng,
        authenticity_token: csrfToken
      },
      dataType: 'json',
    })
    .done(function(){
      $('.save-this-view').text('Done');
    })
    .fail(function(){
      alert('error');
    })
    .always(function(){
    });
  });



  $('.set-my-view').on('click', function() {
    $.ajax({
      url: '/set_viewport',
      type: "GET",
      dataType: 'json',
    })
    .done(function(viewport){
    // Numberにする
    console.log(viewport);
      let sw = {lat: Number(viewport.sw_lat), lng: Number(viewport.sw_lng)};
      let ne = {lat: Number(viewport.ne_lat), lng: Number(viewport.ne_lng)};
      let bounds = new google.maps.LatLngBounds(sw, ne);
      // map.setCenter(results[0].geometry.location);
      map.fitBounds(bounds);
    })
    .fail(function(){
      alert('error');
    })
    .always(function(){
    });

  });
});