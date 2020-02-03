jQuery.fn.extend({
    generateCaptcha: function () {
        var a = Math.floor(Math.random() * 10) + 1;
        var b = Math.floor(Math.random() * 10) + 1;       
        var c = Math.floor(Math.random() * 4) + 1;  
        var code,val1;
        if(c === 1){
            code = a + '+' + b;
            val1 = a+b;
        } else if (c === 2 && a >= b){
            code = a + '-' + b;
            val1 = a-b;
        } else if (c === 2 && b > a){
            code = b + '-' + a;
            val1 = b-a;
        } else if (c === 3) {
            code = a + '*' + b;
            val1 = a*b;
        } else if (c === 4 && a >= b) {
            code = a + '/' + b;
            val1 = Math.floor(a/b);
        } else if (c === 4 && a <= b) {
            code = b + '/' + a;
            val1 = Math.floor(b/a);
        } else {
            code = "Invalid Operation.";
            val1 = 0;
        }
        var captcha = $('#hiddenTxtCaptcha');
        captcha.val(val1);
        $("#txtCaptchaDiv").html(code);
    },
    restrictNumeric: function(e) {
        var regexpAlpha = /[a-z]/i;
        var value = String.fromCharCode(e.which) || e.key;
    
        // No letters
        if (regexpAlpha.test(value)) {
          e.preventDefault();
          return false;
        }
    },
    checkSpcialChar: function(event){
        if(!((event.keyCode >= 65) && (event.keyCode <= 90) ||
            (event.keyCode >= 97) && (event.keyCode <= 122) || 
            (event.keyCode >= 48) && (event.keyCode <= 57) || 
            (event.keyCode >= 8) && (event.keyCode <= 13) ||
            (event.keyCode >=37) && (event.keyCode <= 40))){
           event.preventDefault();
           return;
        }
        event.returnValue = true;
    },
    countryChange: function() {
        var str1 = '#' + $(this).closest('.country').attr('id');
        var str2 = '#' + $(this).closest('.country').parent().parent().find('.find-state-field:eq(1)').attr('id');
        var str3 = '#' + $(this).closest('.country').parent().parent().find('.find-state-field').attr('id');
        
        var countryState = [
            [
                'IN',[
                ['', 'State/Province'],
                ['OD', 'Odisha'],
                ['AP', 'Andhra Pradesh'],
                ['WB', 'West Bengal'],
                ['MP', 'Madhya Pradesh']
        ] ],
            [
                'US', [
                ['', 'State/Province'],
                ['AL', 'Alabama'],
                ['AK', 'Alaska'],
                ['AZ', 'Arizona'],
                ['AR', 'Arkansas']
        ] ],
            [
                'CA', [
                ['', 'State/Province'],
                ['AB', 'Alberta'],
                ['BC', 'British Columbia'],
                ['MB', 'Manitoba'],
                ['NB', 'New Brunswick']
        ] ]
        ];
        var listOfState;
        //if country and state have been selected
        if ($(str1)[0] && $(str2)[0]) {
            listOfState = [['', 'None']];

            //states based on country are added into the list
            var currentCountry = $(str1).children("option:selected").val();
                for (var i = 0; i < countryState.length; i++) {
                    if (currentCountry === countryState[i][0]) {
                        listOfState = countryState[i][1];
                    }
                }

            // add all states from listofState to option in select field
            $(str2)[0].options.length = 0;
            for (var k = 0; k < listOfState.length; k++) {
                $(str2)[0].options[k] = new Option(listOfState[k][1], listOfState[k][0]);    
            }
        }
    },
    restrictFutureDate: function() {
        var dtToday = new Date();
        var month = dtToday.getMonth() + 1;
        var day = dtToday.getDate();
        var year = dtToday.getFullYear();
        if(month < 10)
            month = '0' + month.toString();
        if(day < 10)
            day = '0' + day.toString();
        var maxDate = year + '-' + month + '-' + day;
        return maxDate;
    }
});
$(document).ready(function(){
    $('#captchaField').generateCaptcha();
    
    $('#txtBirthDate').attr('max', $(this).restrictFutureDate);

    $('#txtAdhaar').on('keydown keyup keypress', function(){
        $(this).restrictNumeric(event);
        $(this).checkSpcialChar(event);
    });

    $('#grpPhoneField').on('keydown keyup keypress', 'input.validate-phone',function(){
        $(this).restrictNumeric(event);
        $(this).checkSpcialChar(event);
    });

    $('#grpAddressField').on('change', 'select.country', function() {
        $(this).countryChange();    
    });

    $('#grpAddressField').on('keydown keyup keypress','input.validate-zipcode', function() {
        $(this).restrictNumeric(event);
        $(this).checkSpcialChar(event);
    });

    $('#captchaField').on('click',"#btnRefreshCaptcha", function (e) {
        e.preventDefault();
        $(this).generateCaptcha();      
    });

    var regexName = /^[a-zA-Z ]{2,30}$/, 
    regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
    regexAdhaar = /^\d{12}$/,
    regexPAN = /^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/,
    regexPhone = /^[6-9]\d{9}$/,
    regexAddress = /^[a-zA-Z0-9\s,'-]*$/,
    regexCityName = /^[a-zA-Z ]{2,47}$/,
    regexZipCode = /^\d{6}$/; 

    // real time validation for first name, last name, email, birthdate, adhaar, pan 
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
            $('#emsgDateField').text('');
        }
        else {
            input.removeClass("valid").addClass("invalid");
            $('#emsgDateField').text('Please enter your date of birth');
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

    // real time validation for address fields
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

    // real time validation for all city fields
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

    // real time validation for all country dropdown field
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

    // real time validation for all state dropdown fields
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

    // real time validation for all zipcode fields
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

    // real time validation for captcha field
    $('#txtVisibleCaptcha').on('input', function() {
        var input=$(this);
        var captcha=input.val();
        if (captcha && captcha === $('#hiddenTxtCaptcha').val() ) {
            input.removeClass("invalid").addClass("valid");
            $('#emsgCaptcha').text('');
        }
        else {
            input.removeClass("valid").addClass("invalid");
            $('#emsgCaptcha').text('Wrong CAPTCHA!! Try Again.');
        }
    });

    // validation after submit button is clicked
    $('.emp-form').on('click','#btnSubmit',function(event){        
        event.preventDefault();
        
        if ($('#txtFirstName').val() && regexName.test($('#txtFirstName').val()) ) {
            $('#txtFirstName').removeClass("invalid").addClass("valid");
            $('#emsgNameField').text('');
        } else {
            $('#txtFirstName').removeClass("valid").addClass("invalid");
            $('#emsgNameField').text('Please enter a valid name.(Name length must be between 2 to 30)');
        }

        if ($('#txtLastName').val() && regexName.test($('#txtLastName').val()) ) {
            $('#txtLastName').removeClass("invalid").addClass("valid");
            $('#emsgNameField').text('');
        } else {
            $('#txtLastName').removeClass("valid").addClass("invalid");
            $('#emsgNameField').text('Please enter a valid name.(Name length must be between 2 to 30)');
        }

        if ($('#txtEmail').val() && regexEmail.test($('#txtEmail').val()) ) {
            $('#txtEmail').removeClass("invalid").addClass("valid");
            $('#emsgEmailField').text('');
        } else {
            $('#txtEmail').removeClass("valid").addClass("invalid");
            $('#emsgEmailField').text('Please enter a valid email.(Ex:abc@xyz.com)');
        }

        if ($('#txtBirthDate').val()) {
            $('#txtBirthDate').removeClass("invalid").addClass("valid");
            $('#emsgDateField').text('');
        } else {
            $('#txtBirthDate').removeClass("valid").addClass("invalid");
            $('#emsgDateField').text('Please enter your date of birth');
        }

        if ($('#txtAdhaar').val() && regexAdhaar.test($('#txtAdhaar').val()) ) {
            $('#txtAdhaar').removeClass("invalid").addClass("valid");
            $('#emsgAdhaarField').text('');
        } else {
            $('#txtAdhaar').removeClass("valid").addClass("invalid");
            $('#emsgAdhaarField').text('Please enter a valid Adhaar Number(12-digits).');
        }

        if ($('#txtPAN').val() && regexPAN.test($('#txtPAN').val()) ) {
            $('#txtPAN').removeClass("invalid").addClass("valid");
            $('#emsgPANField').text('');
        } else {
            $('#txtPAN').removeClass("valid").addClass("invalid");
            $('#emsgPANField').text('Please enter a valid PAN.');
        }

        // validation for all phone number field with looping 
        $('#grpPhoneField').children().each(function () {
            var inp=$(this).attr('id');
            var str = '#' + inp + ' :input';
            var phone = $(str).val();
            if (phone && regexPhone.test(phone) ) {
                $(str).removeClass("invalid").addClass("valid");
                $('#emsgPhoneField').text('');
            }
            else {
                $(str).removeClass("valid").addClass("invalid");
                $('#emsgPhoneField').text('Please enter a valid 10-digit phone number.');
            }
        });

        // validation for multi line address input
        $('#grpAddressField').children().each(function () {
            var inp=$(this).attr('id');
            var s = '#emsgAddressField' + $(this).children().attr('id').replace(/multilineAddressField/, '');
            var str = '#' + inp + ' textarea';
            var address = $(str).val();
            if (address && regexAddress.test(address)) {
                $(str).removeClass("invalid").addClass("valid");
                $(s).text('');
            }
            else {
                $(str).removeClass("valid").addClass("invalid");
                $(s).text('Please enter a valid address');
            }
        });

        // validation for all city input
        $('#grpAddressField').find('.validate-city').each(function () {
            var inp=$(this).attr('id');
            var s = '#emsgCityField' + $(this).attr('id').replace(/txtCity/, '');
            var str = '#' + inp;
            var city = $(str).val();
            if (city && regexCityName.test(city)) {
                $(str).removeClass("invalid").addClass("valid");
                $(s).text('');
            }
            else {
                $(str).removeClass("valid").addClass("invalid");
                $(s).text('Please enter a valid city.');
            }
        });

        // validation for all country dropdown
        $('#grpAddressField').find('.validate-country').each(function () {
            var inp=$(this).attr('id');
            var s = '#emsgCountryField' + $(this).attr('id').replace(/optCountry/, '');
            var str = '#' + inp;
            var country = $(str).val();
            if (country !== "") {
                $(str).removeClass("invalid").addClass("valid");
                $(s).text('');
            }
            else {
                $(str).removeClass("valid").addClass("invalid");
                $(s).text('Please select a country.');
            }
        });

        // validation for all state dropdown
        $('#grpAddressField').find('.validate-state').each(function () {
            var inp=$(this).attr('id');
            var s = '#emsgStateField' + $(this).attr('id').replace(/optState/, '');
            var str = '#' + inp;
            var state = $(str).val();
            if (state !== "") {
                $(str).removeClass("invalid").addClass("valid");
                $(s).text('');
            }
            else {
                $(str).removeClass("valid").addClass("invalid");
                $(s).text('Please select a state.');
            }
        });

        // validation for all zipcodes field present via loop
        $('#grpAddressField').find('.validate-zipcode').each(function () {
            var inp=$(this).attr('id');
            var s = '#emsgZipCodeField' + $(this).attr('id').replace(/txtZipcode/, '');
            var str = '#' + inp;
            var zipcode = $(str).val();
            if (zipcode && regexZipCode.test(zipcode)) {
                $(str).removeClass("invalid").addClass("valid");
                $(s).text('');
            }
            else {
                $(str).removeClass("valid").addClass("invalid");
                $(s).text('Please enter a valid 6-digit zip code.');
            }
        });

        // validation for captcha
        if ($('#txtVisibleCaptcha').val() && $('#txtVisibleCaptcha').val() === $('#hiddenTxtCaptcha').val()) {
            $('#txtVisibleCaptcha').removeClass("invalid").addClass("valid");
            $('#emsgCaptcha').text('');
        } else {
            $('#txtVisibleCaptcha').removeClass("valid").addClass("invalid");
            $('#emsgCaptcha').text('Wrong CAPTCHA!! Try Again.');
        }

        // validation for image file input
        if ($('.file-upload-image').attr("src") === '#') {
            $('#messageArea').html('This field is empty, you may upload your '+
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
        }
        else{
            // for displaying the result page of the employee details
            $('h1').html('New Employee Profile');
            var newProfilePictureDiv = $(document.createElement('div')).attr({
                id: 'profileDisplay'
            });

            newProfilePictureDiv.after().html('<img class="file-upload-image" src="#" alt="your image" id="imageDisplayCopy">');
            $('#displayForm').append(newProfilePictureDiv);

            $('#imageDisplay').attr('src',$('#imageUpload').attr('src'));
            $('#profileDisplay').css({
                "text-align":"center"
            });

            // looping on txt fields
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

            // looping on all select fields
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

            // looping on all textarea fields
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
            // hide the original form
            $('#activeForm').css({
                "display":"none"
            });

            // disable the input field in display form
            $("#displayForm :input").prop("disabled", true);    
        }
    });
});