$(document).ready(function(){
    var regexName = /^[a-zA-Z ]{2,30}$/, 
    regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
    regexAdhaar = /^\d{12}$/,
    regexPAN = /^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/,
    regexPhone = /^\d{10}$/,
    regexAddress = /^[a-zA-Z0-9\s,'-]*$/,
    regexCityName = /^[a-zA-Z ]{2,47}$/,
    regexZipCode = /^\d{6}$/; 
    $('#txtFirstName').on('input', function() {
        var input=$(this);
        var is_name=input.val();
        if (is_name && regexName.test(is_name) ) {
            input.removeClass("invalid").addClass("valid");
            $('#emsgNameField').text('');
        }
        else {
            input.removeClass("valid").addClass("invalid");
            $('#emsgNameField').text('Please enter a valid name.(Name length must be between 2 to 30)');
        }
    });
    $('#txtLastName').on('input', function() {
        var input=$(this);
        var is_name=input.val();
        if (is_name && regexName.test(is_name) ) {
            input.removeClass("invalid").addClass("valid");
            $('#emsgNameField').text('');
        }
        else {
            input.removeClass("valid").addClass("invalid");
            $('#emsgNameField').text('Please enter a valid name.(Name length must be between 2 to 30)');
        }
    });
    $('#txtEmail').on('input', function() {
        var input=$(this);
        var email=input.val();
        if (email && regexEmail.test(email) ) {
            input.removeClass("invalid").addClass("valid");
            $('#emsgEmailField').text('');
        }
        else {
            input.removeClass("valid").addClass("invalid");
            $('#emsgEmailField').text('Please enter a valid email.(Ex:abc@xyz.com)');
        }
    });
    $('#txtBirthDate').on('input', function() {
        var input=$(this);
        var date=input.val();
        if (date) {
            input.removeClass("invalid").addClass("valid");
            $('#emsgDOBField').text('');
        }
        else {
            input.removeClass("valid").addClass("invalid");
            $('#emsgDOBField').text('Please enter your date of birth');
        }
    });
    $('#txtAdhaar').on('input', function() {
        var input=$(this);
        var adhaar=input.val();
        if (adhaar && regexAdhaar.test(adhaar) ) {
            input.removeClass("invalid").addClass("valid");
            $('#emsgAdhaarField').text('');
        }
        else {
            input.removeClass("valid").addClass("invalid");
            $('#emsgAdhaarField').text('Please enter a valid Adhaar Number(12-digits).');
        }
    });
    $('#txtPAN').on('input', function() {
        var input=$(this);
        var pan=input.val();
        if (pan && regexPAN.test(pan) ) {
            input.removeClass("invalid").addClass("valid");
            $('#emsgPANField').text('');
        }
        else {
            input.removeClass("valid").addClass("invalid");
            $('#emsgPANField').text('Please enter a valid PAN.');
        }
    });
    $('#grpPhoneField').on('input','input.validate-phone', function() {
        var input=$(this);
        var phone=input.val();
        if (phone && regexPhone.test(phone) ) {
            input.removeClass("invalid").addClass("valid");
            $('#emsgPhoneField').text('');
        }
        else {
            input.removeClass("valid").addClass("invalid");
            $('#emsgPhoneField').text('Please enter a valid 10-digit phone number.');
        }
    });
    $('#grpAddressField').on('input','.validate-address', function() {
        var input=$(this);
        var s = '#emsgAddressField' + $(this).attr('id').replace(/txtAddress/, ''); 
        var address=input.val();
        if (address && regexAddress.test(address) ) {
            input.removeClass("invalid").addClass("valid");
            $(s).text('');
        }
        else {
            input.removeClass("valid").addClass("invalid");
            $(s).text('Please enter a valid address');
        }
    });
    $('#grpAddressField').on('input','.validate-city', function() {
        var input=$(this);
        var s = '#emsgCityField' + $(this).attr('id').replace(/txtCity/, '');
        var city=input.val();
        if (city && regexCityName.test(city) ) {
            input.removeClass("invalid").addClass("valid");
            $(s).text('');
        }
        else {
            input.removeClass("valid").addClass("invalid");
            $(s).text('Please enter a valid city.');
        }
    });
    $('#grpAddressField').on('change','.validate-country', function() {
        var input=$(this);
        var s = '#emsgCountryField' + $(this).attr('id').replace(/optCountry/, '');
        var country=input.val();
        if (country !== "") {
            input.removeClass("invalid").addClass("valid");
            $(s).text('');
        }
        else {
            input.removeClass("valid").addClass("invalid");
            $(s).text('Please select a country.');
        }
    });
    $('#grpAddressField').on('change','.validate-state', function() {
        var input=$(this);
        var s = '#emsgStateField' + $(this).attr('id').replace(/optState/, '');
        var state=input.val();
        if (state !== "") {
            input.removeClass("invalid").addClass("valid");
            $(s).text('');
        }
        else {
            input.removeClass("valid").addClass("invalid");
            $(s).text('Please select a state.');
        }
    });
    $('#grpAddressField').on('input','.validate-zipcode', function() {
        var input=$(this);
        var s = '#emsgZipCodeField' + $(this).attr('id').replace(/txtZipcode/, '');
        var zipcode=input.val();
        if (zipcode && regexZipCode.test(zipcode)) {
            input.removeClass("invalid").addClass("valid");
            $(s).text('');
        }
        else {
            input.removeClass("valid").addClass("invalid");
            $(s).text('Please enter a valid 6-digit zip code.');
        }
    });
    $('#txtVisibleCaptcha').on('input', function() {
        var input=$(this);
        var captcha=input.val();
        if (captcha && captcha === $('#hiddenTxtCaptcha').val() ) {
            input.removeClass("invalid").addClass("valid");
        }
        else {
            input.removeClass("valid").addClass("invalid");
        }
    });
    $('.emp-form').on('click','#btnSubmit',function(event){
        
        
        event.preventDefault();
        
        if ($('#txtFirstName').val() && regexName.test($('#txtFirstName').val()) ) {
            $('#txtFirstName').removeClass("invalid").addClass("valid");
        } else {
            $('#txtFirstName').removeClass("valid").addClass("invalid");
        }

        if ($('#txtLastName').val() && regexName.test($('#txtLastName').val()) ) {
            $('#txtLastName').removeClass("invalid").addClass("valid");
        } else {
            $('#txtLastName').removeClass("valid").addClass("invalid");
        }

        if ($('#txtEmail').val() && regexEmail.test($('#txtEmail').val()) ) {
            $('#txtEmail').removeClass("invalid").addClass("valid");
        } else {
            $('#txtEmail').removeClass("valid").addClass("invalid");
        }

        if ($('#txtBirthDate').val()) {
            $('#txtBirthDate').removeClass("invalid").addClass("valid");
        } else {
            $('#txtBirthDate').removeClass("valid").addClass("invalid");
        }

        if ($('#txtAdhaar').val() && regexAdhaar.test($('#txtAdhaar').val()) ) {
            $('#txtAdhaar').removeClass("invalid").addClass("valid");
        } else {
            $('#txtAdhaar').removeClass("valid").addClass("invalid");
        }

        if ($('#txtPAN').val() && regexPAN.test($('#txtPAN').val()) ) {
            $('#txtPAN').removeClass("invalid").addClass("valid");
        } else {
            $('#txtPAN').removeClass("valid").addClass("invalid");
        }

        $('#grpPhoneField').children().each(function () {
            var inp=$(this).attr('id');
            var str = '#' + inp + ' :input';
            var phone = $(str).val();
            if (phone && regexPhone.test(phone) ) {
                $(str).removeClass("invalid").addClass("valid");
            }
            else {
                $(str).removeClass("valid").addClass("invalid");
            }
        });

        $('#grpAddressField').children().each(function () {
            var inp=$(this).attr('id');
            var str = '#' + inp + ' textarea';
            var address = $(str).val();
            if (address && regexAddress.test(address)) {
                $(str).removeClass("invalid").addClass("valid");
            }
            else {
                $(str).removeClass("valid").addClass("invalid");
            }
        });

        $('#grpAddressField').find('.validate-city').each(function () {
            var inp=$(this).attr('id');
            var str = '#' + inp;
            var city = $(str).val();
            if (city && regexCityName.test(city)) {
                $(str).removeClass("invalid").addClass("valid");
            }
            else {
                $(str).removeClass("valid").addClass("invalid");
            }
        });

        $('#grpAddressField').find('.validate-country').each(function () {
            var inp=$(this).attr('id');
            var str = '#' + inp;
            var country = $(str).val();
            if (country !== "") {
                $(str).removeClass("invalid").addClass("valid");
            }
            else {
                $(str).removeClass("valid").addClass("invalid");
            }
        });

        $('#grpAddressField').find('.validate-state').each(function () {
            var inp=$(this).attr('id');
            var str = '#' + inp;
            var state = $(str).val();
            if (state !== "") {
                $(str).removeClass("invalid").addClass("valid");
            }
            else {
                $(str).removeClass("valid").addClass("invalid");
            }
        });

        $('#grpAddressField').find('.validate-zipcode').each(function () {
            var inp=$(this).attr('id');
            var str = '#' + inp;
            var zipcode = $(str).val();
            if (zipcode && regexZipCode.test(zipcode)) {
                $(str).removeClass("invalid").addClass("valid");
            }
            else {
                $(str).removeClass("valid").addClass("invalid");
            }
        });

        if ($('#txtVisibleCaptcha').val() && $('#txtVisibleCaptcha').val() === $('#hiddenTxtCaptcha').val()) {
            $('#txtVisibleCaptcha').removeClass("invalid").addClass("valid");
        } else {
            $('#txtVisibleCaptcha').removeClass("valid").addClass("invalid");
        }

        if ($('.file-upload-image').attr("src") === '#') {
            $('#messageArea').html('This field is empty, you may upload your'+
              'picture via Drag-Drop or clicking the "ADD IMAGE" button above');
            $('#messageArea').css({
                "color": "red"
            });  
        } else {
            $('#messageArea').html('Drag and drop a file or select add Image');
            $('#messageArea').css({
                "color": "#1FB264"
            });
        }

        if($('.invalid')[0]){
            console.log("don't display");
        }
        else{
            $('h1').html('New Employee Profile');
            var newProfilePictureDiv = $(document.createElement('div')).attr({
                id: 'profileDisplay'
            });
            newProfilePictureDiv.after().html('<img class="file-upload-image" src="#" alt="your image" id="imageDisplay">');
            $('#displayForm').append(newProfilePictureDiv);

            $('#imageDisplay').attr('src',$('#imageUpload').attr('src'));
            $('#profileDisplay').css({
                "text-align":"center"
            });
            $('input[id*=txt]').each(function(){
                var id = $(this).attr('id');
                if($(this).is('#txtVisibleCaptcha')){
                    return true;
                }
                var labelCopy = $('label[for="' + id + '"]');
                labelCopy = labelCopy.attr({
                    for: labelCopy.attr('for')+"Copy"
                });
                var txtInput = $(this).clone(true);
                txtInput = txtInput.attr({
                    id: labelCopy.attr('for'),
                    name: $(this).attr('name')+"Copy" 
                });
                $(txtInput).val($(this).val());
                $('#displayForm').append(labelCopy);
                $('#displayForm').append(txtInput);
            });
            $('select[id*=opt]').each(function(){
                var id = $(this).attr('id');
                var labelCopy = $('label[for="' + id + '"]');
                labelCopy = labelCopy.attr({
                    for: labelCopy.attr('for')+"Copy"
                });
                var optInput = $(this).clone(true);
                optInput = optInput.attr({
                    id: labelCopy.attr('for'),
                    name: $(this).attr('name')+"Copy" 
                });
                $(optInput).val($(this).val());
                $('#displayForm').append(labelCopy);
                $('#displayForm').append(optInput);
            });
            $('textarea[id*=txt]').each(function(){
                var id = $(this).attr('id');
                var labelCopy = $('label[for="' + id + '"]');
                labelCopy = labelCopy.attr({
                    for: labelCopy.attr('for')+"Copy"
                });
                var txtAreaInput = $(this).clone(true);
                txtAreaInput = txtAreaInput.attr({
                    id: labelCopy.attr('for'),
                    name: $(this).attr('name')+"Copy" 
                });
                $(txtAreaInput).val($(this).val());
                $('#displayForm').append(labelCopy);
                $('#displayForm').append(txtAreaInput);
            });
            $('#activeForm').css({
                "display":"none"
            });
            $("#displayForm :input").prop("disabled", true);    
        }
    });
});
