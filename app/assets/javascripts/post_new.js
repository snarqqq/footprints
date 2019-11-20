$(document).on('turbolinks:load', function() {
  // 新規ポストモーダルのフォーム内容リセット、場所名書き換え
  // 書きかけの場合、一瞬表示されてしまう
  $(document).on('click', '#newPostBtn', function() {
    let placeName = clickPlace.name !== undefined ? clickPlace.name : clickPlace.place_name;
    $('#newPostModalTitle').text(placeName);
    $.ajax({
      url: "/posts/new",
      type: "GET",
      dataType: 'script'
    })
    .done(function(){
      // 'new.js.erb'をrender
    })
    .fail(function(){
      alert('error_posts#new');
    })
    .always(function(){
    });
  });

  // テキストをクリックしてもアップローダーが反応するように
  $(document).on('click', '#newpost-modal__image-text', function() {
    $('#file-drop-area').trigger('click');
  });

  $(document).on('click', '#newWannagoBtn', function() {
    $.ajax({
      url: "/posts/new",
      type: "GET",
      dataType: 'script',
      data: { already_visited: false },
    })
    .done(function(){
      // 'new.js.erb'をrender
    })
    .fail(function(){
      alert('error_posts#new');
    })
    .always(function(){
    });
  });


});