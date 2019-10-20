$(document).on('turbolinks:load', function() {
  // 新規ポストモーダルのフォーム内容リセット、場所名書き換え
  $(document).on('click', '#newPostBtn', function() {
    let placeName = clickPlace.name !== undefined ? clickPlace.name : clickPlace.place_name;
    clearNewPostForm();
    $('#newPostModalTitle').text(placeName);
  });

  // テキストをクリックしてもアップローダーが反応するように
  $('#newpost-modal__image-text').on('click', function() {
    $('#file-drop-area').trigger('click');
  });

  // submitで写真の有無で分岐
  $('#newpost-form__form').on('submit', function(e){
    e.preventDefault();
    if ($('.dropzone-previews').children().length !== 0) {
      let formDataAry = $(this).serializeArray();
      myDropzone.on("sending", function(file, xhr, formData) {
        formDataAry.forEach(function(fields){
          formData.append(fields.name, fields.value);
        });
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
      });

      myDropzone.processQueue();

      myDropzone.on("success", function(file, response) {
        $('#newPostModalClose').trigger('click');
        infowindow.close();
        deleteMarkers();
        createMarkerFromDB(response);
      });
      myDropzone.on("error", function(file, response) {
        alert('error');
      });
      myDropzone.on("complete", function(file, response) {
        $( "#newPostFormSubmit").prop( "disabled", false );
      });

    } else {
      let formData = new FormData(this);
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
        $('#newPostModalClose').trigger('click');
        infowindow.close();
        deleteMarkers();
        console.log(post);
        createMarkerFromDB(post);
      })
      .fail(function(){
        alert('error');
      })
      .always(function(post){
        console.log(post);
        console.log(post.place_name);
      });
    }
  });
});