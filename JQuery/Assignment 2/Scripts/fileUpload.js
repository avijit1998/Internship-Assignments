// to read the image input file and show it another div.
function readURL(input) {
    if (input.files && input.files[0]) {
      var reader = new FileReader();
      reader.onload = function(e) {
        $('#imageDivEmpty').removeClass('display-toggle-block').addClass('display-toggle-none');
        $('#imageUpload').attr('src', e.target.result);
        $('#imageDivDisplay').removeClass('display-toggle-none').addClass('display-toggle-block');
        $('#imageTitle').html(input.files[0].name);
      };
      reader.readAsDataURL(input.files[0]);
    } else {
      removeUpload();
    }
}
// to remove the uploaded file
function removeUpload() {
    $("#imgInputField").val(null);
    $('#imageDivDisplay').removeClass('display-toggle-block').addClass('display-toggle-none');
    $('#fileAlreadyExistError').text('');
    $('#imageUpload').attr('src', "#");
    $('#imageTitle').html("");
    $('#imageDivEmpty').removeClass('display-toggle-none').addClass('display-toggle-block').removeClass('image-dropping');
}
// to hide div displaying uploaded image at beginning
$('#imageDivDisplay').removeClass('display-toggle-block').addClass('display-toggle-none');

$('#fileUpload').on('click','#btnFileUpload',function () {
    $('#imgInputField').trigger( 'click' );    
});
$('#fileUpload').on('change','#imgInputField',function () {
    readURL(this);    
});
$('#btnRemoveImage').on('click',function () {
    removeUpload();
});

// some styling for drag and drop via image-dropping class 
$('#imageDivEmpty').bind('dragover', function(){
  $('#imageDivEmpty').addClass('image-dropping');
}).bind('dragleave drop',function(){
  $('#imageDivEmpty').removeClass('image-dropping');
});
// to restrict user from dropping a file in div already containing another file
$('#fileUpload').bind('dragover dragleave drop','#imageDivDisplay',function(){
  if($("#imageDivDisplay").hasClass("display-toggle-block")){
    $('#fileAlreadyExistError').text('File Already exists. Remove it before uploading a new one.');
    return false;
  }
});
