$(document).on('turbolinks:load', function() {
  // モーダルフォームの表示
  $(document).on('click', '.newpost-link', function() {
    $('.newpost-form__head').text(`${clickPlace.name}`);
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
    formData.append('place_name', clickPlace.name);
    formData.append('place_id', clickPlace.place_id);
    formData.append('lat', clickPlace.geometry.location.lat());
    formData.append('lng', clickPlace.geometry.location.lng());
    console.log(clickPlace.geometry.location);
    $.ajax({
      url: '/posts',
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      $('.newpost-modal-wrapper').fadeOut();

      // フォームを初期化するコード

      infowindow.close();
    })
    .fail(function(){
      alert('error');
    })
    .always(function(){
    })

  });

});