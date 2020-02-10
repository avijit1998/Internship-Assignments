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
        $("input:hidden[class='hidden-captcha-value']").val(val1);
        $(".captcha-question").html(code);
    },
    restrictNumeric: function(e) {
        var regexpAlpha = /[a-z]/i;
        var value = String.fromCharCode(e.which) || e.key;
        if (regexpAlpha.test(value)) {
            event.preventDefault();
            return false;
        }
    },
    checkSpcialChar: function(e){
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
        var country = $(this).closest('.js-country-state').find('.country');
        var state = $(this).closest('.js-country-state').find('.find-state-field').eq(1);
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
        if ($(country)[0] && $(state)[0]) {
            listOfState = [['', 'None']];

            //states based on country are added into the list
            var currentCountry = $(country).children("option:selected").val();
                for (var i = 0; i < countryState.length; i++) {
                    if (currentCountry === countryState[i][0]) {
                        listOfState = countryState[i][1];
                    }
                }

            // add all states from listofState to option in select field
            $(state)[0].options.length = 0;
            for (var k = 0; k < listOfState.length; k++) {
                $(state)[0].options[k] = new Option(listOfState[k][1], listOfState[k][0]);    
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
    },
    validate: function(errorMsg, regex, captcha){
        if(captcha !== undefined && captcha){
            if ($(this).val() && $(this).val() === $(this).parent().find('.hidden-captcha-value').val()) {
                $(this).removeClass("invalid").addClass("valid");
                $(this).parent().find('.error-message').text('');
            }
            else {
                $(this).removeClass("valid").addClass("invalid");
                $(this).parent().find('.error-message').text(errorMsg);
            }
            return;
        }
        if(regex !== undefined){
            if ($(this).val() && regex.test($(this).val()) ) {
                $(this).removeClass("invalid").addClass("valid");
                $(this).parent().find('.error-message').text('');
            }
            else {
                $(this).removeClass("valid").addClass("invalid");
                $(this).parent().find('.error-message').text(errorMsg);
            }
            return;
        }
        if ($(this).val()) {
            $(this).removeClass("invalid").addClass("valid");
            $(this).parent().find('.error-message').text('');
        }
        else {
            $(this).removeClass("valid").addClass("invalid");
            $(this).parent().find('.error-message').text(errorMsg);
        }
    }
});
$(document).ready(function(){
    var regexName = /^[a-zA-Z ]{2,30}$/, 
        regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        regexAdhaar = /^\d{12}$/,
        regexPAN = /^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/,
        regexPhone = /^[6-9]\d{9}$/,
        regexAddress = /^[a-zA-Z0-9\s,'-]*$/,
        regexCity = /^[a-zA-Z ]{2,47}$/,
        regexZipCode = /^\d{6}$/,
        regexNumber = /^\d{3}$/,    
        errorMsgName = 'Please enter a valid name.(Name length must be between 2 to 30)',
        errorMsgEmail = 'Please enter a valid email.(Ex:abc@xyz.com)',
        errorMsgDateOfBirth = 'Please enter your date of birth',
        errorMsgAdhaar = 'Please enter a valid 12-digit adhaar number.',
        errorMsgPAN = 'Please enter a valid PAN number.',
        errorMsgPhone = 'Please enter a valid 10 digit phone number.(It should start with [9/8/7/6])',
        errorMsgAddress = 'Please enter a valid address.',
        errorMsgCity = 'Please enter a valid city name.',
        errorMsgCountry = 'Please select a country',
        errorMsgState = 'Please select a state',
        errorMsgZipCode = 'Please enter a valid 6-digit zipcode.',
        errorMsgCaptcha = 'Wrong CAPTCHA!! Try Again.';
        
    //generate captcha on page starting and also on refresh btn 
    $('#captchaField').generateCaptcha();
    $('#captchaField').on('click',"#btnRefreshCaptcha", function (e) {
        e.preventDefault();
        $(this).generateCaptcha();      
    });
    
    // restrict future date
    $('#txtBirthDate').attr('max', $(this).restrictFutureDate);
    // restriction to number based input field
    $('#activeForm').on('keypress','input#txtAdhaar, input.validate-phone, input.validate-zipcode', function(e){
        $(this).restrictNumeric(e);
        $(this).checkSpcialChar(e);
    });

    // bind states based on country
    $('#grpAddressField').on('change', 'select.country', function() {
        $(this).countryChange();    
    });

    // validation of static fields
    $('.name-div').on('input','.name-field',function(){
        $(this).validate(errorMsgName, regexName);
    });
    $('#txtEmail').on('input', function() {
        $(this).validate(errorMsgEmail, regexEmail);
    });
    $('#txtBirthDate').on('input', function() {
        $(this).validate(errorMsgDateOfBirth);
    });
    $('#txtAdhaar').on('input', function() {
        $(this).validate(errorMsgAdhaar,regexAdhaar);
    });
    $('#txtPAN').on('input', function() {
        $(this).validate(errorMsgPAN,regexPAN);
    });
    $('#txtVisibleCaptcha').on('input', function() {
        $(this).validate(errorMsgCaptcha,regexNumber,true);
    });
    // validation of dynamic fields
    $('#grpPhoneField').on('input','input.validate-phone', function() {
        $(this).validate(errorMsgPhone,regexPhone);
    });
    $('#grpAddressField').on('input','.validate-address', function() {
        $(this).validate(errorMsgAddress,regexAddress);
    });
    $('#grpAddressField').on('input','.validate-city', function() {
        $(this).validate(errorMsgCity,regexCity);
    });
    $('#grpAddressField').on('change','.validate-country', function() {
        $(this).validate(errorMsgCountry);
    });
    $('#grpAddressField').on('change','.validate-state', function() {
        $(this).validate(errorMsgState);
    });
    $('#grpAddressField').on('input','.validate-zipcode', function() {
        $(this).validate(errorMsgZipCode,regexZipCode);
    });

    // validation after submit button is clicked
    $('.emp-form').on('click','#btnSubmit',function(event){        
        event.preventDefault();
        
        // validate of static fields
        $('.name-field').each(function () {
            $(this).validate(errorMsgName,regexName);
        });
        $("#txtEmail").validate(errorMsgEmail, regexEmail);
        $('#txtBirthDate').validate(errorMsgDateOfBirth);
        $('#txtAdhaar').validate(errorMsgAdhaar,regexAdhaar);
        $('#txtPAN').validate(errorMsgPAN,regexPAN);
        // validation of dyanamic fields (have to use with hasclass becoz it works only boolean)
        $('.validate-phone').each(function () {
            if(!$(this).parent().hasClass('hidden')){
                $(this).validate(errorMsgPhone,regexPhone);
            }
        });
        $('.validate-address').each(function () {
            if(!$(this).closest('.hidden').hasClass('hidden')){
                $(this).validate(errorMsgAddress,regexAddress);
            }
        });
        $('.validate-city').each(function () {
            if(!$(this).closest('.hidden').hasClass('hidden')){
                $(this).validate(errorMsgCity,regexCity);
            }
        });
        $('.validate-country').each(function () {
            if(!$(this).closest('.hidden').hasClass('hidden')){
                $(this).validate(errorMsgCountry);
            }
        });
        $('.validate-state').each(function () {
            if(!$(this).closest('.hidden').hasClass('hidden')){
                $(this).validate(errorMsgState);
            }
        });
        $('.validate-zipcode').each(function () {
            if(!$(this).closest('.hidden').hasClass('hidden')){
                $(this).validate(errorMsgZipCode,regexZipCode);
            }
        });

        // captcha validation
        $('#txtVisibleCaptcha').validate(errorMsgCaptcha,regexNumber,true);

        // validation for image file input
        if ($('#imageUpload').attr("src") === '#') {
            $('#messageArea').html('This field is empty, you may upload your picture via Drag-Drop or clicking the "ADD IMAGE" button above');
            $('#messageArea').css({"color": "red"});  
        } else {
            $('#messageArea').html('Drag and drop a file or click ADD IMAGE');
            $('#messageArea').css({"color": "#1FB264"});
        }

        // to check if any empty fields left
        if(!($("#activeForm .invalid").length > 0 || $('#imageUpload').attr("src") === '#')){
            // display data from active form to display form
            $('.form-background').addClass('display-toggle-none');
            $('#displayForm').removeClass('display-toggle-none');            
            $('#dspFirstName').text($('#txtFirstName').val());
            $('#dspLastName').text($('#txtLastName').val());
            $('#dspEmail').text($('#txtEmail').val());
            $('#dspDateOfBirth').text($('#txtBirthDate').val());
            $('#dspAdhaar').text($('#txtAdhaar').val());
            $('#dspPAN').text($('#txtPAN').val());
            $('#uploadedImgDisplay').attr({"src": $('#imageUpload').attr("src")});
            
            $('#dspPrimaryPhoneNumber').text($('.phone-field-primary').find('.validate-phone').val());
            // display alternate number only if it exists
            if($("#grpPhoneField > div").length > 2){
                $('#altPhoneNum').removeClass('display-toggle-none');
            }
            $('.validate-phone').each(function () {
                if($(this).parent().hasClass('hidden') ||$(this).parent().hasClass('phone-field-primary')){}
                else{
                    $('#dspAltPhoneNumbers').append($(this).val()+'; ');
                }
            });
            
            // for primary address field
            var addressInputValues = $('#addressField1 :input').map(function() {
                return $(this).val();
            });
            $('#dspPrimaryAddress').append(Array.prototype.join.call(addressInputValues, "; "));
            // display alternate address only if entered
            if($("#grpAddressField > div").length > 2){
                $('#altAddressDivId').removeClass('display-toggle-none');
            }
            var altAddressInputValues = $('.cloned-alternate-address-field :input').map(function() {
                return $(this).val();
            });
            var multipleAlternateAddress = [];
            for (var i = 0; i < altAddressInputValues.length; i += 6) {
                multipleAlternateAddress.push(altAddressInputValues.slice(i,i+6));
            }
            for (i = 0; i < multipleAlternateAddress.length; i++) {
                $('#dspAlternateAddress').append(Array.prototype.join.call(multipleAlternateAddress[i], "; "));    
                $('#dspAlternateAddress').append("<br><br>");
            }
        }
    });        
    $('.emp-form').on('click','#btnReset',function(event){
        removeUpload();
    });
});