$(document).on('turbolinks:load', function() {
  $('.latest-posts__chevron').on('click', function(){
    $(this).toggleClass('aside');
    $(this).parents('.latest-posts').toggleClass('aside');
    $('.map-wrapper').toggleClass('wider-left');
    $('.my-recent-posts').toggleClass('wider-left');
    if ($('.my-recent-posts__chevron').hasClass('aside')) {
      $('.map-wrapper').toggleClass('wider-both');
    }
  });

  $('.my-recent-posts__chevron').on('click', function(){
    $(this).toggleClass('aside');
    $(this).parents('.my-recent-posts').toggleClass('aside');
    $('.map-wrapper').toggleClass('wider-right');
    $('.my-recent-posts').toggleClass('wider-right');
    if ($('.latest-posts__chevron').hasClass('aside')) {
      $('.map-wrapper').toggleClass('wider-both');
    }
  });

});