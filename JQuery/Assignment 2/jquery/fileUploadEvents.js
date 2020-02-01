$('.file-upload-btn').on('click',function () {
    $('.file-upload-input').trigger( 'click' );    
});
$('.file-upload-input').on('change',function () {
    readURL(this);    
});
$('.remove-image').on('click',function () {
    removeUpload();
});