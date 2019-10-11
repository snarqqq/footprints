let centerResult;
let boundsResult;


$(document).on('turbolinks:load', function() {
  $('.keep-this-view').on('click', function() {
    // centerResult = map.getCenter();
    boundsResult = map.getBounds();
    let sw = {
      lat: boundsResult.oa.g,
      lng: boundsResult.ae.g
    };

    let ne = {
      lat: boundsResult.oa.h,
      lng: boundsResult.ae.h
    };

    $.ajax({
      url: '/save_viewport',
      type: "POST",
      data: {
        sw: sw,
        ne: ne
      },
      dataType: 'json',
    })
    .done(function(post){
      $('.keep-this-view').text('Done');
    })
    .fail(function(){
      alert('error');
    })
    .always(function(){
    })
  });



  $('.set-my-view').on('click', function() {
    centerResult = map.getCenter();
    boundsResult = map.getBounds();


    // let centerResult = map.getCenter();
    // let boundsResult = map.getBounds();

    console.log(centerResult);
    console.log(boundsResult);

    // Numberにする
    // map.setCenter(results[0].geometry.location);
    // map.fitBounds(results[0].geometry.viewport);
  });
});