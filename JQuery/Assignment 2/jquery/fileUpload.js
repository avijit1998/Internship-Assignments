jQuery.fn.extend({
  readURL: function (input) {
    if (input.files && input.files[0]) {
      var reader = new FileReader();
      reader.onload = function(e) {
        $('#imageDivEmpty').removeClass('display-toggle-block').addClass('display-toggle-none');
        $('.file-upload-image').attr('src', e.target.result);
        $('#imageDivDisplay').removeClass('display-toggle-none').addClass('display-toggle-block');
        $('#imageTitle').html(input.files[0].name);
      };
      reader.readAsDataURL(input.files[0]);
    } else {
      removeUpload();
    }
  },
  removeUpload: function () {
    $("#imgInputField").val(null);
    $('#imageDivDisplay').removeClass('display-toggle-block').addClass('display-toggle-none');
    $('.file-upload-image').attr('src', "#");
    $('#imageTitle').html("");
    $('#imageDivEmpty').removeClass('display-toggle-none').addClass('display-toggle-block');
  }
});

$('#imageDivDisplay').removeClass('display-toggle-block').addClass('display-toggle-none');

$('#btnFileUpload').on('click',function () {
    $('#imgInputField').trigger( 'click' );    
});

$('#imgInputField').on('change',function () {
    $('#fileUpload').readURL(this);    
});

$('#btnRemoveImage').on('click',function () {
    $(this).removeUpload();
});

$('#imageDivEmpty').bind('dragover', function () {
    $('#imageDivEmpty').addClass('image-dropping');
});

$('#imageDivEmpty').bind('dragleave', function () {
    $('#imageDivEmpty').removeClass('image-dropping');
});
  