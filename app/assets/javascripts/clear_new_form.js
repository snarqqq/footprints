function clearNewPostForm() {
  $('#title').val('');
  $('#newPostFormVisitDate').val('');
  $('.dropzone-previews').empty();
  $('#newPostFormBody').val('');
  $('#newPostFormSubmit').prop( "disabled", false );
}