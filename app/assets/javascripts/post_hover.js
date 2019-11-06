$(document).on('turbolinks:load', function() {
  $('.post').on('mouseenter', function(){
    let lat = Number($(this).attr("data-lat"));
    let lng = Number($(this).attr("data-lng"));
    map.panTo ({lat, lng});
  });
});