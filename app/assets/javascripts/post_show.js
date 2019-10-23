$(document).on('turbolinks:load', function() {
  $(document).on('click', '#postShowBtn', function() {
    $('#postShowModalContent').empty();
    $.ajax({
      url: `/posts/${clickPlace.post_id}`,
      type: "GET",
      data: { postId: clickPlace.post_id },
      dataType: 'script'
    })
    .done(function(){
    })
    .fail(function(){
      alert('詳細情報を取得できませんでした');
    })
    .always(function(){
    });
  });
});