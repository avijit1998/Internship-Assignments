$(document).ready(function(){
    $('#activeForm').on("click", ".btn-remove-address, .btn-remove-phone", function () {
        event.preventDefault();
        $($(this).parent()).remove();
    });
    $("#grpPhoneField").on("click", ".btn-add-phone", function () {
        event.preventDefault();
        var phoneField = $(this).closest('#grpPhoneField').find('.alternate-phone-number').eq(0).clone();
        phoneField.removeClass("hidden");
        $(this).closest('#grpPhoneField').append(phoneField);
      });
    $('#grpAddressField').on("click", ".btn-add-address", function () {
        event.preventDefault();
        var addressField = $(this).closest('#grpAddressField').find('.alternate-address-field').eq(0).clone();
        addressField.removeClass("hidden").removeClass('alternate-address-field').addClass('cloned-alternate-address-field');
        $(this).closest('#grpAddressField').append(addressField);
    });
});  

    