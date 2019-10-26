let imageRemoveIds = [];
$(document).on('turbolinks:load', function() {
  // 既存のimageのプレビューを削除しidを配列にpush
  $(document).on('click', '.edit-image-remove', function(e) {
    e.preventDefault();
    $(this).parent().remove();
    let id = Number($(this).attr("data-image-remove"));
    imageRemoveIds.push(id);
    return false
  });
});