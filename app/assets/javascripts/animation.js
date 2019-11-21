$(document).on('turbolinks:load', function() {
  $('.my-recent-posts__chevron').on('click', function(){
    console.log('click!');
    $(this).toggleClass('aside');
    $(this).parents('.my-recent-posts').toggleClass('aside');
  })
});