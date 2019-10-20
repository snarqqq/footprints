let myDropzone;

$(function(){
  Dropzone.autoDiscover = false;
    myDropzone = new Dropzone("#file-drop-area", {
    url: "/posts",
    uploadMultiple: true,
    parallelUploads: 10,
    paramName: "images[image]",
    maxFiles: 10,
    previewsContainer: '.dropzone-previews',
    addRemoveLinks: true,
    dictRemoveFile: "削除",
    dictMaxFilesExceeded: "10 files limit",
    dictInvalidFileType: "Image file only",
    autoProcessQueue: false
  });

  // 写真アップロード説明文の表示切り替え
  myDropzone.on('addedfile', function(file) {
    $('#newpost-modal__image-text').css('display', 'none');
  });
  myDropzone.on('removedfile', function(file) {
    if ($('.dropzone-previews').children().length === 0) {
      $('#newpost-modal__image-text').css('display', 'block');
    }
  });
  
});