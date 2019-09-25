$(document).on('turbolinks:load', function() {
  // モーダルフォームの表示
  $(document).on('click', '.newpost-link', function() {
    let placeName = (clickPlace.name) ? clickPlace.name : clickPlace.place_name;
    $('.newpost-form__head').text(`${placeName}`);
    $('.newpost-modal-wrapper').fadeIn();
    return false;
  });

  // モーダルフォームの非表示
  $(document).on('click', '.newpost-modal__close', function() {
    $('.newpost-modal-wrapper').fadeOut();
    return false;
  });

  $('#newpost-form__form').on('submit', function(e){
    e.preventDefault();
    let formData = new FormData(this);
    // let placeData = [{
    //   place_id: clickPlace.place_id,
    //   location: clickPlace.geometry.location
    // }];
    // console.log(placeData);
    // formData.append('place', placeData);
    if (clickPlace.geometry) {
      formData.append('place_name', clickPlace.name);
      formData.append('place_id', clickPlace.place_id);
      formData.append('lat', clickPlace.geometry.location.lat());
      formData.append('lng', clickPlace.geometry.location.lng());
    } else {
      formData.append('place_name', clickPlace.place_name);
      formData.append('place_id', clickPlace.place_id);
      formData.append('lat', clickPlace.lat);
      formData.append('lng', clickPlace.lng);
    }
    $.ajax({
      url: '/posts',
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(post){
      $('.newpost-modal-wrapper').fadeOut();

      // フォームを初期化するコード

      infowindow.close();
      deleteMarkers();
      console.log(post);
      createMarkerFromDB(post);
    })
    .fail(function(){
      alert('error');
    })
    .always(function(){
    })

  });

});