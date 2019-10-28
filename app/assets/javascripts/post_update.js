$(document).on('turbolinks:load', function() {

  // submitで写真の有無で分岐
  $(document).on('submit', '#post-edit-form',function(e){
    e.preventDefault();
    if ($('.dropzone-previews').children().length !== (0 || $('.edit-image-remove').length)) {
      let formDataAry = $(this).serializeArray();
      myDropzone.on("sending", function(file, xhr, formData) {
        formDataAry.forEach(function(fields){
          formData.append(fields.name, fields.value);
        });
        formData.append('post_id', clickPlace.post_id);
        formData.append('place_name', clickPlace.place_name);
        formData.append('place_id', clickPlace.place_id);
        // formData.append('lat', clickPlace.lat);
        // formData.append('lng', clickPlace.lng);
        formData.append('imageRemoveIds', imageRemoveIds);
      });

      myDropzone.processQueue();

      myDropzone.on("success", function(file, response) {
        $('#newPostModalClose').trigger('click');
        eval(response);
        // infowindow.close();
        // deleteMarkers();
        // createMarkerFromDB(response);
      });
      myDropzone.on("error", function(file, response) {
        alert('error');
      });
      myDropzone.on("complete", function(file, response) {
        $( "#newPostFormSubmit").prop( "disabled", false );
      });
    } else {
      console.log('not using dropzone');
      console.log(imageRemoveIds);
      let formData = new FormData(this);
      formData.append('post_id', clickPlace.post_id);
      formData.append('place_name', clickPlace.place_name);
      formData.append('place_id', clickPlace.place_id);
      formData.append('lat', clickPlace.lat);
      formData.append('lng', clickPlace.lng);
      formData.append('imageRemoveIds', imageRemoveIds);
      $.ajax({
        url: `/posts/${clickPlace.post_id}`,
        type: "PATCH",
        data: formData,
        dataType: 'script',
        processData: false,
        contentType: false
      })
      .done(function(post){
        // $('#newPostModalClose').trigger('click');
        // infowindow.close();
        // deleteMarkers();
        // createMarkerFromDB(post);
      })
      .fail(function(){
        alert('error_post_update');
      })
      .always(function(post){
        console.log(post);
        console.log(post.place_name);
      });
    }
  });
});