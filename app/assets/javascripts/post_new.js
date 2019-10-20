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

  // ajaxでポスト
  $('#newpost-form__form').on('submit', function(e){
    // e.preventDefault();
    // let formData = new FormData(this);
    // if (clickPlace.geometry) {
    //   formData.append('place_name', clickPlace.name);
    //   formData.append('place_id', clickPlace.place_id);
    //   formData.append('lat', clickPlace.geometry.location.lat());
    //   formData.append('lng', clickPlace.geometry.location.lng());
    // } else {
    //   formData.append('place_name', clickPlace.place_name);
    //   formData.append('place_id', clickPlace.place_id);
    //   formData.append('lat', clickPlace.lat);
    //   formData.append('lng', clickPlace.lng);
    // }
    // $.ajax({
    //   url: '/posts',
    //   type: "POST",
    //   data: formData,
    //   dataType: 'json',
    //   processData: false,
    //   contentType: false
    // })
    // .done(function(post){
    //   $('#newPostModalClose').trigger('click');
    //   infowindow.close();
    //   deleteMarkers();
    //   console.log(post);
    //   createMarkerFromDB(post);
    // })
    // .fail(function(){
    //   alert('error');
    // })
    // .always(function(post){
    //   console.log(post);
    //   console.log(post.place_name);
    // });

    e.preventDefault();
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


    // $('#item-registration-form').submit(function(e) {
      // e.preventDefault();
      // if (itemValidation() === false) {
      //   errorMessage();
      //   $( "#item-submit").prop( "disabled", false );
      // } else {
        let formDataAry = $(this).serializeArray();
        // console.log(...formData.entries());
        myDropzone.on("sending", function(file, xhr, formData) {
          formDataAry.forEach(function(fields){
            formData.append(fields.name, fields.value);
          })
        });
      
        myDropzone.processQueue();
  
        myDropzone.on("success", function(file, response) {
          eval(response);
        })
  
      // }
      $( "#item-submit").prop( "disabled", false );
    // });
  


  });



});

function clearNewPostForm() {
  $('#newPostFormTitle').val('');
  $('#newPostFormVisitDate').val('');
  // HTMLにidを指定するとファイルインプットが機能しなくなった
  $('.newPostFormImages').val(null);
  $('#newPostFormBody').val('');
  $('#newPostFormSubmit').prop( "disabled", false );
}